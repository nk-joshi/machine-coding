import React from "react";

export default function ProgressBar({ total, current, progress }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        marginTop: 10,
      }}
    >
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 4,
            background:
              i < current
                ? "#4caf50"
                : i === current
                ? `linear-gradient(to right, #4caf50 ${progress * 100}%, #ccc ${
                    progress * 100
                  }%)`
                : "#ccc",
            transition: i === current ? "none" : "background 0.3s",
            borderRadius: 2,
            overflow: "hidden",
          }}
        />
      ))}
    </div>
  );
}
