function Home({ setPage }) {
  return (
    <div>
      <h1>🎥 Real-Time Video Support Platform</h1>

      <p>Welcome to ATOMQUEST Hackathon Project</p>

      <button onClick={() => setPage("dashboard")}>
        Agent Login
      </button>

      <button
        onClick={() => setPage("customer")}
        style={{ marginLeft: "10px" }}
      >
        Join as Customer
      </button>
    </div>
  );
}

export default Home;