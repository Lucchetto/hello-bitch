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
            <button className={`TicTacToeSquare ${this.props.model?.winningSquare ? "winning" : ""}`} onClick={ () => this.props.onSquareClicked() }>
                { this.props.model?.player }
            </button>
        )
    }
}

export default TicTacToeSquare
