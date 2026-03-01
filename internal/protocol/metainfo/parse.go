package metainfo

import (
	"errors"
	"fmt"

	"github.com/anacrolix/torrent/bencode"
	mi "github.com/anacrolix/torrent/metainfo"
	infohash_v2 "github.com/anacrolix/torrent/types/infohash-v2"
	"github.com/bitmagnet-io/bitmagnet/internal/protocol"
)

// MetaVersion constants for torrent version identification.
const (
	MetaVersionV1     int16 = 1 // v1-only (SHA-1)
	MetaVersionV2     int16 = 2 // v2-only (SHA-256)
	MetaVersionHybrid int16 = 3 // hybrid (both v1 and v2)
)

// ParseResult contains the parsed metainfo along with v2 hash information.
type ParseResult struct {
	Info        Info
	MetaVersion int16
	V2Hash      *protocol.IDv2
}

func ParseMetaInfoBytes(infoHash protocol.ID, metaInfoBytes []byte) (ParseResult, error) {
	var info Info
	if unmarshalErr := bencode.Unmarshal(metaInfoBytes, &info); unmarshalErr != nil {
		return ParseResult{}, fmt.Errorf("error unmarshaling info bytes: %w", unmarshalErr)
	}

	result := ParseResult{Info: info}

	hasV1 := info.HasV1()
	hasV2 := info.HasV2()

	switch {
	case hasV1 && hasV2:
		// Hybrid torrent: verify v1 SHA-1 hash, extract v2 SHA-256 hash
		result.MetaVersion = MetaVersionHybrid
		if protocol.ID(mi.HashBytes(metaInfoBytes)) != infoHash {
			return ParseResult{}, errors.New("v1 info hash mismatch")
		}

		v2 := protocol.IDv2(infohash_v2.HashBytes(metaInfoBytes))
		result.V2Hash = &v2
	case hasV2:
		// V2-only torrent: verify truncated SHA-256 matches the DHT-discovered hash
		result.MetaVersion = MetaVersionV2
		v2Full := protocol.IDv2(infohash_v2.HashBytes(metaInfoBytes))
		truncated := v2Full.TruncateV1()

		if truncated != infoHash {
			return ParseResult{}, errors.New("v2 truncated info hash mismatch")
		}

		result.V2Hash = &v2Full
	default:
		// V1-only torrent: existing SHA-1 verification
		result.MetaVersion = MetaVersionV1
		if protocol.ID(mi.HashBytes(metaInfoBytes)) != infoHash {
			return ParseResult{}, errors.New("info bytes have wrong hash")
		}
	}

	return result, nil
}
