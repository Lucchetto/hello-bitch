import React from "react";
import { Player } from "../../model/Player";
import './TicTacToeSquare.scss';

type TicTacToeSquareProps = {
    onSquareClicked: () => Player
    x: number
    y: number
}

type TicTacToeSquareState = {
    checked?: Player
}

class TicTacToeSquare extends React.Component<TicTacToeSquareProps, TicTacToeSquareState> {

    constructor(props: TicTacToeSquareProps) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <button className="TicTacToeSquare" onClick={ () => this.onClick() }>
                { this.state.checked }
            </button>
        )
    }

    private onClick() {
        if (this.state.checked === undefined) {
            this.setState({
                checked: this.props.onSquareClicked()
            })   
        }
    }
}

export default TicTacToeSquare
