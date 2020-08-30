import { User } from './types';
import { createStore } from 'effector';
import { getUser, setUser } from './events';

export const $user = createStore<User>({ email: '', role_name: '' });
$user.on(getUser, (state) => state);
$user.on(setUser, (state, userPayload: User) => ({ ...state, ...userPayload }));
