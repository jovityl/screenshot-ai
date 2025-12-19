import { useState, useEffect } from "react";
import { listCapturedText, deleteCapturedText } from "../api/CapturedText";

export default function CapturedList({ refreshToken }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return(
        <div>
            {loading ? <p>Loading</p> 
            :items.length === 0 ? <p>No items found</p>
            : <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <p>{item.content}</p>
                        <button onClick= {() => deleteItems(item.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>}

            {error && <p>{error}</p>}
        </div>
    );
}