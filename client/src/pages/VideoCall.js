function VideoCall({ sessionId, setPage }) {
  return (
    <div>
      <h1>🎥 Video Support Session</h1>

      <h3>Session ID: {sessionId}</h3>

      <div
        style={{
          width: "600px",
          height: "320px",
          background: "#dddddd",
          margin: "20px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        📹 Video Screen
      </div>

      <button>🎤 Mute</button>

      <button>📷 Camera Off</button>

      <button>💬 Chat</button>

      <br />
      <br />

      <button
        onClick={() => setPage("home")}
      >
        ❌ End Call
      </button>
    </div>
  );
}

export default VideoCall;