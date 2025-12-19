import { useState } from "react";
import { createCapturedText } from "../api/CapturedText";

export default function CaptureForm( {onCreated} ) {
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const trimmed = content.trim();
        if (!trimmed) return;

        setSubmitting(true);
        setError(null);

        try{
            await createCapturedText(trimmed);
            setContent("");
            onCreated?.();
        }
        catch{
            setError("Failed to save")
        }
        finally {
            setSubmitting(false);
        }

    }
    
    return(
        <form onSubmit={handleSubmit}>
            <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste text"> 
            </textarea>
            <button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save"}
            </button>
            {error && <p>{error}</p>}
        </form>

    );
}