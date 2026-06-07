import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

export const createProblem = async (problemData) => {
    const response = await API.post(
        "/problems",
        problemData
    );

    return response.data;
};

export const getProblems = async () => {
    const response = await API.get("/problems");

    return response.data;
};

export const deleteProblem = async (id) => {
    const response = await API.delete(`/problems/${id}`);

    return response.data;
}

export const updateProblem = async (id,data) => {
    const response = await API.put(`/problems/${id}`,data);

    return response.data;
}

export const getDueRevisions = async() => {
    const response = await API.get("/problems/due");

    return response.data;
}