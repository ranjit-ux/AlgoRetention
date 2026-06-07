import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getCurrentUser=async()=>{
    const token = localStorage.getItem("token");

    const response = await API.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};