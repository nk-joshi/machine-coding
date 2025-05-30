import React from "react";

export default function NavigationButtons({ onPrev, onNext }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        display: "flex",
        justifyContent: "space-between",
        width:"100%"
      }}
    >
      <button
        onClick={onPrev}
        style={{
          position: "absolute",
          left: 0,
          transform: "translateY(-50%)",
          background: "#fff",
          borderRadius: "50%",
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
          margin: "0 10px",
        }}
      >
        ⬅️
      </button>
      <button
        onClick={onNext}
        style={{
          position: "absolute",
          right: 0,
          margin: "0 10px",
          transform: "translateY(-50%)",
          background: "#fff",
          borderRadius: "50%",
          padding: "5px 10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ➡️
      </button>
    </div>
  );
}
