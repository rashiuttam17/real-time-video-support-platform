import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function VideoCall({ sessionId, setPage }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pc = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  useEffect(() => {
    socket.emit('join-room', sessionId);

    pc.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    pc.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { sessionId, candidate: event.candidate });
      }
    };

    socket.on('user-joined', handleUserJoined);
    socket.on('offer', handleOffer);
    socket.on('answer', handleAnswer);
    socket.on('ice-candidate', handleNewICECandidate);

    return () => {
      socket.off('user-joined');
      socket.off('offer');
      socket.off('answer');
      socket.off('ice-candidate');
      if (stream) stream.getTracks().forEach(track => track.stop());
      if (pc.current) pc.current.close();
    };
  }, [sessionId]);

  const toggleCamera = async () => {
    if (!cameraOn) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        localVideoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        
        mediaStream.getTracks().forEach(track => {
          pc.current.addTrack(track, mediaStream);
        });
        
        setCameraOn(true);
      } catch (err) {
        console.log('Camera error:', err);
        alert('Camera blocked');
      }
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      localVideoRef.current.srcObject = null;
      setStream(null);
      setCameraOn(false);
    }
  };

  const handleUserJoined = async () => {
    if (!stream) return;
    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);
    socket.emit('offer', { sessionId, offer });
  };

  const handleOffer = async ({ offer }) => {
    await pc.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answer);
    socket.emit('answer', { sessionId, answer });
  };

  const handleAnswer = async ({ answer }) => {
    await pc.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleNewICECandidate = async ({ candidate }) => {
    try {
      await pc.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (e) {
      console.log('Error adding ICE:', e);
    }
  };

  const handleEndCall = () => {
    if (stream) stream.getTracks().forEach(track => track.stop());
    socket.emit('leave-room', sessionId);
    setPage("home");
  };

  return (
    <div>
      <h1>🎥 Video Support Session</h1>
      <h3>Session ID: {sessionId}</h3>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div>
          <p>You</p>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "400px", height: "300px", background: "#ddd", borderRadius: "10px" }}
          />
        </div>
        <div>
          <p>Customer</p>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: "400px", height: "300px", background: "#ddd", borderRadius: "10px" }}
          />
        </div>
      </div>

      <button style={btn}>🎤 Mute</button>
      <button style={btn} onClick={toggleCamera}>
        📷 {cameraOn? 'Camera On' : 'Camera Off'}
      </button>
      <button style={btn}>💬 Chat</button>
      <br /><br />
      <button style={btn} onClick={handleEndCall}>
        ❌ End Call
      </button>
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

export default VideoCall;