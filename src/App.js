import React, { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import './App.css';

import { listBreeds, getImages } from './api/dogs';
import Filter from './components/Filter/Filter';
import Gallery from './components/Gallery/Gallery';

//1- Hubiese sido deseable usar la API de Contexto de React para mover la lógica de handleDelete y handleAppend fuera de este componente
//2- No tiene tests
export default function App() {
  const [breeds, setBreeds] = useState([]);
  const [filters, setFilters] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    listBreeds().then((breeds) => {
      setBreeds(breeds);
    });
  }, []);

  const handleDelete = (breed) => {
    //Las estructuras de datos indexadas suelen ser mejores para evitar duplicidad e iteración, en el caso de js podría ser un objeto simple o un Set
    const index = filters.findIndex((b) => b === breed);
    if (index >= 0) {
      const list = filters;
      list.splice(index, 1);
      setFilters(list);
      setImages(
        images.filter((image) => !image.includes(breed.replace(' ', '-'))),
      );
    }
  };

  const handleAppend = (breed) => {
    //Las estructuras de datos indexadas suelen ser mejores para evitar duplicidad e iteración, en el caso de js podría ser un objeto simple o un Set
    const index = filters.findIndex((b) => b === breed.name);
    if (index < 0) {
      const list = [...filters, breed.name];
      setFilters(list);
      getImages(breed.path, isMobile ? 4 : 5).then((newImages) => {
        setImages(newImages.concat(images));
      });
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <a href='./'>
          <img src='./dog-api-logo.svg' className='App-logo' alt='dog' />
          <h1>Dog API</h1>
        </a>
      </header>
      <Filter
        options={breeds}
        breeds={filters}
        handleAppend={handleAppend}
        handleDelete={handleDelete}
      ></Filter>
      <Gallery images={images} filters={filters}></Gallery>
      <div className='App-Footer'>
        <p>
          Este proyecto usa un API pública para obtener las imágenes, la que
          puedes consultar{' '}
          <a href='https://dog.ceo/dog-api/' target='_blank' rel='noreferrer'>
            aquí
          </a>
        </p>
      </div>
    </div>
  );
}
