import { useState } from "react";
import VideoCall from "./VideoCall"; // <-- Add this import
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [sessionId, setSessionId] = useState("");

  function createSession() {
    const id = Math.random().toString(36).substring(2, 10);
    setSessionId(id);
    setPage("video"); // <-- THIS LINE WAS MISSING
  }

  return (
    <div className="App">
      {/* HOME PAGE */}
      {page === "home" && (
        <>
          <h1>HELLO RASHI TEST</h1>
          <p>Welcome to ATOMQUEST Hackathon Project</p>

          <button style={btn} onClick={() => setPage("dashboard")}>
            Agent Login
          </button>

          <button style={btn} onClick={() => setPage("customer")}>
            Join as Customer
          </button>
        </>
      )}

      {/* AGENT DASHBOARD */}
      {page === "dashboard" && (
        <>
          <h1>📋 Agent Dashboard</h1>

          <button style={btn} onClick={createSession}>
            Create New Session
          </button>

          {sessionId !== "" && (
            <>
              <h3>Current Session ID</h3>
              <h2>{sessionId}</h2>
            </>
          )}

          <br />
          <button style={btn} onClick={() => setPage("home")}>
            Logout
          </button>
        </>
      )}

      {/* CUSTOMER PAGE */}
      {page === "customer" && (
        <>
          <h1>👥 Customer Join</h1>

          <input
            type="text"
            placeholder="Enter Session ID"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            style={{
              padding: "12px",
              width: "300px",
              fontSize: "18px",
              borderRadius: "8px",
            }}
          />

          <br /><br />
          <button style={btn} onClick={() => setPage("video")}>
            Join Session
          </button>

          <br /><br />
          <button style={btn} onClick={() => setPage("home")}>
            Back
          </button>
        </>
      )}

      {/* VIDEO PAGE - NOW USING THE REAL COMPONENT */}
      {page === "video" && (
        <VideoCall sessionId={sessionId} setPage={setPage} />
      )}
    </div>
  );
}

const btn = {
  padding: "15px 25px",
  margin: "10px",
  fontSize: "18px",
  cursor: "pointer",
  borderRadius: "8px",
};

export default App;