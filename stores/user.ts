import { atom } from 'jotai';
import { faker } from '@faker-js/faker';

const username = atom<string>(faker.person.firstName());
const userEmail = atom<string>(faker.internet.email());
const isAuthenticated = atom<boolean>(false);

export { username, userEmail, isAuthenticated };
