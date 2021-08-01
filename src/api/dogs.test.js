import MockAPI, { listBreeds, getRandomImages, getImages } from './dogs';

it('obtiene lista de razas', async () => {
  const fakeBreeds = {
    affenpinscher: [],
    african: [],
    airedale: [],
    akita: [],
    appenzeller: [],
    australian: ['shepherd'],
  };

  jest.spyOn(MockAPI, 'get').mockImplementation(() =>
    Promise.resolve({
      data: { message: fakeBreeds, status: 200 },
    }),
  );

  expect((await listBreeds()).length).toBe(7);
});

it('error obtener lista de razas', async () => {
  jest
    .spyOn(MockAPI, 'get')
    .mockImplementation(() => Promise.reject('error red'));

  expect((await listBreeds()).length).toBe(0);
});

it('obtiene imagenes de razas random', async () => {
  const fakeImages = [
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg',
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg',
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
  ];

  jest.spyOn(MockAPI, 'get').mockImplementation(() =>
    Promise.resolve({
      data: { message: fakeImages, status: 200 },
    }),
  );

  expect((await getRandomImages()).length).toBe(fakeImages.length);
});

it('error obtener lista de razas random', async () => {
  jest
    .spyOn(MockAPI, 'get')
    .mockImplementation(() => Promise.reject('error red'));

  expect((await getRandomImages()).length).toBe(0);
});

it('obtiene imagenes de raza', async () => {
  const fakeImages = [
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg',
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg',
    'https://images.dog.ceo/breeds/hound-afghan/n02088094_10263.jpg',
  ];

  jest.spyOn(MockAPI, 'get').mockImplementation(() =>
    Promise.resolve({
      data: { message: fakeImages, status: 200 },
    }),
  );

  expect((await getImages()).length).toBe(fakeImages.length);
});

it('error obtener imagenes de raza', async () => {
  jest
    .spyOn(MockAPI, 'get')
    .mockImplementation(() => Promise.reject('error red'));

  expect((await getImages()).length).toBe(0);
});
