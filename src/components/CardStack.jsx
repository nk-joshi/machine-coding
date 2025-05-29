import { useState } from "react";
import MediaCarousel from "./MediaCarousel";

const CardStack = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
    } else {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <div className="card-stack" onWheel={handleScroll}>
      {data.map((card, index) => (
        <div
          key={card.title}
          className={`card ${index === currentIndex ? "visible" : ""}`}
        >
          <MediaCarousel media={card.media} />
        </div>
      ))}
    </div>
  );
};

export default CardStack;
