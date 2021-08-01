import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Filter from './Filter';

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

it('renderiza chips según filtro', async () => {
  const fakeOptions = [{ label: 'husky' }];
  const fakeBreeds = ['husky'];
  const fakeHandleDelete = (breed) => {};
  const fakeHandleAppend = (breed) => {};

  // Usa la versión asíncrona de act para aplicar promesas resueltas
  await act(async () => {
    render(
      <Filter
        options={fakeOptions}
        breeds={fakeBreeds}
        handleAppend={fakeHandleAppend}
        handleDelete={fakeHandleDelete}
      />,
      container,
    );
  });

  expect(container.querySelector('.MuiChip-label').textContent).toBe(
    fakeBreeds[0],
  );
});
