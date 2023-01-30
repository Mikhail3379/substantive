// This code is a React component that displays a pie chart of interaction data
// by sector. The data is fetched from an API endpoint
// (http://substantiveresearch.pythonanywhere.com/) using the Axios library, and
// stored in the component's state using the useState hook.

// The useEffect hook is used to call the fetchData function only once when the
// component is first mounted, as specified by the empty array as the second
// argument. The data fetched from the API is an array of interaction data
// objects, each with a date, name, and sector_id field.

// The sectorCount object is then created, which keeps track of the number of
// interactions per sector by counting the occurrences of each sector name in
// the interaction data.

// The pie chart is created using the Pie component from react-chartjs-2, with
// options to position the legend at the bottom. The calculatePercentage
// function calculates the percentage of interactions for each sector based on
// the number of interactions stored in sectorCount, and the resulting data is
// passed as the data prop to the Pie component.

// Finally, the component returns the pie chart wrapped in a div with the class
// "pie". When you hover over a sector in the pie chart, the percentage and the
// name of interactions for that sector is displayed in the legend.

import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import './App.css';


import { Chart, ArcElement } from 'chart.js/auto'
Chart.register(ArcElement);

const App = () => {
  const [interactionData, setInteractionData] = useState([]);

  // Use the useEffect hook to call the fetchData function only once when the
  // component is first mounted, as specified by the empty array as the second
  // argument.ß
  useEffect(() => {
    // Fetch data from API endpoint
    const fetchData = async () => {
      let result = await axios("http://substantiveresearch.pythonanywhere.com")
      // TODO: Add error handling
      // .then (function (result) {
      //   setInteractionData(result.data);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // })
      setInteractionData(result.data);
    };
    fetchData();
  }, []);

  const sectorCount = {};

  // Loop through interaction data and count the number of interactions per
  // sector
  interactionData.forEach((interaction) => {
    // @ts-ignore
    if (sectorCount[interaction.name]) {
      // @ts-ignore
      sectorCount[interaction.name]++;
    }
    else {
      // @ts-ignore
      sectorCount[interaction.name] = 1;
    }
  });

  // Options for the pie chart
  const options = {
    legend: {
      position: "bottom",
    },
  };

  // This function calculates the percentage of interactions for each sector
  // based on the number of interactions stored in sectorCount and returns an
  // array of percentages
  const calculatePercentage = (data: any[]) => {
    return data.map((value: number) => value / interactionData.length * 100)
  }

  const percentData = calculatePercentage(Object.values(sectorCount))

  // This object contains the data to be displayed in the pie chart. The labels
  // are the sector names, and the data is the percentage of interactions for
  // each sector
  const dataWithPercent = {  
    labels: Object.keys(sectorCount).map(label =>       
      `${label} - ${percentData[Object.keys(sectorCount).indexOf(label)].toFixed(2)}%
      `),    
    datasets: [
      {
        data: percentData,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
          "#c9cbcf",
          "#f49ac2",
          "#77dd77",
          "#ff6961",
          "#aec6cf",
        ],      
      },
    ],
  };

  // Return the HTML for the pie chart wrapped in a div with the class "pie"
  return (
    <div className="pie">
    <h2>Interaction Data by Sector</h2>
    <Pie 
    data={dataWithPercent}
    // @ts-ignore
    options={options} />
    </div>
  );
};

export default App;

