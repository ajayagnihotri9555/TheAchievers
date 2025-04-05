import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const socket = io("http://localhost:5000"); // Make sure your backend is running

export default function Dashboard() {
  const [stats, setStats] = useState({ players: 0, matches: 0, topPlayer: "N/A" });
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    socket.on("dashboardData", (data) => {
      if (data?.stats && data?.gameTrends) {
        setStats(data.stats);
        setGameData(data.gameTrends);
      }
    });
    return () => socket.off("dashboardData");
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>📊 HectoClash Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "30px" }}>
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", width: "30%" }}>
          <h3>Total Players</h3>
          <p style={{ fontSize: "24px" }}>{stats.players}</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", width: "30%" }}>
          <h3>Total Matches</h3>
          <p style={{ fontSize: "24px" }}>{stats.matches}</p>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", width: "30%" }}>
          <h3>Top Player</h3>
          <p style={{ fontSize: "24px" }}>{stats.topPlayer}</p>
        </div>
      </div>

      <h2 style={{ marginBottom: "10px" }}>📈 Match Trends Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={gameData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="matches" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
