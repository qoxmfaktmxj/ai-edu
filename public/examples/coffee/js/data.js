// Scenes of one pour-over. Pictures are AI-generated photographs; every overlay point is a
// fraction (0..1) of its picture, so drops, steam and bubbles stay glued to the photo at any screen size.
const img = (name) => new URL(`../assets/img/${name}.webp`, import.meta.url).href;

export const SCENES = {
  bean:  { src: img('beans'),   ar: 1376 / 768, focus: [0.36, 0.5], mFocus: [0.3, 0.45] },
  grind: { src: img('grinder'), ar: 1376 / 768, focus: [0.62, 0.5], mFocus: [0.66, 0.45],
           crank: [0.66, 0.21], drawer: [0.56, 0.74] },
  setup: { src: img('setup'),   ar: 1376 / 768, focus: [0.62, 0.5], mFocus: [0.7, 0.42],
           filter: [0.7, 0.17], outlet: [0.7, 0.62], floor: [0.7, 0.87] },
  bloom: { src: img('bloom'),   ar: 1672 / 941, focus: [0.5, 0.5], mFocus: [0.52, 0.45],
           bed: [0.52, 0.5], bedR: [0.3, 0.3] },
  pour:  { src: img('pour'),    ar: 1672 / 941, focus: [0.5, 0.5], mFocus: [0.6, 0.42],
           spout: [0.6, 0.06], land: [0.625, 0.25], outlet: [0.632, 0.6], surface: [0.632, 0.76] },
  cup:   { src: img('cup'),     ar: 1672 / 941, focus: [0.58, 0.5], mFocus: [0.7, 0.42],
           steam: [0.66, 0.41] },
};

export const CREDITS = [
  { what: '원두, 그라인더, 드리퍼 준비 장면', by: 'Figma AI 이미지 생성(gemini-3.1-flash-image)' },
  { what: '뜸들이기, 붓기, 완성 장면', by: 'ChatGPT 이미지 생성' },
];
