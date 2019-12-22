import React from 'react';
import './App.css';
import Board from './Board.js'



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      global.winArray=[a,b,c]
      console.log(global.winArray)
      return squares[a];
    }
  }
  return null;
}


class Game extends React.Component {
  constructor(){
    super()
    global.winArray =[]
    global.clickcounter=0
    this.state={
      history:[{
        squares:Array(9).fill(null),
      }],
      stepNumber:0,
      xIsNext:true,
      textboxStatus:"noDisplay",
      PlayerX: "", 
      PlayerO:""  
    };
    this.handlePlayers=this.handlePlayers.bind(this)
    this.handleChangeX= this.handleChangeX.bind(this)
    this.handleChangeO= this.handleChangeO.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }



handlePlayers(event){
  event.preventDefault();
  this.setState({textboxStatus: "formStyle",})
}

handleChangeX(event){
  event.preventDefault();
  this.setState({ PlayerX: event.target.value,
                  

              })
}


handleChangeO(event){
  event.preventDefault();
  this.setState({ 
                  PlayerO: event.target.value,

              })
}

handleSubmit(event){
event.preventDefault();
    this.setState({textboxStatus: "noDisplay", })

}


handleClick(i){
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  const current = history[history.length-1];
  const squares = current.squares.slice();
  if(calculateWinner (squares) || squares[i]){
    return;
  }


  squares[i]= this.state.xIsNext?"X":"O"
  this.setState({
    history: history.concat([{
      squares:squares
    }]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext,

  });
}


jumpTo(step){
  global.winArray=[]
  
  this.setState({
    stepNumber:step,
    xIsNext:(step % 2) ===0,    
  });
}



  render() {
   
    const history = this.state.history
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move)=> {
      const desc = move ?
      'Go to Move #' + move:
      'Go to game start';
      global.clickcounter =move
      return(
        <li key={move}>
          <button className="buttonStyle" onClick={()=> this.jumpTo(move)}>{desc}</button>
        </li>


        )
    })

    let status;
    if(winner){
      status = 'Winner:' + winner +" "+(winner==='X'?this.state.PlayerX:this.state.PlayerO);
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X '+ this.state.PlayerX : '0 '+this.state.PlayerO);
    }
    if (!winner && global.clickcounter===9){status="It is a Draw"}




    return (
      <div className="game">
      <form className={this.state.textboxStatus}>
            <input type ="text"  placeholder ="Name of Player X"value={this.state.PlayerX} onChange={this.handleChangeX}/><br/>
            <input type ="text"  placeholder="Name of Player O" value={this.state.PlayerO} onChange={this.handleChangeO}/><br/>
            <button className="formButton" onClick={this.handleSubmit}> OK </button>
           
                    
      </form>
      <button className="btn" onClick={this.handlePlayers}>{this.state.PlayerX} X vs {this.state.PlayerO} O</button>
       <div>{status}</div>
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick ={(i)=> this.handleClick(i)}
           />

        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


export default Game;
