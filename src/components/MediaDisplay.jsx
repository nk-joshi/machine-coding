import React, { useEffect, useState, forwardRef } from "react";

const MediaDisplay = forwardRef(({ media, onLoad }, videoRef) => {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (media.type === "video" && videoRef?.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [media, videoRef]);

  const handleImageLoad = () => {
    requestAnimationFrame(onLoad);
  };

  if (media.type === "image") {
    return (
      <img
        key={media.url}
        src={media.url}
        alt=""
        onLoad={handleImageLoad}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          opacity: 1,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative", // establish context for the mute button
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        ref={videoRef}
        key={media.url}
        src={media.url}
        muted={muted}
        autoPlay
        playsInline
        onLoadedData={() => requestAnimationFrame(onLoad)}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          display: "block",
        }}
        controls={false}
      />
      <button
        onClick={() => setMuted((prev) => !prev)}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          padding: "5px 10px",
          background: "rgba(0, 0, 0, 0.6)",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
});

export default MediaDisplay;
