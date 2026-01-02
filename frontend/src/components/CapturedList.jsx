import { useState, useEffect } from "react";
import { listCapturedText, updateCapturedText, deleteCapturedText } from "../api/CapturedText";

export default function CapturedList({ refreshToken }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");

    async function loadItems() {
        setLoading(true);
        setError(null);

        try{
            const res = await listCapturedText();
            setItems(res.data);
        }
        catch{
            setError("Failed to load");
        }
        finally{
            setLoading(false);
        }

    }

    useEffect(() => {loadItems();}, [refreshToken]);

    async function deleteItems(id) {
        setError(null)
      
        try{
            await deleteCapturedText(id);
            setItems(prev => prev.filter(item => item.id !== id));

        }
        catch{
            setError("Failed to delete")
        }
    }

    async function saveEdit(id) {
        try {
            const res = await updateCapturedText(id, { content: editValue });
            setItems(prev => prev.map(item => (item.id === id ? res.data : item)));
            setEditingId(null);
        }
        catch{
            setError("Failed to save changes");
        }
    }
return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {editingId === item.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => saveEdit(item.id)}>
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditValue("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{item.content}</p>
                  <button
                    onClick={() => {
                      setEditingId(item.id);
                      setEditValue(item.content);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteItems(item.id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && <p>{error}</p>}
    </div>
  );
}






