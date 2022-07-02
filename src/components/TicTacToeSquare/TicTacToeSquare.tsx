import React from "react";
import './TicTacToeSquare.scss';

type TicTacToeSquareProps = {
    value: number
}

type TicTacToeSquareState = {
    checked?: boolean
}

class TicTacToeSquare extends React.Component<TicTacToeSquareProps, TicTacToeSquareState> {

    constructor(props: TicTacToeSquareProps) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <button className="TicTacToeSquare" onClick={ () => this.onClick() }>
                { this.state.checked ? this.props.value : null }
            </button>
        )
    }

    private onClick() {
        this.setState({
            checked: !this.state.checked
        })
    }
}

export default TicTacToeSquare
