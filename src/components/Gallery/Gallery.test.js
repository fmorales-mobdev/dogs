import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Gallery from './Gallery';

import MockAPI from '../../api/dogs';

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

//Falta validar casos, vacío y más de 1 elemento
it('renderiza imagenes según filtro', async () => {
  const fakeFilters = ['bulldog boston'];
  const fakeImages = ['url/bulldog-boston/image.jpg'];

  // Usa la versión asíncrona de act para aplicar promesas resueltas
  await act(async () => {
    render(<Gallery filters={fakeFilters} images={fakeImages} />, container);
  });

  expect(
    container.querySelector('.MuiImageListItemBar-title').textContent,
  ).toBe(fakeFilters[0]);
  //Falta validar que el src de la imagen esté bien definido
});

it('renderiza imagenes aleatorias', async () => {
  const fakeFilters = [];
  const fakeImages = [];
  const fakeBreed = 'husky';
  const fakeRandomImages = [`url/${fakeBreed}/image.jpg`];

  jest.spyOn(MockAPI, 'get').mockImplementation(() =>
    Promise.resolve({
      data: { message: fakeRandomImages, status: 200 },
    }),
  );

  // Usa la versión asíncrona de act para aplicar promesas resueltas
  await act(async () => {
    render(<Gallery filters={fakeFilters} images={fakeImages} />, container);
  });

  expect(
    container.querySelector('.MuiImageListItemBar-title').textContent,
  ).toBe(fakeBreed);
});
