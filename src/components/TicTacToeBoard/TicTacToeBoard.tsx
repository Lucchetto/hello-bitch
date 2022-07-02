import React from "react"
import './TicTacToeBoard.scss';
import TicTacToeSquare from "../TicTacToeSquare/TicTacToeSquare"

type BoardState = {
    player: Player
}

enum Player {
    X = "X",
    O = "O",
}

class TicTacToeBoard extends React.Component<any, BoardState> {

    constructor(props: any) {
        super(props)
        this.state = {
            player: Player.X
        }
    }

    renderSquare(i: number) {
        return <TicTacToeSquare value={ i } />;
    }
    
    render() {
        return (
        <div className="TicTacToeBoard">
            <div className="status">Next player: { this.state.player }</div>
            <div className="row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}

export default TicTacToeBoard
