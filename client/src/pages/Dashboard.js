function Dashboard({ createSession, sessionId, setPage }) {
  return (
    <div>
      <h1>📋 Agent Dashboard</h1>

      <button onClick={createSession}>
        Create New Session
      </button>

      <br />
      <br />

      {sessionId && (
        <>
          <h3>Session ID</h3>
          <h2>{sessionId}</h2>
        </>
      )}

      <button
        onClick={() => setPage("home")}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;