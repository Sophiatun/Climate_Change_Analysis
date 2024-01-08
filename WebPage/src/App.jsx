import { useState } from "react";
import Home from "./components/Home";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LineChart from "./components/LineChart";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [view, setView] = useState("home");

  function button() {
    return (
      <button className="btn" >Hello</button>
    )
  }

  return (
    <>
      <div className=" w-screen p-0">
        <div className="flex w-full bg-neutral-300 font-bold h-16 p-5 gap-5">
          <button className="text-center" onClick={() => setView("home")}>
            Home
          </button>
          <button className="text-center" onClick={() => setView("linegraphs")}>
            Visualizations
          </button>
        </div>
        <div>{view == "home" && <Home></Home>}</div>
        <div>{view == "linegraphs" && <LineChart></LineChart>}</div>
        {/* {button } */}
      </div>
    </>
  );
}

export default App;
