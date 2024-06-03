import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import styles from './register.module.css'
import Logo from '../images/logo.png'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import axios from 'axios'
import { registerRoute } from '../../utils/apiRoutes'
export default function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username : "",
        email : "",
        password : "",
        confirmPassword : ""
    })
        
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleAuthentication()) {  
            const { username, email, password } = values;
            try {
                const response = await fetch(registerRoute, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });
                if (response.ok) {
                    localStorage.setItem("Chat-App",JSON.stringify(response.user))
                    navigate("/login")
                } else {
                    const errorMessage = await response.text();
                    console.error("Registration failed:", errorMessage);
                    toast.error("Registration failed. Please try again later.");
                }
            } catch (error) {
                console.error("Registration failed:", error);
                toast.error("Registration failed. Please try again later.");
            }
        }
        
    };
    useEffect(()=>{
        if(localStorage.getItem("Chat-App")){
            navigate("/login")
        }
    })
    
        
    
    const handleAuthentication = () =>{
        const {username,Email,password,confirmPassword} = values
        if(password !== confirmPassword){
            toast.error("Password && confirm Password should be same", {
                position: "bottom-right",
                autoClose: 8500,
                pauseOnHover: true,
                draggable: true,
                theme: "dark"
            })
            return false
        }
        return true
    }
    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value})
    }
    return (
        <div>
            <ToastContainer />
            <div className={styles.Form}>
                
                <form onSubmit={event => { handleSubmit(event) }}>
                    <div className={styles.Brand}>
                        <img src={Logo}></img>
                    </div>
                    <div className={styles.Input}>
                        <input type='text' name='username' placeholder='UserName' value={values.username} onChange={event => { handleChange(event) }}></input>
                        <input type='email' name='email' placeholder='Email' value={values.email} onChange={event => { handleChange(event) }}></input>
                        <input type='password' name='password' placeholder='Password' value={values.password} onChange={event => { handleChange(event) }}></input>
                        <input type='password' name='confirmPassword' placeholder='Confirm Password' value={values.confirmPassword}  onChange={event => { handleChange(event) }}></input>
                    </div>
                    <button>Register</button>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>
            </div>
           
        </div> 
    )
}
