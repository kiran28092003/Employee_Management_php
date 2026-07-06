import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        mobile: ""
    });

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost/api/users/${id}`).then(function(response) {
            if (response.data) {
                setInputs(response.data);
            }
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost/api/users/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            navigate('/'); // Redirects back to user list after saving
        });
    }

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit User Details</h2>
            <form onSubmit={handleSubmit} style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={inputs.name || ""} 
                        onChange={handleChange} 
                        style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={inputs.email || ""} 
                        onChange={handleChange} 
                        style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontWeight: "bold" }}>Mobile:</label>
                    <input 
                        type="text" 
                        name="mobile" 
                        value={inputs.mobile || ""} 
                        onChange={handleChange} 
                        style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <button type="submit" style={{ flex: 1, padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                        Save Changes
                    </button>
                    <button type="button" onClick={() => navigate('/')} style={{ flex: 1, padding: "10px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}