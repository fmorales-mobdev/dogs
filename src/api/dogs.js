import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_DOGS_BASE,
});

export default API;

const mapBreed = (breed, parent) => {
  return {
    breed: `${breed}`,
    name: `${parent}${parent ? ' ' : ''}${breed}`,
    label: breed + (parent ? ` (${parent})` : ''),
    parent: `${parent}`,
    path: [parent, breed].filter((value) => !!value).join('/'),
  };
};

const mapBreeds = (breeds) => {
  return Object.keys(breeds).flatMap((breed) => {
    const parent = mapBreed(breed, '');
    const childs = breeds[breed].map((child) => mapBreed(child, breed));
    return [parent].concat(childs);
  });
};

export const listBreeds = async () => {
  try {
    //ojo con los nombres "list" de hecho no es una lista, "response" o "breedListResponse" pudiesen ser nombres más apropiados
    const list = (await API.get('api/breeds/list/all')).data;
    return mapBreeds(list.message);
  } catch (error) {
    console.error(error);
    return [];
  }
};

//Podría tener un mapper tal como lo tiene "listBreeds" y mover la lógica de mapeo que esta en Gallery.js para acá
export const getRandomImages = async (count = 20) => {
  try {
    const list = (await API.get(`api/breeds/image/random/${count}`)).data;
    return list.message;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getImages = async (breed, count = 5) => {
  try {
    const list = (await API.get(`api/breed/${breed}/images/random/${count}`))
      .data;
    return list.message;
  } catch (error) {
    console.error(error);
    return [];
  }
};
