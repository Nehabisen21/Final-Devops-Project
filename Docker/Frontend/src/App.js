import React, { useEffect, useState } from "react";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>User Details</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
