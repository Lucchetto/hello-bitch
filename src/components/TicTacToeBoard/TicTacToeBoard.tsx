import React from "react"
import './TicTacToeBoard.scss';
import TicTacToeSquare from "../TicTacToeSquare/TicTacToeSquare"
import { Player } from "../../model/Player";
import { MatrixUtils } from "../../utils/MatrixUtils";
import { SquareModel } from "../../model/SquareModel";
import { ArrayUtils } from "../../utils/ArrayUtils";

type BoardState = {
    currentPlayer: Player,
    board: SquareModel[][],
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
        return <TicTacToeSquare x={ x } y={ y } checked={ this.state.board[y][x]?.player } onSquareClicked={ () => this.onSquareClicked(x, y) } />;
    }

    private onSquareClicked(x: number, y: number): void {
        if (this.state.winner !== undefined) { 
            return  
        }
        
        this.state.board[y][x] = { player: this.state.currentPlayer }
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

    private static getWinningPlayer(matrix: SquareModel[][]): Player | undefined {
        // Look for horizontal lines
        for (const row of matrix) {
            if (this.allCheckedFromSamePlayer(row)) {
                return row[0].player
            }
        }

        // Look for vertical lines
        // Get the the column for each row index
        for (let x = 0; x < matrix[0].length; x++) {
            const column = Array<SquareModel>(matrix.length)
            // Convert the column to an array
            for (let y = 0; y < matrix.length; y++) {
                column[y] = matrix[y][x]
                if (this.allCheckedFromSamePlayer(column)) {
                    return column[0].player
                }
            }
        }

        // Look for diagonals
        if (this.allCheckedFromSamePlayer(MatrixUtils.getDiagonal(matrix))) {
            return matrix[0][0].player
        }
        if (this.allCheckedFromSamePlayer(MatrixUtils.getDiagonal(matrix, true))) {
            return matrix[0][matrix[0].length - 1].player
        }

        return undefined
    }

    private static allCheckedFromSamePlayer(array: SquareModel[]): boolean {
        return ArrayUtils.allItemsSame(array, (a, b) => a?.player === b?.player)
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
