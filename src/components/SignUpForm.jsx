import { useState } from 'react';

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [validationMessages, setValidationMessages] = useState({});

    const validateForm = () => {
        const messages = {};
        
        // Username validation
        if (username.length < 8) {
            messages.username = "Username must be at least 8 characters long";
        }
        
        // Password validation
        if (password.length < 8) {
            messages.password = "Password must be at least 8 characters long";
        } else if (!/[A-Z]/.test(password)) {
            messages.password = "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(password)) {
            messages.password = "Password must contain at least one number";
        }

        setValidationMessages(messages);
        return Object.keys(messages).length === 0; // Returns true if no validation errors
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setValidationMessages({});

        if (!validateForm()) {
            return; // Stop submission if validation fails
        }

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            const result = await response.json();
            setToken(result.token);
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>Sign Up!</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>
                        <span className="label-text">Username</span>
                        <span className="requirements">(minimum 8 characters)</span>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                        {validationMessages.username && 
                            <span className="validation-message">{validationMessages.username}</span>
                        }
                    </label>
                </div>
                <div className="input-container">
                    <label>
                        <span className="label-text">Password</span>
                        <span className="requirements">(8+ chars, 1 uppercase, 1 number)</span>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        {validationMessages.password && 
                            <span className="validation-message">{validationMessages.password}</span>
                        }
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}