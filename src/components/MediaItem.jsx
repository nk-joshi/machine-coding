const MediaItem = ({ media }) => {
  if (media.type === "image") {
    return <img src={media.url} alt="Media" />;
  } else if (media.type === "video") {
    return <video src={media.url} controls />;
  } else {
    return <img src="/assets/fallback.jpg" alt="Fallback" />;
  }
};

export default MediaItem;
