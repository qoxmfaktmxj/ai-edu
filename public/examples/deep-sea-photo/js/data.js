// Story ranges and field-guide facts are shared by both versions.
// Only ASSETS and CREDITS differ between deep-sea-photo and deep-sea-ai.

// Virtual depth of each scene. Screen depth is staging; real known depths are in the field-guide cards.
export const SCENES = [
  { id: 's1', start: 0, end: 200, zone: '햇빛층' },
  { id: 's2', start: 200, end: 1000, zone: '박명층' },
  { id: 's3', start: 1000, end: 1600, zone: '빛이 닿지 않는 바다' },
  { id: 's4', start: 1600, end: 2200, zone: '빛이 닿지 않는 바다' },
  { id: 's5', start: 2200, end: 3000, zone: '빛이 닿지 않는 바다' },
  { id: 's6', start: 3000, end: 4000, zone: '마지막 관측 지점' },
];

export const VERSION = '실제 사진판';

const img = (name) => new URL(`../assets/img/${name}`, import.meta.url).href;
// blend 'screen' drops a black background; cut-outs with transparency use 'normal'.
// lure / tail: position of the light organ inside the picture (0..1), for the glow layer.
export const ASSETS = {
  s1: { src: img('s1.webp'), alt: '수족관 수조 속을 촘촘하게 헤엄치는 태평양정어리 떼' },
  s2: null,
  lanternfish: { src: img('lanternfish.webp'), blend: 'normal', alt: '샛비늘치 두 마리를 찍은 표본 사진' },
  atolla: { src: img('atolla.webp'), blend: 'normal', alt: '깊은 바다에서 촬영한 붉은 아톨라속 해파리' },
  anglerfish: { src: img('anglerfish.webp'), blend: 'normal', lure: [0.33, 0.03], alt: '초롱아귀류(Himantolophus) 표본 사진. 둥근 검은 몸' },
  gulper: { src: img('gulper.webp'), blend: 'screen', tail: null, alt: '어둠 속 펠리칸장어의 머리와 크게 벌어진 턱' },
  dumbo: { src: img('dumbo.webp'), blend: 'screen', alt: '깊은 바다에서 촬영한 덤보문어. 귀 같은 지느러미와 짧은 팔' },
};

export const CREDITS = [
  { what: '첫 화면(다이버와 물고기 떼)', by: 'National Marine Sanctuaries (NOAA)', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:CINMS_diver_with_bait_ball_(48770613818).jpg' },
  { what: '정어리 떼', by: 'Rhododendrites', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', url: 'https://commons.wikimedia.org/wiki/File:School_of_sardines_at_the_Monterey_Bay_Aquarium_(12056).jpg', note: '아래쪽 관람객 부분을 잘라 냄' },
  { what: '샛비늘치', by: 'NOAA/OER', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Lanternfish_by_NOAA.jpg', note: '배경을 지움' },
  { what: '아톨라속 해파리', by: 'NOAA Office of Ocean Exploration and Research', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Coronate_of_the_genus_Atolla_Puerto_Rico_28_April_2015.png', note: '해파리 주변만 잘라 가장자리를 흐리게 함' },
  { what: '초롱아귀류(Himantolophus)', by: 'Jon Moore / NOAA Ocean Explorer', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Himantolophus_sp.jpg', note: '배경을 지움' },
  { what: '펠리칸장어', by: 'David Shale', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', url: 'https://commons.wikimedia.org/wiki/File:Eurypharynx_head.png' },
  { what: '덤보문어', by: 'NOAA Okeanos Explorer', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Dumbo-hires.jpg', note: '덤보문어 주변만 잘라 냄' },
];

// Field guide cards. Every fact, depth and size below comes from the linked source.
// Where a source gives no number, the field says so instead of guessing.
// img: key in ASSETS used as the card picture.
export const SPECIES = [
  {
    id: 'sardine', img: 's1', no: '01',
    nameKo: '정어리', nameEn: 'Pacific sardine', sci: 'Sardinops sagax', group: '어류',
    depth: '수면 가까운 바다. 출처에 깊이 수치는 없습니다.',
    size: '30cm 넘게 자라기도 하며, 최대 약 38cm',
    facts: [
      '플랑크톤을 먹고 사는 작은 물고기입니다.',
      '수면 가까이에서 크고 촘촘한 무리를 지어 삽니다.',
    ],
    sources: [
      { label: 'NOAA Fisheries, Pacific Sardine', url: 'https://www.fisheries.noaa.gov/species/pacific-sardine' },
      { label: 'Monterey Bay Aquarium, Pacific sardine', url: 'https://www.montereybayaquarium.org/animals-the-ocean/animals-a-to-z/pacific-sardine' },
    ],
  },
  {
    id: 'lanternfish', img: 'lanternfish', no: '02',
    nameKo: '샛비늘치류', nameEn: 'Lanternfish', sci: 'Myctophidae', group: '어류',
    depth: '대략 200 - 1,000m. 낮에는 400 - 1,000m에 머물다 위쪽 200m까지 올라옵니다.',
    size: '대부분 15cm 미만. 작은 종은 약 3cm, 큰 종은 약 35cm',
    facts: [
      '몸 옆면에 빛을 내는 기관이 줄지어 있습니다.',
      '낮에는 깊은 곳에 있다가 위쪽 바다로 올라갑니다.',
      '전 세계에 250종이 넘는 큰 무리입니다.',
    ],
    sources: [
      { label: 'Australian Museum, Lanternfishes', url: 'https://australian.museum/learn/animals/fishes/classification-diversity-and-biology-of-lanternfishes/' },
    ],
  },
  {
    id: 'atolla', img: 'atolla', no: '03',
    nameKo: '아톨라해파리', nameEn: 'Deep-sea crown jelly', sci: 'Atolla', group: '자포동물',
    depth: '대략 500 - 5,000m (아톨라속 전체 기준)',
    size: '최대 약 15cm (아톨라속 전체 기준)',
    facts: [
      '깊은 바다에서는 붉은색이 검게 보여 몸을 숨기기 좋습니다.',
      '위협을 받으면 파란 빛이 몸 둘레를 바퀴처럼 돕니다.',
      '이 빛은 더 큰 포식자를 부르는 도둑 경보기에 비유됩니다.',
    ],
    sources: [
      { label: 'MBARI, Deep-sea crown jelly', url: 'https://www.mbari.org/animal/deep-sea-crown-jelly/' },
      { label: 'NOAA Ocean Exploration, Atolla sp.', url: 'https://oceanexplorer.noaa.gov/multimedia/daily-image/media/20210117.html' },
    ],
  },
  {
    id: 'anglerfish', img: 'anglerfish', no: '04',
    nameKo: '심해 초롱아귀류', nameEn: 'Deep-sea anglerfish', sci: 'Ceratioidei', group: '어류',
    depth: '대략 300 - 4,000m (어린 개체는 더 얕은 곳)',
    size: '종마다 다르며 큰 것은 약 1.2m. 수컷은 몇 cm 정도로 작습니다.',
    facts: [
      '등지느러미가 변한 낚싯대 끝에 미끼가 달려 있습니다.',
      '미끼 속 발광세균이 빛을 내 먹이를 끌어들입니다.',
      '일부 종은 작은 수컷이 암컷 몸에 붙어 삽니다.',
    ],
    sources: [
      { label: 'MBARI, Deep-sea anglerfish', url: 'https://www.mbari.org/animal/deep-sea-anglerfish/' },
    ],
  },
  {
    id: 'gulper', img: 'gulper', no: '05',
    nameKo: '펠리칸장어', nameEn: 'Pelican eel', sci: 'Eurypharynx pelecanoides', group: '어류',
    depth: '대략 500 - 3,000m',
    size: '최대 약 80cm (출처에 따라 약 1m로도 적습니다)',
    facts: [
      '몸에 비해 아주 큰 턱을 가진 심해 장어입니다.',
      '꼬리 끝에 빛을 내는 기관이 있습니다.',
      '주로 갑각류를 먹고 물고기도 잡아먹습니다.',
    ],
    sources: [
      { label: 'Australian Museum, Pelican Eel', url: 'https://australian.museum/learn/animals/fishes/pelican-eel-eurypharynx-pelecanoides/' },
      { label: 'WHOI, Pelican eel', url: 'https://www.whoi.edu/ocean-learning-hub/ocean-facts/pelican-eel/' },
    ],
  },
  {
    id: 'dumbo', img: 'dumbo', no: '06',
    nameKo: '덤보문어', nameEn: 'Dumbo octopus', sci: 'Grimpoteuthis', group: '두족류',
    depth: '약 4,000m 깊이에서도 발견된 기록이 있습니다.',
    size: '확인한 출처에 크기 수치가 없어 적지 않았습니다.',
    facts: [
      '머리 옆의 귀 같은 지느러미로 헤엄칩니다.',
      '가장 깊은 곳에 사는 문어류 중 하나입니다.',
      '먹물주머니가 없습니다.',
    ],
    sources: [
      { label: 'NOAA Ocean Exploration, Cephalopods', url: 'https://oceanexplorer.noaa.gov/explorations/19biolum/background/cephalopods/cephalopods.html' },
      { label: 'NOAA Okeanos Explorer, 2014-04-28 log', url: 'https://archive.oceanexplorer.noaa.gov/okeanos/explorations/ex1402/logs/apr28/apr28.html' },
    ],
  },
];
