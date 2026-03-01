package protocol

import (
	"database/sql/driver"
	"encoding/hex"
	"encoding/json"
	"errors"
	"io"
	"strings"
)

// IDv2 is a 32-byte SHA-256 info hash for BitTorrent v2 (BEP 52).
type IDv2 [32]byte

func ParseIDv2(str string) (IDv2, error) {
	b, err := hex.DecodeString(strings.TrimPrefix(str, "0x"))
	if err != nil {
		return IDv2{}, err
	}

	if len(b) != 32 {
		return IDv2{}, errors.New("v2 hash string must be 32 bytes")
	}

	var id IDv2

	copy(id[:], b)

	return id, nil
}

func NewIDv2FromByteSlice(b []byte) (id IDv2, _ error) {
	if n := copy(id[:], b); n != 32 {
		return id, errors.New("must be 32 bytes")
	}

	return
}

func (id IDv2) String() string {
	return hex.EncodeToString(id[:])
}

func (id IDv2) IsZero() bool {
	return id == [32]byte{}
}

// TruncateV1 returns the first 20 bytes as a v1-compatible ID,
// used for DHT lookups of v2-only torrents per BEP 52.
func (id IDv2) TruncateV1() ID {
	var v1 ID

	copy(v1[:], id[:20])

	return v1
}

func (id IDv2) Bytes() []byte {
	return id[:]
}

func (id *IDv2) Scan(value interface{}) error {
	v, ok := value.([]byte)
	if !ok {
		return errors.New("invalid bytes type")
	}

	copy(id[:], v)

	return nil
}

func (id IDv2) Value() (driver.Value, error) {
	return id[:], nil
}

func (id IDv2) MarshalJSON() ([]byte, error) {
	return json.Marshal(id.String())
}

func (id *IDv2) UnmarshalJSON(data []byte) error {
	var s string
	if err := json.Unmarshal(data, &s); err != nil {
		return err
	}

	tb, err := ParseIDv2(s)
	if err != nil {
		return err
	}

	*id = tb

	return nil
}

func (id *IDv2) UnmarshalGQL(input interface{}) error {
	switch input := input.(type) {
	case string:
		tb, err := ParseIDv2(input)
		if err != nil {
			return err
		}

		*id = tb

		return nil
	default:
		return errors.New("invalid hash type")
	}
}

func (id IDv2) MarshalGQL(w io.Writer) {
	_, _ = w.Write([]byte(`"` + id.String() + `"`))
}
