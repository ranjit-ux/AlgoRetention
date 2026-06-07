import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const googleLogin = async (token) => {
    const response = await API.post(
        "/auth/google",{token}    
    );

    return response.data;
};