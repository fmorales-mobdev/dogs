import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

import { getRandomImages } from '../../api/dogs';
import './Gallery.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '1rem',
  },
  image: {
    padding: '.5rem !important',
  },
  text: {
    color: '#333',
  },
}));

const getBreed = (url) => {
  const path = url.split('/');
  return path[path.length - 2].replace('-', ' ');
};

const mapImage = (url) => {
  return {
    img: url,
    title: getBreed(url),
  };
};

export default function Gallery(props) {
  const [images, setImages] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (!props.filters.length)
      getRandomImages().then((images) => {
        setImages(images);
      });
  }, [props.filters]);

  const mapImageListItem = (item) => {
    return (
      <ImageListItem key={item.img} className={classes.image}>
        <img src={item.img} alt={item.title} />
        <ImageListItemBar title={item.title} />
      </ImageListItem>
    );
  };

  return (
    <div className={classes.root}>
      {!props.images.length && (
        <p className={classes.text}>
          Por mientras te dejo unos perritos aleatorios que seguro te gustarán.
        </p>
      )}
      <ImageList
        rowHeight={180}
        className={classes.imageList}
        cols={isMobile ? 2 : 5}
      >
        {!props.images.length && images.map(mapImage).map(mapImageListItem)}
        {props.images.map(mapImage).map(mapImageListItem)}
      </ImageList>
    </div>
  );
}
