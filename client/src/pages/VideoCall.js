import React, { useRef, useState } from 'react';

function VideoCall({ sessionId, setPage }) {
  const localVideoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  const toggleCamera = async () => {
    if (!cameraOn) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        localVideoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setCameraOn(true);
      } catch (err) {
        console.log('Camera error:', err);
        alert('Camera blocked. Check browser permissions.');
      }
    } else {
      // Turn camera off
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      localVideoRef.current.srcObject = null;
      setStream(null);
      setCameraOn(false);
    }
  };

  const handleEndCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setPage("home");
  };

  return (
    <div>
      <h1>🎥 Video Support Session</h1>

      <h3>Session ID: {sessionId}</h3>

      <video
        ref={localVideoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "600px",
          height: "320px",
          background: "#dddddd",
          margin: "20px auto",
          display: "block",
          borderRadius: "8px",
        }}
      />

      <button>🎤 Mute</button>

      <button onClick={toggleCamera}>
        📷 {cameraOn ? 'Camera On' : 'Camera Off'}
      </button>

      <button>💬 Chat</button>

      <br />
      <br />

      <button onClick={handleEndCall}>
        ❌ End Call
      </button>
    </div>
  );
}

export default VideoCall;