import { UserGame } from './user-game';

export interface User {
    email: String,
    password: String,
    role: Number,
    created_on: Date,
    games: UserGame[],
    last_login: Date
}
