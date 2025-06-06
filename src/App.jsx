import CardStack from "./components/CardStack";
import data from "./data.json";
import "./app.css";

const App = () => {
  return (
    <div className="app">
      <CardStack data={data} />
    </div>
  );
};

export default App;
