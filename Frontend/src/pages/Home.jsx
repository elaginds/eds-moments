import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }

                    const response = await axios.get('http://localhost:8000/api/user/', config)
                    setIsLoggedIn(true)
                    setUsername(response.data.username)
                } else {
                    setIsLoggedIn(false)
                    setUsername('')
                }

            }
            catch (e) {
                setIsLoggedIn(false)
                setUsername('')
            }
        }

        checkLoggedInUser().then(r => {})
    }, []);

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const refreshToken = localStorage.getItem("refreshToken")

            if (accessToken && refreshToken) {
                const config = {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }

                await axios.post('http://localhost:8000/api/logout/', {refresh: refreshToken}, config)
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                setIsLoggedIn(false)
                setUsername('')
            }
        } catch (e) {
            console.warn(e)
        }
    }

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <h2>Hi, {username}. Thanks for login in!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <h2>Please Login!</h2>
            )}
        </div>
    )
}