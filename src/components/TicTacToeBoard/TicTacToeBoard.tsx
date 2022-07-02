import React from "react"
import './TicTacToeBoard.scss';
import TicTacToeSquare from "../TicTacToeSquare/TicTacToeSquare"
import { Player } from "../../model/Player";

type BoardState = {
    currentPlayer: Player,
    board: Player[][]
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
        this.state.board[y][x] = this.state.currentPlayer
        // Set next player
        this.setState({
            currentPlayer: this.flipPlayer(this.state.currentPlayer),
            board: this.state.board
        })
    }

    private flipPlayer(player: Player): Player {
        return player === Player.O ? Player.X : Player.O
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
            <div className="status">Next player: { this.state.currentPlayer }</div>
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
