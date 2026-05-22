import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/use.song";

const Player = () => {
  const { song } = useSong();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef(null);

  const tracks = Array.isArray(song) ? song : song ? [song] : [];
  const currentTrack = tracks[currentIndex] ?? null;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (!tracks.length || !audioRef.current) return;
    if (currentIndex >= tracks.length) {
      setCurrentIndex(0);
      return;
    }
    audioRef.current.load();
  }, [currentIndex, tracks.length]);

  const handleSkip = (direction) => {
    if (!tracks.length) return;
    setCurrentIndex((prev) => {
      if (direction === "forward") {
        return prev === tracks.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? tracks.length - 1 : prev - 1;
    });
  };

  return (
    <section className="max-w-3xl mx-auto my-8 p-6 bg-slate-950/90 border border-slate-700 rounded-3xl shadow-2xl text-white">
      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Moodify Player</p>
          <h2 className="text-3xl font-semibold">
            {currentTrack?.title ?? "No track loaded"}
          </h2>
          <p className="text-sm text-slate-400">
            {tracks.length
              ? `Track ${currentIndex + 1} of ${tracks.length}`
              : "Load a mood song to start playing."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[130px_1fr] items-center">
          {currentTrack?.posterurl ? (
            <img
              src={currentTrack.posterurl}
              alt={currentTrack.title}
              className="h-32 w-32 rounded-3xl object-cover border border-slate-700"
            />
          ) : (
            <div className="h-32 w-32 rounded-3xl border border-slate-700 bg-slate-900 flex items-center justify-center text-slate-500">
              No cover
            </div>
          )}

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-900/80 p-4 border border-slate-800">
              <audio ref={audioRef} src={currentTrack?.url ?? ""} preload="metadata" />
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-400">Audio source</span>
                  <span className="text-sm text-slate-300">
                    {currentTrack?.url ? "Ready to play" : "No audio available"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={() => handleSkip("backward")}
                    className="rounded-full bg-slate-800 px-4 py-3 hover:bg-slate-700 transition"
                  >
                    ⏮
                  </button>
                  <button
                    type="button"
                    onClick={() => audioRef.current?.play()}
                    className="rounded-full bg-slate-800 px-4 py-3 hover:bg-slate-700 transition"
                  >
                    ▶️
                  </button>
                  <button
                    type="button"
                    onClick={() => audioRef.current?.pause()}
                    className="rounded-full bg-slate-800 px-4 py-3 hover:bg-slate-700 transition"
                  >
                    ⏸
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSkip("forward")}
                    className="rounded-full bg-slate-800 px-4 py-3 hover:bg-slate-700 transition"
                  >
                    ⏭
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-slate-900/80 rounded-3xl p-4 border border-slate-800">
              <div>
                <p className="text-sm text-slate-400">Speed</p>
                <p className="text-lg font-medium text-white">{playbackRate}x</p>
              </div>
              <select
                value={playbackRate}
                onChange={(e) => setPlaybackRate(Number(e.target.value))}
                className="w-full sm:w-40 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-sky-500"
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player