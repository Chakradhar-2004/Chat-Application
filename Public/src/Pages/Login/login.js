import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import Logo from '../images/logo.png';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../../utils/apiRoutes";

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = values;
        try {
            const response = await axios.post(loginRoute, { email, password });
            console.log("API Response:", response);  // Log the entire response
            
            if (response.status === 200 && response.data && response.data.user) {
                console.log("Login successful");
                localStorage.setItem("Chat-App", JSON.stringify(response.data.user));
                if (!response.data.user.avatar) navigate("/setAvatar");
                else navigate("/chat");  // Navigate to the home page after successful login
            } else {
                console.error("Login failed:", response.data.msg || "Unexpected error");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    useEffect(() => {
        if (localStorage.getItem("Chat-App") !== undefined) {
            console.log("User is already logged in");
            //navigate("/");
        }
    }, []);  // Dependency array to run this effect only once

    return (
        <div>
            <div className={styles.Form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.Brand}>
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className={styles.Input}>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            value={values.email}
                            onChange={handleChange}
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={values.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button>Sign In</button>
                    <span>
                        Don't have an account? <Link to="/register">Register</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
