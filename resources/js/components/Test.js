import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}

class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: "あいうえお",
        };
    }
    renderText() {
        return (
            <div>{this.state.value}</div>
        );
    }
    handleClick(){
        this.setState({
            value: this.state.value=="あいうえお" ? "かきくけこ" : "あいうえお"
        });
    }
    render() {
        return (
            <div>
                <div>Hello React!!</div>
                {this.renderText()}
                <Square
                    value={this.state.value}
                    onClick={() => this.handleClick()}
                />
            </div>
        );
    }
}

export default Test;

if (document.getElementById('test')) {
    ReactDOM.render(<Test />, document.getElementById('test'));
}
