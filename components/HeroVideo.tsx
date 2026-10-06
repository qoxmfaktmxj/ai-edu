"use client";

import { useEffect, useRef, useState } from "react";

// Looping intro video with a pause button (autoplaying motion must be stoppable).
// Starts paused for people who ask for reduced motion.
export default function HeroVideo({ note }: { note: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
      setPlaying(false);
    }
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
    setPlaying(!v.paused);
  };

  return (
    <div>
      <div className="hero-media">
        <video
          ref={ref}
          src="/assets/video/intro.mp4"
          poster="/assets/video/intro-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="교육 전체 흐름을 보여주는 소개 영상"
        />
        <button className="video-btn" type="button" onClick={toggle} aria-pressed={!playing} aria-label="소개 영상 일시정지">
          <i className={playing ? "ph ph-pause" : "ph ph-play"} />
        </button>
      </div>
      <p className="hero-media-note">{note}</p>
    </div>
  );
}
