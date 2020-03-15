import React from 'react';
import './App.css';
import Square from './Square';

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        squareStyle={
          i === global.winArray[0] ||
          i === global.winArray[1] ||
          i === global.winArray[2]
            ? 'squareWin'
            : 'square'
        }
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div>
          <div className='board-row1'>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className='board-row2'>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className='board-row3'>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <div class='endgame'>text</div>
      </div>
    );
  }
}

export default Board;
