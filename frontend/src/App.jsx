import { useState } from "react";
import CaptureForm from "./components/CaptureForm";
import CapturedList from "./components/CapturedList";
import Login from "./pages/Login"
import { logout } from "./api/auth"

function hasToken() {
  return !!localStorage.getItem("accessToken");
}

export default function App() {
  const [authed, setAuthed] = useState(hasToken());
  const [refreshToken, setRefreshToken] = useState(0);

  function handleCreated() {
    setRefreshToken((x) => x + 1);
  }

  if (!authed) {
    return <Login onSuccess={() => setAuthed(true)}/>;
  }

  return (
    <div>
      <button onClick={() => {
        logout();
        setAuthed(false);
      }}>
        Logout
      </button>

      <h1>Capture</h1>
      <CaptureForm onCreated={handleCreated} />
      <CapturedList refreshToken={refreshToken} />
    </div>
  );
}

