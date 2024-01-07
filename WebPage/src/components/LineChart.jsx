import { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import * as d3 from "d3";

function LineChart() {
  const [plotData, setPlotData] = useState(null);
  const [selected, setSelected] = useState("airPollution");
  const [dropdown, setDropdown] = useState(false);
  const plotRef = useRef(null);

  const charts = {
    
    airPollution : {
    location: "src/data/Global.csv",
    title:"Average Land Temperature",
    x: "Year",
    y: ["LandAverageTemperature"],
    type: "line",
    description: "Test one",
    },

   cities : {
    location: "src/data/AirPollution.csv",
    title: "",
    x: "Country",
    y: ['South Africa'],
    type: "line",
    description: "test two",
   },

   countries: {
    location: "src/data/Countries.csv",
    title: "",
    x: "Year",
    y: [],
    type: "",
    description: "test two",
   }



  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await d3.csv(charts[selected].location);
        return processData(data);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        return null;
      }
    }

    function processData(allRows) {
      var x = [], y = [];

      allRows.forEach(row => {
        x.push(row[charts[selected].x]);
        y.push(row[charts[selected].y]);
      });

      return { x, y };
    }

    fetchData().then(processedData => {
      if (processedData) {
        makePlotly(processedData);
      }
    });
  }, [selected]);

  function makePlotly({ x, y }) {
    var traces = [{ x, y }];
    setPlotData(traces);
  }

  useEffect(() => {
    if (plotRef.current && plotData) {
      Plotly.newPlot(plotRef.current, plotData);
    }
  }, [plotData]); // Dependency on plotData to re-render plot when data changes

  return (
<div className="fixed left-0 top-0 h-full w-full p-10 pt-24">
  <button id="dropdownDefaultButton" onClick={() => setDropdown(!dropdown)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select graph <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg>
  </button>

  {dropdown && 
  <div id="dropdown" className="z-10 fixed top-30 left-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>
          <a href="#" onClick={() => setSelected("airPollution")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Air Polution</a>
        </li>
        <li>
          <a href="#" onClick={() => setSelected("cities")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cities</a>
        </li>
        <li>
          <a href="#" onClick={() => setSelected("countries")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Countries</a>
        </li>
        <li>
          <a href="#" onClick={() => setSelected("global")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Global</a>
        </li>
      </ul>
  </div>}
<div className="relative w-full h-1/2" ref={plotRef}></div>
<div>{charts[selected].description}</div>
</div>)
}

export default LineChart;