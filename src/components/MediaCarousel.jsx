import { useState, useRef, useEffect } from "react";
import MediaItem from "./MediaItem";
import ProgressBar from "./ProgressBar"

const MediaCarousel = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const durationRef = useRef(5000);
  const progressIntervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!media || media.length === 0) return;

    const currentMedia = media[currentIndex];

    if (currentMedia.type === "image") {
      durationRef.current = 5000; // 5 seconds for images
    } else if (currentMedia.type === "video") {
      durationRef.current = (currentMedia.duration || 5) * 1000;
    } else {
      durationRef.current = 5000;
    }

    setProgress(0);

    const updateProgress = () => {
      setProgress((prev) => {
        const next = prev + 100 / (durationRef.current / 100);
        return next >= 100 ? 100 : next;
      });
    };

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    progressIntervalRef.current = setInterval(updateProgress, 100);

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, durationRef.current);

    // Cleanup
    return () => {
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, media]);

  const handleNext = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setCurrentIndex((prev) => (prev + 1) % media.length);
    setProgress(0);
  };

  const handlePrev = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setProgress(0);
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: 12,
        position: "relative",
        userSelect: "none",
      }}
    >
      <button
        onClick={handlePrev}
        style={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.3)",
          border: "none",
          color: "#fff",
          borderRadius: "50%",
          width: 32,
          height: 32,
          cursor: "pointer",
          zIndex: 10,
        }}
        aria-label="Previous"
      >
        &#8249;
      </button>

      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.3)",
          border: "none",
          color: "#fff",
          borderRadius: "50%",
          width: 32,
          height: 32,
          cursor: "pointer",
          zIndex: 10,
        }}
        aria-label="Next"
      >
        &#8250;
      </button>

      <MediaItem media={media[currentIndex]} />

      <ProgressBar progress={progress} />
    </div>
  );
};

export default MediaCarousel;