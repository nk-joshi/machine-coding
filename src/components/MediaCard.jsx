import React, { useEffect, useRef, useState } from "react";
import MediaDisplay from "./MediaDisplay";
import NavigationButtons from "./NavigationButtons";
import ProgressBar from "./ProgressBar";

const AUTO_ADVANCE_IMAGE = 5000;

export default function MediaCard({ data }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const videoRef = useRef(null);

  const current = data.media[index];

  const resetProgress = () => {
    clearInterval(intervalRef.current);
    setProgress(0);
  };

  const startProgress = (duration) => {
    resetProgress();
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min(1, elapsed / duration);
      setProgress(percent);
      if (percent === 1) {
        goNext();
      }
    }, 100);
  };

  const goNext = () => {
    resetProgress();
    setIndex((prev) => (prev + 1) % data.media.length);
  };

  const goPrev = () => {
    resetProgress();
    setIndex((prev) => (prev - 1 + data.media.length) % data.media.length);
  };

  useEffect(() => {
    setLoaded(false);
  }, [index]);

  useEffect(() => {
    if (!loaded) return;

    if (current.type === "image") {
      startProgress(AUTO_ADVANCE_IMAGE);
    } else if (current.type === "video") {
      const video = videoRef.current;
      if (video) {
        const onEnd = () => goNext();
        video.addEventListener("ended", onEnd);

        startProgress((current.duration || 10) * 1000);

        return () => video.removeEventListener("ended", onEnd);
      }
    }
  }, [loaded, index]);

  return (
    <div
      style={{
        position: "relative",
        margin: "auto",
        textAlign: "center",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          height: "500px",
          width: "400px",
        }}
      >
        {!loaded && (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              background: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            Loading...
          </div>
        )}

        <MediaDisplay
          ref={videoRef}
          media={current}
          onLoad={() => setLoaded(true)}
        />
        <NavigationButtons onPrev={goPrev} onNext={goNext} />
      </div>

      {loaded && (
        <div style={{ position: "absolute", bottom: "10px", width: "100%" }}>
          <ProgressBar
            total={data.media.length}
            current={index}
            progress={progress}
          />
        </div>
      )}
    </div>
  );
}
