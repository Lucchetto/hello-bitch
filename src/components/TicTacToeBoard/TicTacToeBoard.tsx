import React from "react"
import './TicTacToeBoard.scss';
import TicTacToeSquare from "../TicTacToeSquare/TicTacToeSquare"
import { Player } from "../../model/Player";

type BoardState = {
    player: Player
}

class TicTacToeBoard extends React.Component<any, BoardState> {

    constructor(props: any) {
        super(props)
        this.state = {
            player: Player.X
        }
    }

    renderSquare(x: number, y: number) {
        return <TicTacToeSquare x={ x } y={ y } onSquareClicked={ () => this.onSquareClicked() } />;
    }

    private onSquareClicked(): Player {
        const currentPlayer = this.state.player
        // Set next player
        this.setState({
            player: this.flipPlayer(currentPlayer)
        })
        return currentPlayer
    }

    private flipPlayer(player: Player): Player {
        return player == Player.O ? Player.X : Player.O
    }
    
    render() {
        return (
        <div className="TicTacToeBoard">
            <div className="status">Next player: { this.state.player }</div>
            <div className="row">
            {this.renderSquare(0, 0)}
            {this.renderSquare(1, 0)}
            {this.renderSquare(2, 0)}
            </div>
            <div className="row">
            {this.renderSquare(0, 1)}
            {this.renderSquare(1, 1)}
            {this.renderSquare(2, 2)}
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
