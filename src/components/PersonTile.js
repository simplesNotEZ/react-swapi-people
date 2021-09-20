import React from 'react';

import classes from './PersonTile.module.css';

const PersonTile = (props) => {
  return (
    <li className={classes['person-tile']}>
      <p>Name: {props.personData.name}</p>
      <p>Weight: {props.personData.mass}</p>
      <p>Skin Color: {props.personData.skin_color}</p>
    </li>
  )
}

export default PersonTile;

