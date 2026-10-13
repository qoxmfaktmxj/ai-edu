'use strict';
/* Web Audio 로 만든 소리. 오디오 파일은 쓰지 않는다. 처음에는 꺼져 있다. */
const AudioFX = {
  ctx: null,
  on: false,
  master: null,
  drone: null,
  rush: null,
  echo: null,
  bus: null,

  toggle() {
    if (this.on) this.disable(); else this.enable();
    return this.on;
  },

  enable() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!this.ctx) this.build(new AC());
    this.ctx.resume();
    this.on = true;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(0.8, this.ctx.currentTime, 0.25);
  },

  disable() {
    this.on = false;
    if (!this.ctx) return;
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.12);
  },

  // 바닥에서 배경음을 잠시 끈다 (1이면 원래대로)
  duck(v) { if (this.ctx) this.bus.gain.setTargetAtTime(v, this.ctx.currentTime, 0.25); },

  suspend() { if (this.ctx && this.ctx.state === 'running') this.ctx.suspend(); },
  resume() { if (this.ctx && this.on) this.ctx.resume(); },

  noiseBuffer(sec) {
    const c = this.ctx;
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * sec), c.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02; // 갈색 소음
      d[i] = last * 3.2;
    }
    return buf;
  },

  build(c) {
    this.ctx = c;
    this.master = c.createGain();
    this.master.gain.value = 0;
    this.master.connect(c.destination);

    // 소나 울림용 에코
    const dl = c.createDelay(1);
    dl.delayTime.value = 0.34;
    const fb = c.createGain();
    fb.gain.value = 0.38;
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1800;
    dl.connect(lp); lp.connect(fb); fb.connect(dl);
    lp.connect(this.master);
    this.echo = dl;

    // 배경음과 물살 소리는 한 줄(bus)을 거쳐 나가서, 바닥의 정적에서 한꺼번에 줄일 수 있다
    this.bus = c.createGain();
    this.bus.connect(this.master);

    // 웅웅거리는 배경음: 사인과 삼각파 두 개 + 낮은 소음
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 260;
    const g = c.createGain();
    g.gain.value = 0.16;
    f.connect(g); g.connect(this.bus);
    const o1 = c.createOscillator(); o1.type = 'sine';
    const o2 = c.createOscillator(); o2.type = 'triangle';
    const o3 = c.createOscillator(); o3.type = 'sine';
    o1.connect(f); o2.connect(f); o3.connect(f);
    const lfo = c.createOscillator(); lfo.frequency.value = 0.13;
    const lg = c.createGain(); lg.gain.value = 0.06;
    lfo.connect(lg); lg.connect(g.gain);
    const nz = c.createBufferSource(); nz.buffer = this.noiseBuffer(4); nz.loop = true;
    const nf = c.createBiquadFilter(); nf.type = 'lowpass'; nf.frequency.value = 140;
    const ng = c.createGain(); ng.gain.value = 0.35;
    nz.connect(nf); nf.connect(ng); ng.connect(g);
    [o1, o2, o3, lfo, nz].forEach(n => n.start());
    this.drone = { o1, o2, o3, f, g };

    // 빠르게 내릴 때 물살 소리
    const rn = c.createBufferSource(); rn.buffer = this.noiseBuffer(3); rn.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 420; bp.Q.value = 0.7;
    const rg = c.createGain(); rg.gain.value = 0;
    rn.connect(bp); bp.connect(rg); rg.connect(this.bus);
    rn.start();
    this.rush = { g: rg, bp };
  },

  // 깊어질수록 낮아지는 배경음
  update(depth, speed) {
    if (!this.ctx || !this.on) return;
    const t = this.ctx.currentTime;
    const k = Math.min(1, depth / 11000);
    const base = 92 - 58 * k;
    this.drone.o1.frequency.setTargetAtTime(base, t, 0.4);
    this.drone.o2.frequency.setTargetAtTime(base * 1.505, t, 0.4);
    this.drone.o3.frequency.setTargetAtTime(base * 0.5, t, 0.4);
    this.drone.f.frequency.setTargetAtTime(300 - 190 * k, t, 0.4);
    const v = Math.min(1, Math.abs(speed) / 3500);
    this.rush.g.gain.setTargetAtTime(v * 0.16, t, 0.12);
    this.rush.bp.frequency.setTargetAtTime(300 + v * 900, t, 0.12);
  },

  ping() {
    if (!this.ctx || !this.on) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(1500, t);
    o.frequency.exponentialRampToValueAtTime(1040, t + 0.9);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.34, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    o.connect(g); g.connect(this.master); g.connect(this.echo);
    o.start(t); o.stop(t + 1.2);
  },

  thud(strong) {
    if (!this.ctx || !this.on) return;
    const c = this.ctx, t = c.currentTime;
    const dur = strong ? 3.2 : 1.1;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(strong ? 62 : 90, t);
    o.frequency.exponentialRampToValueAtTime(strong ? 24 : 40, t + dur * 0.8);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(strong ? 1 : 0.7, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + dur + 0.1);
    const n = c.createBufferSource(); n.buffer = this.noiseBuffer(1.5);
    const nf = c.createBiquadFilter(); nf.type = 'lowpass'; nf.frequency.value = strong ? 180 : 320;
    const ng = c.createGain();
    ng.gain.setValueAtTime(strong ? 0.8 : 0.6, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.6);
    n.connect(nf); nf.connect(ng); ng.connect(this.master);
    n.start(t); n.stop(t + 1.5);
  },

  whoosh() {
    if (!this.ctx || !this.on) return;
    const c = this.ctx, t = c.currentTime;
    const n = c.createBufferSource(); n.buffer = this.noiseBuffer(3.4);
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 0.9;
    bp.frequency.setValueAtTime(200, t);
    bp.frequency.exponentialRampToValueAtTime(2600, t + 2.6);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.55, t + 1.8);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.3);
    n.connect(bp); bp.connect(g); g.connect(this.master);
    n.start(t); n.stop(t + 3.4);
  },

  blip() {
    if (!this.ctx || !this.on) return;
    const c = this.ctx, t = c.currentTime;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(520, t);
    o.frequency.exponentialRampToValueAtTime(880, t + 0.25);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    o.connect(g); g.connect(this.master);
    o.start(t); o.stop(t + 0.55);
  }
};
