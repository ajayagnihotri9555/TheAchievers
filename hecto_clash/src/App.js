import React, { useState } from "react";
import "./index.css";

function App() {
  const [screen, setScreen] = useState("home");

  return (
    <div className="container">
      {screen === "home" ? (
        <div className="home">
          <h1>HectoClash ⚡</h1>
          <button onClick={() => setScreen("game")}>Start Duel</button>
          <button onClick={() => setScreen("leaderboard")}>Leaderboard</button>
        </div>
      ) : screen === "game" ? (
        <GameScreen setScreen={setScreen} />
      ) : (
        <LeaderboardScreen setScreen={setScreen} />
      )}
    </div>
  );
}

function GameScreen({ setScreen }) {
  return (
    <div className="game">
      <h2>Game Screen</h2>
      <p>Here the game will be played!</p>
      <button onClick={() => setScreen("home")}>Back</button>
    </div>
  );
}

function LeaderboardScreen({ setScreen }) {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <p>Here we will show player rankings.</p>
      <button onClick={() => setScreen("home")}>Back</button>
    </div>
  );
}

export default App;