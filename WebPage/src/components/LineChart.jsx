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
      description: "On average, global temperatures have shown a great increase over time, as displayed in the graph below (ranging from 1850 to 1950)? Water has a higher specific heat capacity than land (ie. requires more energy for its temperature to change). Oceans contribute to higher humidity levels in the atmosphere. Humidity traps heat, which them contributed to higher overall temperature of the Earth's atmosphere. Land has lower thermal intertia, meaning it warm up quickly and cools down quickly.Ocean has higher thermal inertia, meaning it takes time to warm up and cool down. Even though the sun is not out, it will still release stored heat, which then helps moderate temperature changes in the atmosphere.",
      graph_png: ["public/Global Land & Ocean Avg Temp.png","public/Global Land Temperature.png"],
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
      graph_png: ["public/Temperature Trends in Selected Countries.png"]
    },

    States_Analysis: {
      name: "States Analysis",
      location: "src/data/Cleaned Data/hotspots_and_cooling.csv",
      label: "Percent Change in Canada's Yearly Average Temperature",
      x: "Years",
      y: "% Change in Yearly Avg Temp for Canada",
      xLabel: "Year",
      yLabel: "Change in Temperature (%)",
      type: "line",
      description: "Which countries/regions are experiencing the most rapid increase in temperature, and are there any regions experiencing a decrease?",
      graph_png: ["Percent Change in Yearly Avg Temp.png"],
      hide:true,
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
      graph_png: ["public/Population vs Temperature Correlation.png"],
      hide:true,
    },

    population_airPollution : {
      name: "Population & Air Pollution",
      location: "src/data/Cleaned Data/South_Africa_Air_Pollution.csv",
      label:"Correlation between Population and Air Pollutants (Nitrogen Oxide) in South Africa",
      x: "Year",
      y: "Nitrogen Oxide",
      type: "scatter",
      description: "South Africa, Brazil, and India all have a positive correlation between rising population and the amount of pollutants in the air. Both Germany and Australia don’t appear to have as strong of a correlation between population and pollutants as the other countries as you can see here with Australia’s chart, although they did have a sharp decrease in all three pollutants in their environment when their population rose over 17 million.",
      graph_png: ["USA Population vs Pollutant.png", "India Population vs Pollutant.png", "Austrlia Population vs Pollutants.png"],
      hide:true,
    },

    airPollution : {
      name: "Air Pollution",
      location: "src/data/Clean Data/Cities.csv",
      label: "",
      x: "Year",
      y: "Yearly Average Temperature",
      type: "line",
      description: "",
      graph_png: ["public/Australia Air Pollutants.png", "public/Brazil Air Pollutants", "public/India Air Pollutants", "public/South America Air Pollutantspng.png","United States Air Pollutants.png"],
      hide:true,
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
    return image.map((image, index) => {
      return (
        <div key={index}>
          {image && (
            <div>
              <img src={image} alt="Chart" />
            </div>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    if (plotRef.current && plotData) {
      Plotly.newPlot(plotRef.current, plotData);
    }
  }, [plotData]); // Dependency on plotData to re-render plot when data changes

  return (
    <div className="p-10 overflow-y-auto">
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
            setSelected("States_Analysis");
            setDropdown(!dropdown);
          }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">States Analysis</a>
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
  {!charts[selected]?.hide&&<div className="relative w-full h-1/2" ref={plotRef}></div>}
  {charts[selected]?.graph_png&&displayImage(charts[selected].graph_png)}
  <div>{charts[selected].description}</div>
</div>)
}

export default LineChart;