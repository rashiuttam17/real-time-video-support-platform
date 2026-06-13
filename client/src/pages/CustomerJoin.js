function CustomerJoin({
  sessionId,
  setSessionId,
  setPage,
}) {
  return (
    <div>
      <h1>👥 Customer Join</h1>

      <input
        type="text"
        placeholder="Enter Session ID"
        value={sessionId}
        onChange={(e) =>
          setSessionId(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={() => setPage("video")}
      >
        Join Session
      </button>

      <button
        onClick={() => setPage("home")}
      >
        Back
      </button>
    </div>
  );
}

export default CustomerJoin;