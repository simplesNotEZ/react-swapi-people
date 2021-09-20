import React from 'react';

import PersonTile from './PersonTile';

const SpeciesBlock = (props) => {

  console.log("%c props.people: ", "color: purple;", props.people);
  return (
    <React.Fragment>
      <li>
        <h1>{props.species}</h1>
        <ul> 
          {props.people.map((person) => (
            <PersonTile key={person.name} personData={person} />
          ))}
        </ul>
      </li>
    </React.Fragment>
  )
}

export default SpeciesBlock;