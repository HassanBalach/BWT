import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  return (
    <div>
      <h1>Connecting Backend to Frontend</h1>
      {jokes.map((joke) => (
        <div
          key={joke.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            margin: "16px 0",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              color: "#333",
              marginBottom: "8px",
            }}
          >
            {joke.title}
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#666",
            }}
          >
            {joke.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default App;
