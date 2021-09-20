import React, { useState, useEffect } from 'react';
import './App.css';

import People from './components/People';

function App() {
  const [speciesAndPeople, setSpeciesAndPeople ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let getSpeciesUrl = 'https://swapi.dev/api/species/';
  const loadedSpecies = [];
  let speciesData = {};

  const fetchSpeciesHandler = () => {
    setIsLoading(true);
    setError(null);
      fetch(getSpeciesUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrongo!");
          }
          return response.json();
        })
        .then((data) => {
          speciesData = data;
          console.log('%c GET data: ', 'color: green;', data)
          console.log('%c GET data.next: ', 'color: blue;', data.next);
          console.log('%c GET data.results: ', 'color: red;', data.results);
          for (const singleSpecies in data.results) {
            // console.log("data.results[singleSpecies]: ", data.results[singleSpecies]);
            loadedSpecies.push({
              speciesName: data.results[singleSpecies].name,
              people: data.results[singleSpecies].people,
              peopleData: []
            });
            console.log('%c people: ', 'color: green;', data.results[singleSpecies].people);
              for (const person in data.results[singleSpecies].people) {
                console.log('%c person: ', 'color: red;', data.results[singleSpecies].people[person]);
                fetch(data.results[singleSpecies].people[person])
                  .then((response) => {
                    // console.log("%c person response: ", "color: purple;", response);
                    return response.json();
                  })
                  .then((personData) => {
                    // console.log('%c personData: ', 'color: purple;', personData);
                    loadedSpecies[singleSpecies].peopleData.push(personData);
                    console.log('%c loadedSpecies[singleSpecies]: ', 'color: green;', loadedSpecies[singleSpecies]);
                    // console.log('%c speciesData: ', 'color: purple;', speciesData);
                    // if (speciesData.next) {
                    //   getSpeciesUrl = speciesData.next;
                    //   fetchSpeciesHandler();
                    // } else {
                    //   console.log('%c FINAL loadedSpecies: ', 'color: purple;', loadedSpecies);
                    //   return;
                    // }
                  });
              }
          console.log("%c loadedSpecies AFTER for in: ", 'color: brown;', loadedSpecies);
          setSpeciesAndPeople(loadedSpecies);
          }
        });

      
      

      // console.log('%c PRE-RECURSION loadedSpecies: ', 'color: green;', loadedSpecies);


      // if (data.next) {
      //   getSpeciesUrl = data.next;
      //   fetchSpeciesHandler();
      // } else {
      //   console.log('%c FINAL loadedSpecies: ', 'color: purple;', loadedSpecies);
      //   return;
      // }

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
  };

  useEffect(() => {
    fetchSpeciesHandler();
  }, []);


  return (
    <div className="App">
      <People people={speciesAndPeople} />
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
