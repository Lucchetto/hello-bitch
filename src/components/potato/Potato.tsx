import randomColor from "randomcolor";
import React from "react";

type PotatoProps = {
    readonly text: string
}

type PotatoState = {
    bgColour: string
}

class Potato extends React.Component<PotatoProps, PotatoState> {
    
    constructor(readonly props: PotatoProps) {
        super(props)
        this.state = {
            bgColour: randomColor()
        }
    }

    render() {
        return (
            <div style={ this.style } onClick={ () => this.randomColour() }>{ this.props.text }</div>
        )
    }

    private get style(): React.CSSProperties {
        return {
            backgroundColor: this.state.bgColour
        }
    }

    private randomColour() {
        this.setState({
            bgColour: randomColor()
        })
    }
}

export default Potato;
