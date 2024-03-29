import React from "react"
import './TicTacToeBoard.scss';
import TicTacToeSquare from "../TicTacToeSquare/TicTacToeSquare"
import { Player } from "../../model/Player";
import { MatrixUtils } from "../../utils/MatrixUtils";
import { SquareModel } from "../../model/SquareModel";
import { ArrayUtils } from "../../utils/ArrayUtils";
import { WinnerModel } from "../../model/WinnerModel";

type BoardState = {
    currentPlayer: Player,
    board: SquareModel[][],
    winner?: WinnerModel,
}

class TicTacToeBoard extends React.Component<any, BoardState> {

    private static readonly BOARD_SIZE = 3

    constructor(props: any) {
        super(props)
        this.state = TicTacToeBoard.createIntialState()
    }

    renderSquare(x: number, y: number) {
        return <TicTacToeSquare model={ this.state.board[y][x] } onSquareClicked={ () => this.onSquareClicked(x, y) } />;
    }

    private onSquareClicked(x: number, y: number): void {
        if (this.state.winner !== undefined || this.state.board[y][x] !== undefined) { 
            return
        }
        
        const updatedBoard: SquareModel[][] = ArrayUtils.deepCloneArray(this.state.board)
        updatedBoard[y][x] = { player: this.state.currentPlayer }
        // Set next player
        this.setState({
            currentPlayer: this.flipPlayer(this.state.currentPlayer),
            board: updatedBoard,
            winner: TicTacToeBoard.getWinningPlayer(updatedBoard)
        })
    }

    private flipPlayer(player: Player): Player {
        return player === Player.O ? Player.X : Player.O
    }

    private startNewGame() {
        this.setState(TicTacToeBoard.createIntialState())
    }

    private static getWinningPlayer(matrix: SquareModel[][]): WinnerModel | undefined {
        // Look for horizontal lines
        for (let y = 0; y < matrix.length; y++) {
            const row = matrix[y]
            if (this.allCheckedFromSamePlayer(row)) {
                // Mark all squares in the row as winning
                for (let x = 0; x < row.length; x++) {
                    matrix[y][x].winningSquare = true
                }
                return {
                    player: row[0].player!,
                }
            }
        }

        // Look for vertical lines
        // Get the the column for each row index
        for (let x = 0; x < matrix[0].length; x++) {
            const column = MatrixUtils.columnToArray(matrix, x)
            if (this.allCheckedFromSamePlayer(column)) {
                // Mark all squares in the column as winning
                for (let y = 0; y < column.length; y++) {
                    matrix[y][x].winningSquare = true
                }
                return {
                    player: column[0].player!,
                }
            }
        }

        // Look for diagonals
        if (this.allCheckedFromSamePlayer(MatrixUtils.getDiagonal(matrix))) {
            // Mark all squares in the diagonal as winning
            for (let i = 0; i < matrix.length; i++) {
                matrix[i][i].winningSquare = true
            }
            return {
                player: matrix[0][0].player!,
            }
        }
        if (this.allCheckedFromSamePlayer(MatrixUtils.getDiagonal(matrix, true))) {
            // Mark all squares in the diagonal as winning
            for (let i = 0; i < matrix.length; i++) {
                matrix[i][matrix.length - 1 - i].winningSquare = true
            }
            return {
                player: matrix[0][matrix[0].length - 1].player!,
            }
        }

        // Check if it's a tie
        if (TicTacToeBoard.checkTie(matrix)) {
            return {}
        }

        return undefined
    }

    private static allCheckedFromSamePlayer(array: SquareModel[]): boolean {
        return ArrayUtils.allItemsSame(array, (a, b) => a?.player === b?.player)
    }

    /**
     * Check if the game is a tie for a given board
     * 
     * @param matrix the board to check
     * @returns whether the game is a tie
     */
    private static checkTie(matrix: SquareModel[][]): boolean {
        for (let row of matrix) {
            for (let item of row) {
                if (item?.player === undefined) {
                    return false
                }
            }
        }

        return true
    }

    private static createIntialState(): BoardState {
        return {
            currentPlayer: Player.X,
            board: TicTacToeBoard.createMatrix(TicTacToeBoard.BOARD_SIZE, TicTacToeBoard.BOARD_SIZE),
            winner: undefined,
        }
    }

    static createMatrix<T>(columns: number, rows: number): T[][] {
        const matrix = Array<T[]>(columns)
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = Array<T>(rows)
        }
        return matrix
    }
    
    render() {
        return (
        <div className="TicTacToeBoard">
            { this.state.winner ?
                this.state.winner.player === undefined ?
                    <div className="tie">It's a tie</div>
                :
                    <div className="winner">{ this.state.winner.player } won this match</div> 
            :
                <div className="status">Next player: { this.state.currentPlayer }</div>
            }
            <div className="row">
            {this.renderSquare(0, 0)}
            {this.renderSquare(1, 0)}
            {this.renderSquare(2, 0)}
            </div>
            <div className="row">
            {this.renderSquare(0, 1)}
            {this.renderSquare(1, 1)}
            {this.renderSquare(2, 1)}
            </div>
            <div className="row">
            {this.renderSquare(0, 2)}
            {this.renderSquare(1, 2)}
            {this.renderSquare(2, 2)}
            </div>
            { this.state.winner && <button onClick={ () => this.startNewGame() }>Play again</button> }
        </div>
        );
    }
}

export default TicTacToeBoard
