"""Build assets/audio/soundtrack.m4a (28 s).

Music bed: synthesized here from sine waves and filtered noise (original, no license needed).
Effects: HyperFrames bundled SFX library (Pixabay Content License, see CREDITS.md there).
Run: python tools/make_soundtrack.py
"""
import os
import subprocess

import numpy as np

SR = 48000
DUR = 28.0
N = int(SR * DUR)
t = np.arange(N) / SR
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "audio")
SFX_DIR = os.path.expanduser(
    "~/.claude/plugins/cache/hyperframes/hyperframes/0.8.136/skills/media-use/audio/assets/sfx"
)
rng = np.random.default_rng(2026)


def env(points):
    """Piecewise-linear envelope from [(time, value), ...]."""
    xs, ys = zip(*points)
    return np.interp(t, xs, ys)


# ---- chord pad ----
CHORDS = [  # (start, end, freqs)
    (0.0, 6.2, [146.83, 220.0, 329.63, 369.99, 440.0]),  # D maj9
    (6.0, 12.1, [123.47, 185.0, 277.18, 293.66, 369.99]),  # B m9
    (11.9, 18.7, [98.0, 146.83, 185.0, 246.94, 277.18]),  # G maj7(#11 colour)
    (18.5, 28.0, [146.83, 220.0, 329.63, 369.99, 440.0]),  # D maj9
]
pad = np.zeros(N)
for i, (a, b, freqs) in enumerate(CHORDS):
    e = env([(0, 0), (max(0, a - 0.01), 0), (a + 0.6, 1), (b - 0.4, 1), (b + 0.2, 0), (DUR, 0)])
    for k, f in enumerate(freqs):
        amp = 0.05 if k == 0 else 0.032
        ph = rng.uniform(0, 2 * np.pi)
        voice = np.sin(2 * np.pi * f * t + ph) + 0.6 * np.sin(2 * np.pi * f * 1.003 * t + ph * 0.5)
        trem = 0.8 + 0.2 * np.sin(2 * np.pi * (0.17 + 0.03 * k) * t + k)
        pad += amp * voice * trem * e

# airy organic texture: smoothed noise
noise = rng.standard_normal(N)
kernel = np.hanning(240)
kernel /= kernel.sum()
air = np.convolve(noise, kernel, mode="same")
air = air - np.convolve(air, np.ones(4800) / 4800, mode="same")
air *= 0.9 * (0.6 + 0.4 * np.sin(2 * np.pi * 0.11 * t))

# ---- soft electronic plucks on a half-second grid ----
plucks = np.zeros(N)
notes = [587.33, 739.99, 880.0, 659.25, 987.77, 739.99, 880.0, 1174.66]
beat = 0
for start in np.arange(2.6, 23.4, 0.5):
    if 15.15 < start < 15.7:  # silence for the frozen moment
        continue
    f = notes[beat % len(notes)] * (0.5 if 6.0 < start < 18.5 and beat % 3 == 0 else 1.0)
    vel = 0.035 + 0.02 * ((beat * 7) % 5) / 4
    beat += 1
    i0 = int(start * SR)
    L = int(0.6 * SR)
    tt = np.arange(L) / SR
    tone = (np.sin(2 * np.pi * f * tt) + 0.25 * np.sin(2 * np.pi * 2 * f * tt)) * np.exp(-tt / 0.16)
    tone *= np.minimum(1, tt / 0.004)
    seg = plucks[i0 : i0 + L]
    seg += vel * tone[: len(seg)]

# ---- mix bed with the scene dynamics ----
bed_gain = env(
    [(0, 0), (1.4, 0.85), (15.1, 0.85), (15.25, 0.32), (15.62, 0.32), (16.0, 0.9), (26.6, 0.9), (28.0, 0)]
)
bed = (pad + air + plucks) * bed_gain
stereo = np.stack([bed, bed], axis=1)
# gentle stereo width: delay the right channel slightly
stereo[:, 1] = np.roll(bed, int(0.012 * SR))


def load_sfx(name):
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", os.path.join(SFX_DIR, name), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"],
        check=True,
        capture_output=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).copy()


CUES = [  # (time, file, gain, max seconds)
    (0.70, "whoosh.mp3", 0.45, None),  # pull back from the surface
    (1.58, "ping.mp3", 0.16, None),  # the whole fruit lands
    (6.30, "sparkle.mp3", 0.28, None),  # light becomes the cut
    (6.55, "whoosh-short.mp3", 0.35, None),  # halves part
    (10.35, "whoosh-cinematic.mp3", 0.3, 1.9),  # section outline becomes the screen
    (14.18, "whoosh-short.mp3", 0.35, None),  # drops spread
    (15.22, "click-soft.mp3", 0.5, None),  # time stops
    (15.24, "ping.mp3", 0.14, None),
    (15.60, "whoosh.mp3", 0.4, None),  # time restarts
    (17.85, "whoosh.mp3", 0.4, None),  # lens wipe
    (24.35, "chime.mp3", 0.2, None),  # final title
]
for at, name, gain, cap in CUES:
    s = load_sfx(name)
    if cap:
        n = int(cap * SR)
        s = s[:n] * np.linspace(1, 0, min(n, len(s)))[:, None] ** 0.5
    i0 = int(at * SR)
    n = min(len(s), N - i0)
    stereo[i0 : i0 + n] += gain * s[:n]

# final 1 s fade and peak normalise to -1 dBFS
stereo *= env([(0, 1), (27.0, 1), (28.0, 0)])[:, None]
stereo *= 0.89 / np.max(np.abs(stereo))

os.makedirs(OUT, exist_ok=True)
pcm = (stereo * 32767).astype("<i2").tobytes()
subprocess.run(
    ["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", str(SR), "-ac", "2", "-i", "-",
     "-c:a", "aac", "-b:a", "160k", os.path.join(OUT, "soundtrack.m4a")],
    input=pcm,
    check=True,
)
print("wrote", os.path.join(OUT, "soundtrack.m4a"))
