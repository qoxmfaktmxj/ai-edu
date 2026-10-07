// Ten worlds from the Sun to Pluto. Numbers and facts come from NASA pages (linked per body).
// disc: share of the picture's width taken by the body's disc (measured from the pictures), used for the true-to-scale Earth comparison.
// Screen sizes and distances are staging; only the comparison uses real diameter ratios.
const img = (name) => new URL(`../assets/img/${name}.webp`, import.meta.url).href;
const facts = (id) => `https://science.nasa.gov/${id}/facts/`;
const SHEET = { label: 'NASA Planetary Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' };

export const EARTH_KM = 12756;

export const BODIES = [
  { id: 'sun', nameKo: '태양', nameEn: 'Sun', kind: '항성', img: img('sun'), disc: 0.9, diameterKm: 1391400,
    intro: '태양계의 중심에서 스스로 빛나는 별.',
    stats: { 지름: '약 139만 km', '태양과의 거리': '-', '하루(자전)': '적도 약 25 지구일, 극 약 36 지구일', '1년(공전)': '-', 위성: '-' },
    facts: ['태양은 태양계 전체 질량의 99.8%를 차지합니다.', '태양 부피 안에는 지구가 약 130만 개 들어갑니다.'],
    sources: [{ label: 'NASA Sun Facts', url: facts('sun') }, { label: 'NASA Sun Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html' }],
    action: { type: 'flare', label: '홍염 보기' } },
  { id: 'mercury', nameKo: '수성', nameEn: 'Mercury', kind: '행성', img: img('mercury'), disc: 0.86, diameterKm: 4879,
    intro: '태양에 가장 가까운 작은 바위 행성.',
    stats: { 지름: '4,879 km', '태양과의 거리': '약 5,800만 km (0.4 AU)', '하루(자전)': '약 59 지구일', '1년(공전)': '약 88 지구일', 위성: '없음' },
    facts: ['수성은 태양계에서 가장 작고 가장 빠른 행성입니다.', '낮에는 430도까지 오르고 밤에는 영하 180도까지 내려갑니다.'],
    sources: [{ label: 'NASA Mercury Facts', url: facts('mercury') }, SHEET] },
  { id: 'venus', nameKo: '금성', nameEn: 'Venus', kind: '행성', img: img('venus'), disc: 0.853, diameterKm: 12104,
    intro: '두꺼운 구름에 덮인 뜨거운 행성.',
    stats: { 지름: '12,104 km', '태양과의 거리': '약 1억 800만 km (0.72 AU)', '하루(자전)': '약 243 지구일, 반대 방향으로 자전', '1년(공전)': '약 225 지구일', 위성: '없음' },
    facts: ['금성은 태양계에서 가장 뜨거운 행성입니다.', '표면 온도는 약 467도로 납이 녹을 만큼 뜨겁습니다.'],
    sources: [{ label: 'NASA Venus Facts', url: facts('venus') }, SHEET] },
  { id: 'earth', nameKo: '지구', nameEn: 'Earth', kind: '행성', img: img('earth'), disc: 0.874, diameterKm: 12756,
    intro: '바다와 구름, 생명이 있는 우리의 행성.',
    stats: { 지름: '12,756 km', '태양과의 거리': '약 1억 5,000만 km (1 AU)', '하루(자전)': '약 23.9시간', '1년(공전)': '약 365.25일', 위성: '1개 (달)' },
    facts: ['지구 표면의 약 71%는 바다로 덮여 있습니다.', '햇빛이 지구에 닿는 데 약 8분이 걸립니다.'],
    sources: [{ label: 'NASA Earth Facts', url: facts('earth') }, SHEET],
    action: { type: 'day', label: '하루 돌려 보기' } },
  { id: 'mars', nameKo: '화성', nameEn: 'Mars', kind: '행성', img: img('mars'), disc: 0.864, diameterKm: 6792,
    intro: '녹슨 흙으로 붉게 보이는 행성.',
    stats: { 지름: '6,792 km', '태양과의 거리': '약 2억 2,800만 km (1.5 AU)', '하루(자전)': '약 24.6시간', '1년(공전)': '약 687 지구일', 위성: '2개 (포보스, 데이모스)' },
    facts: ['화성이 붉은 것은 흙 속의 철이 녹슬었기 때문입니다.', '작은 위성 포보스와 데이모스는 붙잡힌 소행성일 수 있습니다.'],
    sources: [{ label: 'NASA Mars Facts', url: facts('mars') }, SHEET] },
  { id: 'jupiter', nameKo: '목성', nameEn: 'Jupiter', kind: '행성', img: img('jupiter'), disc: 0.878, diameterKm: 142984,
    intro: '태양계에서 가장 큰 행성.',
    stats: { 지름: '142,984 km', '태양과의 거리': '약 7억 7,800만 km (5.2 AU)', '하루(자전)': '약 9.9시간', '1년(공전)': '약 12 지구년', 위성: '115개 (NASA 목성 페이지 기준)' },
    facts: ['대적점은 지구보다 폭이 약 두 배 넓은 거대한 폭풍입니다.', '대적점은 300년 넘게 관측되고 있습니다.'],
    sources: [{ label: 'NASA Jupiter Facts', url: facts('jupiter') }, { label: 'NASA Jupiter Moons', url: 'https://science.nasa.gov/jupiter/moons/' }, SHEET],
    action: { type: 'zoom', label: '대적점 확대', at: [0.59, 0.67], scale: 2.6 } },
  { id: 'saturn', nameKo: '토성', nameEn: 'Saturn', kind: '행성', img: img('saturn'), disc: 0.4, diameterKm: 120536, wide: true,
    intro: '넓은 고리를 두른 행성.',
    stats: { 지름: '120,536 km', '태양과의 거리': '약 14억 km (9.5 AU)', '하루(자전)': '약 10.7시간', '1년(공전)': '약 29.4 지구년', 위성: '274개 (2025년 3월 기준)' },
    facts: ['토성의 고리는 얼음과 바위 조각 수십억 개로 이루어져 있습니다.', '고리는 행성에서 약 28만 km까지 뻗어 있지만 두께는 약 10m입니다.'],
    sources: [{ label: 'NASA Saturn Facts', url: facts('saturn') }, SHEET],
    action: { type: 'zoom', label: '고리 확대', at: [0.17, 0.5], scale: 2.4 } },
  { id: 'uranus', nameKo: '천왕성', nameEn: 'Uranus', kind: '행성', img: img('uranus'), disc: 0.412, diameterKm: 51118,
    intro: '옆으로 누운 채 도는 얼음 거인.',
    stats: { 지름: '51,118 km', '태양과의 거리': '약 29억 km (19 AU)', '하루(자전)': '약 17시간', '1년(공전)': '약 84 지구년', 위성: '28개' },
    facts: ['천왕성은 옆으로 누운 채 태양 주위를 돕니다.', '자전축이 약 97.77도 기울어 있습니다.'],
    sources: [{ label: 'NASA Uranus Facts', url: facts('uranus') }, SHEET],
    action: { type: 'axis', label: '자전축 보기' } },
  { id: 'neptune', nameKo: '해왕성', nameEn: 'Neptune', kind: '행성', img: img('neptune'), disc: 0.848, diameterKm: 49528,
    intro: '태양에서 가장 먼 행성, 짙푸른 얼음 거인.',
    stats: { 지름: '49,528 km', '태양과의 거리': '약 45억 km (30 AU)', '하루(자전)': '약 16시간', '1년(공전)': '약 165 지구년', 위성: '16개' },
    facts: ['해왕성은 태양계에서 바람이 가장 센 행성입니다.', '해왕성은 계산으로 위치를 먼저 예측한 뒤 찾아낸 행성입니다.'],
    sources: [{ label: 'NASA Neptune Facts', url: facts('neptune') }, SHEET] },
  { id: 'pluto', nameKo: '명왕성', nameEn: 'Pluto', kind: '왜행성', img: img('pluto'), disc: 0.835, diameterKm: 2377,
    intro: '하트 모양의 밝은 지형이 있는 왜행성.',
    stats: { 지름: '2,377 km', '태양과의 거리': '약 59억 km (39 AU)', '하루(자전)': '약 153시간', '1년(공전)': '약 248 지구년', 위성: '5개' },
    facts: ['뉴호라이즌스호가 2015년 명왕성 곁을 지나며 관측했습니다.', '가장 큰 위성 카론은 명왕성의 절반쯤 되는 크기입니다.'],
    sources: [{ label: 'NASA Pluto Facts', url: 'https://science.nasa.gov/dwarf-planets/pluto/facts/' }, { label: 'NASA Pluto', url: 'https://science.nasa.gov/dwarf-planets/pluto/' }, { label: 'NASA Pluto Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/plutofact.html' }] },
];

export const BACKDROP = { stars: img('stars'), orbit: img('orbit') };
export const CREDITS = '천체와 우주 이미지는 ChatGPT로 생성했습니다. AI 생성 이미지라 실제 모습과 다를 수 있습니다.';
