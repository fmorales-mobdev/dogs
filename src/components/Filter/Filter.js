import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PetsIcon from '@material-ui/icons/Pets';
import Chip from '@material-ui/core/Chip';
import { Hint } from 'react-autocomplete-hint';

import './Filter.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Filter(props) {
  const [text, setText] = useState('');
  const classes = useStyles();

  const handleDelete = (breed) => {
    props.handleDelete(breed);
  };

  const onFill = (breed) => {
    props.handleAppend(breed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      const breed = props.options.find(
        (breed) => breed.label === e.target.value,
      );
      if (breed) onFill(breed);
    }
  };

  const listFilters = props.breeds.map((breed) => (
    <Chip
      key={breed.toString()}
      label={breed}
      icon={<PetsIcon />}
      color='primary'
      onDelete={() => handleDelete(breed)}
    />
  ));

  return (
    <div className='Filter'>
      <div className='input-wrapper'>
        <Hint options={props.options} allowTabFill={true} onFill={onFill}>
          <input
            placeholder='Busca tu raza favorita. Ej: Husky, Bulldog, Beagle, ...'
            className='input-with-hint'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Hint>
      </div>
      <div className={classes.root}>{listFilters}</div>
    </div>
  );
}
