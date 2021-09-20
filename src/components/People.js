import React from 'react';

import SpeciesBlock from './SpeciesBlock';

const People = (props) => {

  console.log("props.people: ", props.people);

  return (
    <React.Fragment>
      <p>People Page:</p>
      <ul>
        {props.people.map((species) => (
          <SpeciesBlock
            key={species.speciesName}
            species={species.speciesName}
            people={species.peopleData}
          />
        ))}
      </ul>
    </React.Fragment>
  )
}

export default People;
