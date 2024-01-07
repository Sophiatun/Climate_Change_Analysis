import { useState } from "react";

function Home() {
  const [count, setCount] = useState(0);
  const [view, setView] = useState("home");

  return (
    <>
      <div className="flex gap-5 p-10">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold w-1/2">Overview</h2>
          <p>
            Climate change is a critical global challenge for ecosystems, human societies, and overall health of our planet. 
            Among the key indicators of climate change, shifts in temperature patterns have drawn significant attention due to 
            their potential impact on  weather extremes and the overall stability of ecosystems.
            <br></br>
            As weather analysts it’s our job to analyze rising global temperatures and assess the risk this might bring to citizens 
            across the world. We’re gathering data from countries across the globe to determine which countries are most at risk. 
            <br></br>
            With this project we’re hoping to shed light on the impact climate change has on our planet and highlight the areas that 
            are most at risk.
          </p>
          <h2 className="font-bold w-1/2">Discussion</h2>
          <p>
            <li>How have global temperature trends evolved throughout our date range?</li>
            <li>How have temperature trends evolved throughout our date range in South Africa, India, Germany, United States, Brazil, Australia, and Antarctica?</li>
            <li>Which states in South Africa, India, Germany, United States, Brazil, Australia, and Antarctica are experiencing the most rapid increase in temperature, and are there any regions experiencing a decrease?</li>
            <li>Does a higher population result in higher temperatures? Does higher population result in more air pollution?</li>
            <li>Do areas with more air pollution have higher temperatures?</li>
          </p>
        </div>
        <img src="/weather_home.jpeg" className="w-3/5"></img>
      </div>
      <div className="flex gap-5 p-10">
        <div className="flex flex-col gap-5">
          <h2 className="font-bold w-1/2">How to interact with the project:</h2>
            <p>
              Our webpage can be found at: [TBD]<br></br>
              There are two components: Overview and Visualizations<br></br>
              <li>In Overview you can find some background info and the purpose of our project.</li>
              <li>In Visualizations you will see a dropdown that leads to our data visualizations that answer the questions outlined in our Overview. Click on one to be taken to the charts that address that specific topic. Under each chart we have added text with takeaways based on the analysis.</li>
            </p>
            <h2 className="font-bold w-1/2">Ethical Considerations</h2>
            <p>
              To ensure we avoided any issues with our data we made sure not to collect or work with any data that would invade privacy. We only shared proper info and data from reliable sources and ensured we were not working with any kind of leaked data. We made sure we included uncertainty - ethical consideration (allows the audience to understand the reliability of the information they’re getting) - but we took out the uncertainty cols. We also included one country from every continent (except Alaska) to ensure we were looking at the project from a global perspective.
            </p>
            <h2 className="font-bold w-1/2">Data References</h2>
            <p>
              <li>Temperature Dataset: Climate Change: Earth Surface Temperature Data</li>
              <li>Air Pollution Dataset: Emmision of Air Pollutants</li>
              <li>Global Population Dataset: World Population by Countries Dataset (1960-2021)</li>
            </p>
            <h2 className="font-bold w-1/2">Code References</h2>
            <p>
              <li></li>
            </p>
          </div>
      </div>
    </>
  );
}

export default Home;
