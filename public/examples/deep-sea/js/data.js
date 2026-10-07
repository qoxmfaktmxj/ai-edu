// Scene ranges, text and color stops. Depths are a virtual descent, not measured data.
export const MAX_DEPTH = 4000;

// The hero maps to 0m. Scene text also lives in index.html so it reads without JavaScript.
export const SCENES = [
  { id: 'surface', start: 0, end: 0, title: '수면' },
  { id: 's1', start: 0, end: 200, title: '빛이 머무는 바다', desc: '아래로 내려갈수록, 물속의 빛은 약해집니다.' },
  { id: 's2', start: 200, end: 1000, title: '마지막 푸른빛', desc: '희미한 빛을 지나, 태양빛이 닿지 않는 깊이로.' },
  { id: 's3', start: 1000, end: 2200, title: '스스로 빛나는 세계', desc: '어둠 속에서도, 빛을 만드는 생명이 있습니다.' },
  { id: 's4', start: 2200, end: 3500, title: '어둠을 관찰하는 빛', desc: '관측등을 켜고, 눈앞의 형상을 살펴보세요.' },
  // Depth reaches 4,000m at 60% of the last section and holds there.
  { id: 's5', start: 3500, end: 4000, title: '마지막 관측 지점', reachAt: 0.6 },
];

// Water color at the top, middle and bottom of the screen for a given depth. Interpolated between stops.
export const WATER = [
  { d: 0, c: ['#39CED0', '#0A6AA0', '#07457A'] },
  { d: 200, c: ['#0A6AA0', '#0A4F86', '#071A3A'] },
  { d: 1000, c: ['#071A3A', '#05122B', '#030816'] },
  { d: 2200, c: ['#040C20', '#030816', '#02050E'] },
  { d: 3500, c: ['#030816', '#02050E', '#010309'] },
];

export const LAMP_FROM = 1000; // the lamp control appears from scene 3

export const SOURCES = [
  { label: 'NOAA, How far does light travel in the ocean?', url: 'https://oceanservice.noaa.gov/facts/light_travel.html' },
  { label: 'NOAA, What is bioluminescence?', url: 'https://oceanservice.noaa.gov/facts/biolum.html' },
  { label: 'NOAA, What is marine snow?', url: 'https://oceanservice.noaa.gov/facts/marinesnow.html' },
  { label: 'NOAA, How deep is the ocean?', url: 'https://oceanservice.noaa.gov/facts/oceandepth.html' },
];

// Field guide cards. Every fact, depth and size below comes from the linked source.
// Where a source gives no number, the field says so instead of guessing.
// k: CSS variable prefix of the drawing, art: class of the drawing (cloned into the card).
export const SPECIES = [
  {
    id: 'sardine', k: 'f', art: 'sardine', no: '01',
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
    id: 'lanternfish', k: 'n', art: 'lantern', no: '02',
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
    id: 'atolla', k: 'j', art: 'jelly', no: '03',
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
    id: 'anglerfish', k: 'a', art: 'angler', no: '04',
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
    id: 'gulper', k: 'p', art: 'serpent', no: '05',
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
    id: 'dumbo', k: 'u', art: 'dumbo', no: '06',
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
