import { Game } from './game';

export interface UserGame {
    game_id: Game,
    score: Number,
    time_played?: Number,
    last_played?: Date,
    gamertag: String
}
