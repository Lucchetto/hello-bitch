import React from "react"
import './TicTacToeBoard.scss';
import TicTacToeSquare from "../TicTacToeSquare/TicTacToeSquare"
import { Player } from "../../model/Player";
import { MatrixUtils } from "../../utils/MatrixUtils";

type BoardState = {
    currentPlayer: Player,
    board: Player[][],
    winner?: Player,
}

class TicTacToeBoard extends React.Component<any, BoardState> {

    private static readonly BOARD_SIZE = 3

    constructor(props: any) {
        super(props)
        this.state = {
            currentPlayer: Player.X,
            board: TicTacToeBoard.createMatrix(TicTacToeBoard.BOARD_SIZE, TicTacToeBoard.BOARD_SIZE)
        }
    }

    renderSquare(x: number, y: number) {
        return <TicTacToeSquare x={ x } y={ y } checked={ this.state.board[y][x] } onSquareClicked={ () => this.onSquareClicked(x, y) } />;
    }

    private onSquareClicked(x: number, y: number): void {
        if (this.state.winner !== undefined) { 
            return  
        }
        
        this.state.board[y][x] = this.state.currentPlayer
        // Set next player
        this.setState({
            currentPlayer: this.flipPlayer(this.state.currentPlayer),
            board: this.state.board,
            winner: TicTacToeBoard.getWinningPlayer(this.state.board)
        })
    }

    private flipPlayer(player: Player): Player {
        return player === Player.O ? Player.X : Player.O
    }

    private static getWinningPlayer(matrix: Player[][]): Player | undefined {
        // Look for horizontal lines
        for (const row of matrix) {
            if (this.allItemsSame(row)) {
                return row[0]
            }
        }

        // Look for vertical lines
        // Get the the column for each row index
        for (let x = 0; x < matrix[0].length; x++) {
            const column = Array(matrix.length)
            // Convert the column to an array
            for (let y = 0; y < matrix.length; y++) {
                column[y] = matrix[y][x]
                if (this.allItemsSame(column)) {
                    return column[0]
                }
            }
        }

        // Look for diagonals
        if (this.allItemsSame(MatrixUtils.getDiagonal(matrix))) {
            return matrix[0][0]
        }
        if (this.allItemsSame(MatrixUtils.getDiagonal(matrix, true))) {
            return matrix[0][matrix[0].length - 1]
        }

        return undefined
    }

    private static allItemsSame<T>(array: T[]): boolean {
        for (let i = 1; i < array.length; i++) {
            // Return false if an item non equal to the previous one is found
            if (array[i - 1] !== array[i]) {
                return false
            }
        }
        
        // Return true if this is not an array of undefined items
        return array[0] !== undefined
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
            { this.state.winner ? <div className="winner">{ this.state.winner } won this match</div> : <div className="status">Next player: { this.state.currentPlayer }</div> }
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
        </div>
        );
    }
}

export default TicTacToeBoard
