import { UserGame } from './user-game';

export interface User {
    _id?: String,
    email: String,
    password: String,
    role: Number,
    created_on: Date,
    games?: UserGame[],
    last_login?: Date,
    firstname?: String,
    lastname?: String
}
