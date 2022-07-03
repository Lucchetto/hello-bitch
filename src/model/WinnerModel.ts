import { Player } from "./Player"

export type WinnerModel = {
    /**
     * Indicates the winner, when it's undefined then it's a tie
     */
    player?: Player,
}
