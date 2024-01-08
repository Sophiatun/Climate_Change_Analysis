import { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import * as d3 from "d3";

function LineChart() {
  const [view, setView] = useState("linegraphs");
  const [plotData, setPlotData] = useState(null);
  const [selected, setSelected] = useState("global");
  const [dropdown, setDropdown] = useState(false);
  const plotRef = useRef(null);

  const charts = {
    
    airPollution : {
      location: "src/data/Cleaned Data/South_Africa_Air_Pollution.csv",
      label:"South Africa Air Pollutants (Nitrogen Oxide)",
      x: "Year",
      y: "Nitrogen Oxide",
      type: "line",
      description: "Test one",
    },

    cities : {
      location: "src/data/Cities.csv",
      label: "",
      x: "Year",
      y: ['Yearly Average Temperature'],
      type: "line",
      description: "test two",
    },

    countries: {
      location: "src/data/Countries.csv",
      label: "",
      x: "Year",
      y: [],
      type: "",
      description: "test three",
      graph_png: "public/temp_trends_by_country.png"
    },

    global: {
      location: "src/data/Global.csv",
      label: "Average Global Land Temperature (1850-2015)",
      x: "Year",
      y: "LandAverageTemperature",
      xLabel: "Year",
      yLabel: "Temperature (°C)",
      type: "line",
      description: "How have global temperature trends evolved from 1850 to 2015?"
      },

    population_v_temp: {
      location: "src/data/Merged_Population.csv",
      label: "Correlation between Population and Temperature (1973-2013)",
      x: "Population",
      y: "Yearly Average Temperature",
      size: "Population",
      color: "Country",
      type: "scatter",
      description: "Bubble chart description",
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
  
    var layout = {
      xaxis: {
        title: {
          text: charts[selected].xLabel || charts[selected].x,
        },
      },
      yaxis: {
        title: {
          text: charts[selected].yLabel || charts[selected].y,
        },
      },
    };
  
    setPlotData({ data: traces, layout });
  }

  const printImage = () => {
    const imageUrl = charts[selected].graph_png;
    return (
      <div>
        <img src={imageUrl} alt="" />
      </div>
    );
  };

  useEffect(() => {
    if (plotRef.current && plotData) {
      Plotly.newPlot(plotRef.current, plotData);
    }
  }, [plotData]); // Dependency on plotData to re-render plot when data changes

  return (
  <div className="fixed left-0 top-0 h-full w-full p-10 pt-24">
  <button id="dropdownDefaultButton" onClick={() => setDropdown(!dropdown)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select Graph <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg>
  </button>
  <br></br><br></br>
  <div>{charts[selected].label}</div>
  {dropdown && 
  <div id="dropdown" className="z-10 fixed top-30 left-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
        <li>
          <a href="#" onClick={() => {
            setSelected("global");
            setDropdown(!dropdown);
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Global</a>
        </li>
        <li>
        <a href="#" onClick={() => {
            setSelected("airPollution");
            setDropdown(!dropdown);
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Air Pollution</a>
        </li>
        <li>
          <a href="#" onClick={() => {
            setSelected("cities");
            setDropdown(!dropdown);
            }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cities</a>
        </li>
        <li>
          <a href="#" onClick={() => {
            setSelected("countries");
            setDropdown(!dropdown);
            printImage();
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Countries</a>
        </li>
        <li>
          <a href="#" onClick={() => {
            setSelected("population_v_temp");
            setDropdown(!dropdown);
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Population vs Temperature</a>
        </li>
      </ul>
  </div>}
<div className="relative w-full h-1/2" ref={plotRef}></div>
<div>{charts[selected].description}</div>
</div>)
}

export default LineChart;