import React from "react";
import { Player } from "../../model/Player";
import './TicTacToeSquare.scss';

type TicTacToeSquareProps = {
    onSquareClicked: () => void
    x: number
    y: number
    checked?: Player
}

class TicTacToeSquare extends React.Component<TicTacToeSquareProps> {

    constructor(props: TicTacToeSquareProps) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <button className="TicTacToeSquare" onClick={ () => this.onClick() }>
                { this.props.checked }
            </button>
        )
    }

    private onClick() {
        this.props.onSquareClicked()
    }
}

export default TicTacToeSquare
