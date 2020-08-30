import { createEvent } from 'effector';

import { User } from './types';

export const getUser = createEvent();
export const setUser = createEvent<User>();
