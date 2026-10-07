// Six steps of one pour-over. from/to: story progress (0..1) each real section maps onto.
// Progress is a story position, not brewing time or water amount.
export const STEPS = [
  { id: 'bean', label: '원두', from: 0, to: 0.12 },
  { id: 'grind', label: '분쇄', from: 0.12, to: 0.28 },
  { id: 'setup', label: '준비', from: 0.28, to: 0.44 },
  { id: 'bloom', label: '뜸들이기', from: 0.44, to: 0.6 },
  { id: 'pour', label: '추출', from: 0.6, to: 0.9 },
  { id: 'cup', label: '완성', from: 0.9, to: 1 },
];

// Timing of the scene inside the story. Change these to retime the drawing.
export const T = {
  beansToHopper: [0, 0.12],   // beans turn and travel to the grinder mouth
  grinderIn: [0.08, 0.12],
  beansDrop: [0.12, 0.17],    // beans sink behind the grinder front
  crank: [0.13, 0.27],
  grounds: [0.15, 0.27],      // particles fall from the outlet
  grinderOut: [0.28, 0.33],
  align: [0.3, 0.41],         // cup, dripper and filter settle on one axis
  bedIn: [0.39, 0.43],        // ground coffee sits in the filter
  kettleIn: [0.44, 0.46],
  pours: [[0.46, 0.5], [0.61, 0.72], [0.76, 0.83]], // first one is the bloom
  wet: [0.46, 0.52],
  bubbles: [0.48, 0.6],
  drip: [0.62, 0.885],        // drips keep going after the kettle stops
  kettleOut: [0.89, 0.92],
  dripperAside: [0.92, 0.97], // only after the last drop
  steam: [0.95, 0.99],
};

export const CUP_FILL = 0.78; // share of the cup's inner height when finished (drawing only)
