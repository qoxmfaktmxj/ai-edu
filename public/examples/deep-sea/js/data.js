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
