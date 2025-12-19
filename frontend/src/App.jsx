import { useState } from "react";
import CaptureForm from "./components/CaptureForm";
import CapturedList from "./components/CapturedList";

export default function App() {
  const [refreshToken, setRefreshToken] = useState(0);

  function handleCreated() {
    setRefreshToken((x) => x + 1);
  }

  return (
    <div>
      <h1>Ingest</h1>
      <CaptureForm onCreated={handleCreated} />
      <CapturedList refreshToken={refreshToken} />
    </div>
  );
}
