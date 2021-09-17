import React, { useState, useEffect } from 'react';
import './App.css';

import People from './components/People';

function App() {
  const [species, setSpecies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSpeciesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/species/');
      // console.log('%c GET response: ', 'color: green;', response);
      if (!response.ok) {
        throw new Error("Something went wrongo!");
      }
      const data = await response.json();
      // console.log('%c GET data: ', 'color: blue;', data);
      // console.log('%c GET data.results: ', 'color: red;', data.results);


      const loadedSpecies = [];

      for (const singleSpecies in data.results) {
        // console.log("data.results[singleSpecies]: ", data.results[singleSpecies]);
        loadedSpecies.push({
          speciesName: data.results[singleSpecies].name,
          people: data.results[singleSpecies].people,
          peopleData: []
        });
        // console.log("%c loadedSpecies: ", 'color: fuchsia;', loadedSpecies);
        // console.log("%c loadedSpecies AFTER for in: ", 'color: brown;', loadedSpecies);
        
      };

      // console.log('%c loadedSpecies: ', 'color: green;', loadedSpecies);
      
      for (const peoplesObj in loadedSpecies) {
        // console.log('%c people array: ', 'color: green;', data.results[singleSpecies].people);
        // console.log('%c loadedSpecies: ', 'color: green;', loadedSpecies[peoplesObj].people);
        for (const person in loadedSpecies[peoplesObj].people) {
          // console.log('%c person: ', 'color: green;', loadedSpecies[peoplesObj].people[person]);
          const personResponse = await fetch (data.results[peoplesObj].people[person]);
          const personData = await personResponse.json();
          // console.log('%c personData: ', 'color: purple;', personData);
          loadedSpecies[peoplesObj].peopleData.push(personData);
          // console.log('%c loadedSpecies[peoplesObj].peopleData: ', 'color: green;', loadedSpecies[peoplesObj].peopleData);
        }
      }

      console.log('%c FINAL loadedSpecies: ', 'color: green;', loadedSpecies);


      // for (const person in loadedSpecies) {
        // console.log('%c people array: ', 'color: green;', loadedSpecies[person].people);
      //   const response = await fetch('loadedSpecies.people' + person);
      //   console.log('%c Person GET response: ', 'color: green;', response);
      //   const data = await response.json();
      //   console.log('%c  person-data GET data: ', 'color: blue;', data);
      // //   loadedSpecies.push({
      // //     species: oneSpecies.name,
      // //     title: oneSpecies.people,
      // //     releaseDate: data[key].releaseDate,
      // //     openingText: data[key].openingText
      // //   });
      // };

      
    } finally {
      return;
    }
  };

  useEffect(() => {
    fetchSpeciesHandler();
  }, []);


  return (
    <div className="App">
      <People />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
