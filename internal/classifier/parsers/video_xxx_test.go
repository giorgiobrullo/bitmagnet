package parsers

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestParseXxxTitle(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		input    string
		expected string
	}{
		// === Western dated scenes: Studio.YY.MM.DD.Scene.Name.XXX.quality ===
		// The title should include the studio prefix and strip tech tokens.
		{
			name:     "standard dated scene with studio",
			input:    "Vixen.22.05.20.Agatha.Vega.XXX.1080p.MP4-WRB",
			expected: "Vixen Agatha Vega",
		},
		{
			name:     "NubileFilms dated scene",
			input:    "NubileFilms.25.12.11.Maya.Sinn.Instrument.Of.Pleasure.XXX.1080p.MP4-WRB[XC]",
			expected: "NubileFilms Maya Sinn Instrument Of Pleasure",
		},
		{
			name:     "DaneJones dated scene",
			input:    "DaneJones.16.05.03.Mona.Kim.Sexual.Adrenaline.XXX.1080p.MP4-KTR[VR56]",
			expected: "DaneJones Mona Kim Sexual Adrenaline",
		},
		{
			name:     "BrazzersExxtra dated scene",
			input:    "BrazzersExxtra.23.06.13.Jesse.Pony.Slip.Sliding.Into.Her.Stuck.Pussy.XXX.720p.MP4-XXX[XC]",
			expected: "BrazzersExxtra Jesse Pony Slip Sliding Into Her Stuck Pussy",
		},
		{
			name:     "Slayed dated scene",
			input:    "Slayed.22.05.31.Violet.Myers.And.Anissa.Kate.XXX.1080p.MP4-NBQ[rarbg]",
			expected: "Slayed Violet Myers And Anissa Kate",
		},
		{
			name:     "FreeUseFantasy HEVC scene",
			input:    "FreeUseFantasy.21.05.26.Honey.Hayes.Dani.Blu.And.Ashley.Aleigh.Hypnodick.XXX.1080p.HEVC.x265.PRT",
			expected: "FreeUseFantasy Honey Hayes Dani Blu And Ashley Aleigh Hypnodick",
		},
		{
			name:     "AnalOnly HEVC scene",
			input:    "AnalOnly.21.09.26.Kyler.Quinn.XXX.1080p.HEVC.x265.PRT",
			expected: "AnalOnly Kyler Quinn",
		},
		{
			name:     "BLACKED 4K scene",
			input:    "BLACKED.19.09.27.bella.rolland-4K",
			expected: "BLACKED bella rolland",
		},
		{
			name:     "RickysRoom HEVC scene",
			input:    "RickysRoom.25.11.30.Chanell.Heart.Live.Show.2.XXX.1080p.HEVC.x265.PRT",
			expected: "RickysRoom Chanell Heart Live Show 2",
		},
		{
			name:     "PornMegaLoad HEVC scene",
			input:    "PornMegaLoad.22.02.25.Selah.Rain.The.Swinging.MILF.And.The.Swinging.Dick.XXX.1080p.HEVC.x265.PRT[XvX]",
			expected: "PornMegaLoad Selah Rain The Swinging MILF And The Swinging Dick",
		},
		{
			name:     "OnlyTeenBlowJobs WEB scene",
			input:    "OnlyTeenBlowJobs.19.06.27.Lexi.Lore.Homework.Break.XXX.720p.WEB.x264-GalaXXXy[XvX]",
			expected: "OnlyTeenBlowJobs Lexi Lore Homework Break",
		},
		{
			name:     "MyPervyFamily 480p scene",
			input:    "MyPervyFamily.24.04.11.Sophia.Leone.My.Submissive.Stepsis.XXX.1080p.MP4-P2P[XC]",
			expected: "MyPervyFamily Sophia Leone My Submissive Stepsis",
		},
		{
			name:     "1111Customs dated scene",
			input:    "1111Customs.25.02.06.Penny.Barber.Nervous.Knots.A.Mothers.Touch.In.First.Date.Dance.XXX.480p.MP4-XXX[XC]",
			expected: "1111Customs Penny Barber Nervous Knots A Mothers Touch In First Date Dance",
		},
		{
			name:     "SheSeducedMe multiple performers",
			input:    "SheSeducedMe.26.02.23.Alina.Angel.Clair.Black.Daydream.Daisy.And.Freya.Von.Doom.XXX.480p.MP4-XXX[XC]",
			expected: "SheSeducedMe Alina Angel Clair Black Daydream Daisy And Freya Von Doom",
		},
		{
			name:     "BrazzersExxtra with double dot before scene",
			input:    "BrazzersExxtra.20.04.27.Vina.Sky.The.Gape.That.Keeps.On.Giving..480p.MP4-XXX",
			expected: "BrazzersExxtra Vina Sky The Gape That Keeps On Giving",
		},
		{
			name:     "boobday lowercase with xxx in middle",
			input:    "boobday.17.07.10.sirena.xxx.and.katrina.moreno.mp4",
			expected: "boobday sirena xxx and katrina moreno",
		},
		{
			name:     "brattysis lowercase no XXX marker",
			input:    "brattysis.17.12.15.sydney.cole.fucking.my.step.sister.mp4",
			expected: "brattysis sydney cole fucking my step sister",
		},
		// === Dot-separated release groups and "SD" tech token ===
		{
			name:     "dot-separated release group KTR",
			input:    "BigTitsRoundAsses.14.05.01.Ava.Addams.XXX.1080p.MP4.KTR",
			expected: "BigTitsRoundAsses Ava Addams",
		},
		{
			name:     "SD quality token stripped",
			input:    "Blacked.18.08.23.Izzy.Lush.XXX.SD.MP4-KLEENEX",
			expected: "Blacked Izzy Lush",
		},
		{
			name:     "release group OHRLY",
			input:    "SilviaSaint.13.04.07.Casting.59.Caren.BTS.XXX.1080p.MP4-OHRLY[rarbg]",
			expected: "SilviaSaint Casting 59 Caren BTS",
		},
		{
			name:     "INTERNAL token stripped",
			input:    "SugarBabesTV.21.05.06.Julia.I.Like.Kinky.Boys.iNTERNAL.XXX.2160p.MP4-LUST",
			expected: "SugarBabesTV Julia I Like Kinky Boys",
		},
		// === Language tags and VR tokens stripped ===
		{
			name:     "JAPANESE language tag stripped",
			input:    "TripForFuck.23.05.05.Mirei.JAPANESE.XXX.1080p.MP4-WRB[XC]",
			expected: "TripForFuck Mirei",
		},
		{
			name:     "VR180 and high-res VR stripped",
			input:    "StasyQVR.20.02.10.Mary.Q.Young.Goddess.XXX.VR180.2700p.MP4-GUSH[rarbg]",
			expected: "StasyQVR Mary Q Young Goddess",
		},
		{
			name:     "HR quality token stripped",
			input:    "Paintoy.14.09.24.Emma.XXX.HR.MP4-YAPG[rarbg]",
			expected: "Paintoy Emma",
		},
		{
			name:     "WEBRip and x264 stripped with release group",
			input:    "AltErotic.17.01.20.Kitten.Wants.To.Have.A.Tattoo.On.Half.Of.Her.Face.XXX.720p.HD.WEBRip.x264-TGxXX[XvX]",
			expected: "AltErotic Kitten Wants To Have A Tattoo On Half Of Her Face",
		},
		// === Dash-separated format with parenthesized date ===
		{
			name:     "Brazzers dash-separated with parenthesized date",
			input:    "Brazzers - Demi Hawks, Emma Rosie - Hot & Mean Anal Tease (18.11.2025) rq.mp4",
			expected: "Brazzers Demi Hawks Emma Rosie Hot & Mean Anal Tease",
		},
		{
			name:     "MyPervyFamily dash-separated",
			input:    "MyPervyFamily - Scarlett Alexis - The Solution... You Be My Fuck Buddy (18.11.2023) rq.mp4",
			expected: "MyPervyFamily Scarlett Alexis The Solution... You Be My Fuck Buddy",
		},
		{
			name:     "WakeUpNFuck dash-separated",
			input:    "WakeUpNFuck - Amhyra Shy - WUNF 427 (10.09.2025) rq.mp4",
			expected: "WakeUpNFuck Amhyra Shy WUNF 427",
		},
		{
			name:     "MomIsHorny dash-separated",
			input:    "MomIsHorny - Aderes Quin - BIG Extra Credit (22.08.2025) rq.mp4",
			expected: "MomIsHorny Aderes Quin BIG Extra Credit",
		},
		{
			name:     "dash-separated with _1080p quality suffix",
			input:    "Aylla Mel - Aylla Mell - Creamy-Anal Babe Rides A Big Cock (17.11.2025)_1080p.mp4",
			expected: "Aylla Mel Aylla Mell Creamy-Anal Babe Rides A Big Cock",
		},
		{
			name:     "MomWantsCreampie dash-separated",
			input:    "MomWantsCreampie - Rachael Cavalli - I Need A Younger Man To Breed Me (31.12.2025) rq.mp4",
			expected: "MomWantsCreampie Rachael Cavalli I Need A Younger Man To Breed Me",
		},
		// === Non-dated xxx titles: should return full cleaned title ===
		{
			name:     "simple xxx title no date",
			input:    "The XXX Movie 1080p",
			expected: "The XXX Movie",
		},
		{
			name:     "title with brackets and tech",
			input:    "Gangland Cream Pie Volume 6.XXX.720P",
			expected: "Gangland Cream Pie Volume 6",
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			result := parseXxxTitle(tc.input)
			assert.Equal(t, tc.expected, result)
		})
	}
}
