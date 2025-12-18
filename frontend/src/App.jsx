import { useState, useEffect } from "react";
import { api } from "./api";

export default function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/captured-text/");
      setData(res.data);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    const value = text.trim();
    if (!value) return;

    setError(null);
    try {
      await api.post("/captured-text/", { content: value });
      setText("");
      await load();
    } catch {
      setError("Failed to save");
    }
  }

  async function handleDelete(id) {
    setError(null);
    try {
      await api.delete(`/captured-text/${id}/`);
      await load();
    } catch {
      setError("Failed to delete");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1>Captured texts</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleSubmit} disabled={!text.trim() || loading}>
        Save
      </button>

      {error && <p>{error}</p>}
      {loading && <p>Loading…</p>}

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.content}
            <button onClick={() => handleDelete(item.id)} disabled={loading}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {!loading && data.length === 0 && <p>No items</p>}
    </div>
  );
}
