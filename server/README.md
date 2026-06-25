# ATOMQUEST - Video Support Platform

## Setup Steps

**Prerequisites:** Node.js v18+ installed

**1. Server Setup**
```bash
cd server
npm install
node index.js
Server runs on `http://localhost:5000`

**2. Client Setup**
```bash
cd client  
npm install
npm start
App opens on http://localhost:30013. Testing FlowOpen localhost:3001 → Click Agent Login → Copy Session IDNew tab → Click Join as Customer → Paste Session ID → JoinClick Camera On on both sides to start WebRTC connectionTech StackReact.js, Node.js, Express, Socket.io, WebRTC, simple-peerKnown LimitationsVideo P2P Connection: Works on localhost/same network. For internet deployment, TURN server required to handle NAT traversal.Browser Support: Tested on Chrome. WebRTC may vary on other browsers.No Auth: Demo uses button-based session creation without user authentication.Single Session: One agent-customer pair per session ID.