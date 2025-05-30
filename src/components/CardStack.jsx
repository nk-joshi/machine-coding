import MediaCard from "./MediaCard";

const CardStack = ({ data }) => {
  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        maxWidth: "400px",
      }}
    >
      {data.map((datum) => (
        <div
          key={datum.title}
          style={{
            height: `100%`,
            scrollSnapAlign: "start",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            background: "#fff",
            color: "#fff",
            width: "100%",
          }}
        >
          <MediaCard data={datum} />
        </div>
      ))}
    </div>
  );
};

export default CardStack;
