import React, { Component } from 'react';

const SnakeDot = (props) => {
  return (
    <div>
      {
        props.Snakedots.map((dot,i) => {
          const style = {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`
          }
          return (
            <div className='snake-dot' key={i} style={style}></div>
          )
        })
      }
    </div>
  )
}

const SnakeFood = (props) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  }
  return (
    <div className="snake-food" style={style}></div>
  )
}

const GetRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor( (Math.random()*(max-min+1)+min) /2 ) * 2;
  let y = Math.floor( (Math.random()*(max-min+1)+min) /2 ) * 2;
  return [x,y]
}

const initialState = {
  Snakedots: [
    [0,0],
    [2,0],
    [4,0],
  ],
  // food: [80,75]
  food: GetRandomCoordinates(),
  direction: 'RIGHT',
  speed: 200
}

class App extends Component {
  // state = {
  //   Snakedots: [
  //     [0,0],
  //     [2,0],
  //     [4,0],
  //   ],
  //   // food: [80,75]
  //   food: GetRandomCoordinates(),
  //   direction: 'RIGHT',
  //   speed: 200
  // }

  state = initialState;

  componentDidMount() {
    // setInterval(this.moveSnake, 500);
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfOutofBorders();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:  //keyboard: arrow up
        this.setState({direction: 'UP'});
        break;
      case 40:  //keyboard: arrow up
        this.setState({direction: 'DOWN'});
        break;
      case 37:  //keyboard: arrow left
        this.setState({direction: 'LEFT'});
        break;
      case 39:  //keyboard: arrow right
        this.setState({direction: 'RIGHT'});
        break;
      default:
        this.setState({direction: 'RIGHT'});
        break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.Snakedots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0]+2, head[1]];
        break;
      case 'LEFT':
        head = [head[0]-2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1]+2];
        break;
      case 'UP':
        head = [head[0], head[1]-2];
        break;
      default:
        head = [head[0]+2, head[1]];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      Snakedots: dots
    })
  }

  checkIfOutofBorders() {
    let head = this.state.Snakedots[this.state.Snakedots.length- 1];
    if (head[0]>=100 || head[1] >=100 || head[0] <0 || head[1] <0) {
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.Snakedots];
    let head = snake[snake.length -1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat() {
    let head = this.state.Snakedots[this.state.Snakedots.length- 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: GetRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.Snakedots];
    newSnake.unshift([])
    this.setState(
      {Snakedots: newSnake}
    )
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 50
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.Snakedots.length}`);
    this.setState(
      // state = {
      //   Snakedots: [
      //     [0,0],
      //     [2,0],
      //     [4,0],
      //   ],
      //   // food: [80,75]
      //   food: GetRandomCoordinates(),
      //   direction: 'RIGHT',
      //   speed: 200
      // }
      initialState
    )
  }

  render() {
    return (
      <div className='game-area'> 
        {/* <div className='snake-dot' style={{top:0, left:0}}></div>
        <div className='snake-dot' style={{top:0, left:'2%'}}></div>
        <div className='snake-dot' style={{top:0, left:'4%'}}></div> */}
        <SnakeDot Snakedots={this.state.Snakedots}/>
        <SnakeFood dot={this.state.food}/>
      </div>
    );
  }
}

export default App;
