import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListUser() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost/api/users/').then(function(response) {
            if(Array.isArray(response.data)){
                setUsers(response.data);
            }
        });
    }

    // --- ADD THIS DELETE FUNCTION ---
    const deleteUser = (id) => {
        if(window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost/api/users/${id}/delete`).then(function(response){
                console.log(response.data);
                getUsers(); // Refresh the table list data instantly
            });
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>List Users</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid #ccc", textAlign: "left" }}>
                        <th style={{ padding: "10px" }}>Name</th>
                        <th style={{ padding: "10px" }}>Email</th>
                        <th style={{ padding: "10px" }}>Mobile</th>
                        <th style={{ padding: "10px" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "10px" }}>{user.name}</td>
                            <td style={{ padding: "10px" }}>{user.email}</td>
                            <td style={{ padding: "10px" }}>{user.mobile}</td>
                            <td style={{ padding: "10px" }}>
                                <Link to={`/user/${user.id}/edit`} style={{ marginRight: "10px", color: "blue", textDecoration: "none" }}>Edit</Link>
                                {/* UPDATE DELETE BUTTON TO WORK ON CLICK */}
                                <button 
                                    onClick={() => deleteUser(user.id)} 
                                    style={{ color: "red", background: "none", border: "none", padding: 0, cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}