import { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist-min";
import * as d3 from "d3";

function LineChart() {
  const [view, setView] = useState("home");
  const [plotData, setPlotData] = useState(null);
  const [selected, setSelected] = useState("global");
  const [dropdown, setDropdown] = useState(false);
  const plotRef = useRef(null);

  const charts = {
    global: {
      name: "Global",
      location: "src/data/Global.csv",
      label: "Average Global Land Temperature (1850-2015)",
      x: "Year",
      y: "LandAverageTemperature",
      xLabel: "Year",
      yLabel: "Temperature (°C)",
      type: "line",
      description: "How have global temperature trends evolved from 1850 to 2015?"
      },

    country_specific_trends: {
      name: "Country-Specific Trends",
      location: "src/data/Cleaned Data/country_specific_trends.csv",
      label: "United States Yearly Average Temperature",
      x: "Year",
      y: "US Yearly Avg Temp",
      xLabel: "Year",
      yLabel: "Yearly Average Temperature (°C)",
      type: "line",
      description: "Are any particular continents experiencing more rapid temperature increases than others? How have temperature trends evolved throughout our date range in South Africa, India, Germany, United States, Brazil, and Australia?",
      graph_png: "public/Temperature Trends in Selected Countries.png"
    },

    hotspots_and_cooling: {
      name: "Hotspots and Cooling",
      location: "src/data/Cleaned Data/hotspots_and_cooling.csv",
      label: "Percent Change in Canada's Yearly Average Temperature",
      x: "Years",
      y: "% Change in Yearly Avg Temp for Canada",
      xLabel: "Year",
      yLabel: "Change in Temperature (%)",
      type: "line",
      description: "Which countries/regions are experiencing the most rapid increase in temperature, and are there any regions experiencing a decrease?",
      graph_png: "public/hotspots_and_cooling.png"
    },

    population_v_temp: {
      name: "Population & Temperature",
      location: "src/data/Merged_Population.csv",
      label: "Correlation between Population and Temperature (1973-2013)",
      x: "Population",
      y: "Yearly Average Temperature",
      size: "Population",
      color: "Country",
      type: "scatter",
      description: "",
    },

    population_airPollution : {
      name: "Population & Air Pollution",
      location: "src/data/Cleaned Data/South_Africa_Air_Pollution.csv",
      label:"Correlation between Population and Air Pollutants (Nitrogen Oxide) in South Africa",
      x: "Year",
      y: "Nitrogen Oxide",
      type: "scatter",
      description: "",
    },

    airPollution : {
      name: "Air Pollution",
      location: "src/data/Clean Data/Cities.csv",
      label: "",
      x: "Year",
      y: "Yearly Average Temperature",
      type: "line",
      description: "",
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
      title: {
        text: charts[selected].label,
      },
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

  const displayImage = (image) => {
    return (
      <div>
        {image && (
          <div>
            <img src={image} alt="Chart" />
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (plotRef.current && plotData) {
      Plotly.newPlot(plotRef.current, plotData);
    }
  }, [plotData]); // Dependency on plotData to re-render plot when data changes

  return (
  <div className="fixed left-0 top-0 h-full w-full p-10 pt-24 overflow-y-auto">
  <button id="dropdownDefaultButton" onClick={() => setDropdown(!dropdown)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select Graph <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
    </svg>
  </button>
  <br></br><br></br>
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
            setSelected("country_specific_trends");
            setDropdown(!dropdown);
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Country-Specific Trends</a>
        </li>
        <li>
          <a href="#" onClick={() => {
            setSelected("hotspots_and_cooling");
            setDropdown(!dropdown);
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Hotspots and Cooling</a>
        </li>
        <li>
          <a href="#" onClick={() => {
            setSelected("population_v_temp");
            setDropdown(!dropdown);
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Population vs Temperature</a>
        </li>
        <li>
        <a href="#" onClick={() => {
            setSelected("population_airPollution");
            setDropdown(!dropdown);
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Population & Air Pollution</a>
        </li>
        <li>
          <a href="#" onClick={() => {
            setSelected("airPollution");
            setDropdown(!dropdown);
            }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Air Pollution</a>
        </li>
      </ul>
  </div>
  }
  <div>{charts[selected].name}</div>
  {displayImage(charts[selected]?.graph_png)}
  <div className="relative w-full h-1/2" ref={plotRef}></div>
  <div>{charts[selected].description}</div>
</div>)
}

export default LineChart;