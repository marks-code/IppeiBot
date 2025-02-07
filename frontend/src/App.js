import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/predictions")  // Update URL if hosted elsewhere
      .then(response => {
        setPredictions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching predictions:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>NBA Predictions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Team</th>
              <th>Opponent</th>
              <th>Blended Probability</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((game, index) => (
              <tr key={index}>
                <td>{game.team}</td>
                <td>{game.team_opp}</td>
                <td>{(game.blended_prob * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
