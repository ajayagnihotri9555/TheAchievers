import React, { useState } from "react";
import "./index.css";
import Login from "./login";

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [screen, setScreen] = useState("home");

    const handleLoginSuccess = (user) => {
        setCurrentUser(user);
    };

    if (!currentUser) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="container">
            {screen === "home" ? (
                <div className="home">
                    <h1>HectoClash ⚡</h1>
                    <p>Welcome, {currentUser.username}!</p>
                    <p>Your rank: {currentUser.rank}</p>
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
};

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