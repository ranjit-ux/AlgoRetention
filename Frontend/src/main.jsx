import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './App.css'
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
        <BrowserRouter>
            <AuthProvider>
                <App />
                <Toaster 
                    position="top-right"
                    richColors
                /> 
                <Analytics/>
            </AuthProvider>
        </BrowserRouter>
    </GoogleOAuthProvider>
);