import React from "react";
import { SquareModel } from "../../model/SquareModel";
import './TicTacToeSquare.scss';

type TicTacToeSquareProps = {
    onSquareClicked: () => void
    model?: SquareModel
}

class TicTacToeSquare extends React.Component<TicTacToeSquareProps> {

    render() {
        return (
            <button className={`TicTacToeSquare ${this.props.model?.winningSquare ? "winning" : ""}`} onClick={ () => this.onClick() }>
                { this.props.model?.player }
            </button>
        )
    }

    private onClick() {
        this.props.onSquareClicked()
    }
}

export default TicTacToeSquare
