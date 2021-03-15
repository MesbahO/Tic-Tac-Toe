import React, {useState, useEffect} from "react";
import "./game.scss";

export default function Game() {
  const [gameBoard, setGameBoard] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [color, setColor] = useState();
  const [background, setBackground] = useState({});
  const [playerTurn, setPlayerTurn] = useState(true);
  const [turnCount, setTurnCount] = useState(0);
  const [winner, setWinner] = useState();
  const [warning, setWarning] = useState();
  const colours = ["Blue", "Pink", "Green", "Yellow", "Red", "Orange", "Brown", "Purple"];
  // setting up initial board
  useEffect(() => {
    const setBoard = () => {
      let startArray = [];
      for (let i = 1; i < 10; i++) {
        startArray.push(i);
      }
      return startArray;
    };
    setGameBoard(setBoard());
  }, []);

  // swapping between players as the turns progress
  useEffect(() => {
    playerTurn ? setColor(player1) : setColor(player2);
  }, [playerTurn, player1, player2]);

  // winning logic
  useEffect(() => {
    //  returning the player based on the winning colour
    const getWinner = (color) => {
      if (player1 === color) {
        setWinner(1);
        return "Player 1";
      } else {
        setWinner(1);
        return "Player 2";
      }
    };
    //winning logic starts after turn 5 to improve efficiency
    if (turnCount >= 5) {
      background[1] && background[1] === background[2] && background[1] === background[3]
        ? setWarning(`${getWinner(background[1])} Wins!`)
        : background[4] && background[4] === background[5] && background[4] === background[6]
        ? setWarning(`${getWinner(background[4])} Wins!`)
        : background[7] && background[7] === background[8] && background[7] === background[9]
        ? setWarning(`${getWinner(background[7])} Wins!`)
        : background[1] && background[1] === background[4] && background[1] === background[7]
        ? setWarning(`${getWinner(background[1])} Wins!`)
        : background[2] && background[2] === background[5] && background[2] === background[8]
        ? setWarning(`${getWinner(background[2])} Wins!`)
        : background[3] && background[3] === background[6] && background[3] === background[9]
        ? setWarning(`${getWinner(background[3])} Wins!`)
        : background[1] && background[1] === background[5] && background[1] === background[9]
        ? setWarning(`${getWinner(background[1])} Wins!`)
        : background[3] && background[3] === background[5] && background[3] === background[7]
        ? setWarning(`${getWinner(background[3])} Wins!`)
        : console.log("");
    }
    if (turnCount === 9) {
      setWinner(1);
      setWarning("Game Draw");
    }
  }, [turnCount, background, player1]);

  // sets box color per turn
  const setBox = (box) => {
    if (!player1 || !player2) {
      setWarning("Please select colors for both players");
    } else if (!background[box] && !winner && !warning) {
      setBackground({...background, [box]: color});
      setPlayerTurn(!playerTurn);
      setTurnCount(turnCount + 1);
    } else {
      setWarning("Can't place here");
    }
  };
  //  returning the play based on the win condition colour

  return (
    <section className="board">
      <section className="controls">
        <div style={{display: player1 && player2 ? "none" : ""}}>
          <select
            className="input"
            name="players"
            id="players"
            onChange={(e) => {
              setSelectedPlayer(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Select Player
            </option>
            <option value="player1">player1</option>
            <option value="player2">player2</option>
          </select>
          <select
            className="input"
            name="colors"
            id="colors"
            onChange={(e) => {
              selectedPlayer === "player1"
                ? setPlayer1(e.target.value)
                : setPlayer2(e.target.value);
            }}
          >
            <option value="" disabled selected hidden>
              Select Colour
            </option>
            {colours.map((eachColor) => {
              return <option value={eachColor}>{eachColor}</option>;
            })}
          </select>
        </div>
        <div className="player-section">
          <div className="player-wrapper">
            <span className="player-tag">Player 1</span>
            <div
              className="player-color"
              style={{
                display: player1 ? "" : "none",
                background: player1,
              }}
            ></div>
          </div>
          <div className="player-wrapper">
            <span className="player-tag"> Player 2</span>
            <div
              className="player-color"
              style={{display: player1 ? "" : "none", background: player2}}
            ></div>
          </div>
        </div>
      </section>
      <section className="boxes">
        {gameBoard.map((box) => {
          return (
            <div
              key={box}
              className="box"
              style={{background: background[box]}}
              onClick={() => {
                setBox(box);
              }}
            ></div>
          );
        })}
      </section>
      <section className="popup" style={{display: warning ? "" : "none"}}>
        <div className="popup-message">{warning}</div>
        <button
          className="popup-button"
          onClick={() => {
            winner ? window.location.reload() : setWarning();
          }}
        >
          ok
        </button>
      </section>
    </section>
  );
}
