# Real-Time Video Support Platform - ATOMQUEST HACKATHON 1.0

Browser-based video calling platform for customer support. Agents create sessions, customers join via shareable link. Media routed through our own server. No third-party video SDKs.

## Core Features

### Session Management
- Agent creates call session and generates invite link/token
- Customer joins via browser - no app install needed
- Tracks active participants and session duration
- Clean session termination by either party

### Audio & Video Calling
- Real-time video/audio between agent and customer
- Server-mediated WebRTC - no peer-to-peer
- Stable connection with mute/unmute video/audio controls

### In-Call Chat
- Real-time text messaging during active calls
- Messages persisted for session record
- Chat history retrievable after call ends

### Role-Based Access
| Role | Permissions |
| --- | --- |
| Call Agent | Create sessions, start/end calls, start/stop recording |
| Customer | Join via invite only, cannot create/end sessions |

## Tech Stack
**Frontend**: React.js  
**Backend**: Node.js, Express.js  
**Real-time**: Socket.IO for signaling + chat  
**Video**: WebRTC with custom SFU server  
**Database**: MongoDB for session history  

## Project Structure