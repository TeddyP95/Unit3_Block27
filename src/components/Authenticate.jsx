import { useState } from 'react';

export default function Authenticate({ token }) {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [userData, setUserData] = useState(null);
    
    async function handleClick() {
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json();
            setSuccessMessage(result.message);
            setUserData(result.data);
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    }
    
    return (
        <div>
            <h2>Authenticate</h2>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            {userData && <p>Logged in as: {userData.username}</p>}
            <button onClick={handleClick}>Authenticate Token</button>
        </div>
    );
}