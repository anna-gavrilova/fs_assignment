import { User } from './user';

export interface Game {
    _id?: String,
    name: String,
    developer?: String,
    created_on?: Date,
    players?: User[],
    genre?: String,
    release_date?: Date
}
