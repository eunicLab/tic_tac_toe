import React from 'react';
import './App.css';


function Square(props){

  
    return (
      <button className={props.squareStyle} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }


export default Square