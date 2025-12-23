import { useState } from "react";
import { login } from "../api/auth";

export default function Login( {onSuccess} ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");    
    const [loading, setLoading] = useState(false);    
    const [error, setError] = useState(null);    

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try{
            await login(username, password);
            onSuccess();
        }
        catch{
            setError("Failed to login")
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <label>Password: </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}