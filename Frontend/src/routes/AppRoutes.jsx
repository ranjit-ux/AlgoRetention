import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import Dashboard from "../pages/Dashboard";
import Problems from "../pages/Problems";
import Revisions from "../pages/Revisions";
import Analytics from "../pages/Analytics";

import ProtectedRoute from "../components/ProtectedRoute";

import DashboardLayout from "../components/layout/DashboardLayout";
import Support from "../pages/Support";

const ProtectedLayout = ({ children }) => (
    <ProtectedRoute>
        <DashboardLayout>
            {children}
        </DashboardLayout>
    </ProtectedRoute>
);

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedLayout>
                        <Dashboard />
                    </ProtectedLayout>
                }
            />

            <Route
                path="/problems"
                element={
                    <ProtectedLayout>
                        <Problems />
                    </ProtectedLayout>
                }
            />

            <Route
                path="/revisions"
                element={
                    <ProtectedLayout>
                        <Revisions />
                    </ProtectedLayout>
                }
            />

            <Route
                path="/analytics"
                element={
                    <ProtectedLayout>
                        <Analytics />
                    </ProtectedLayout>
                }
            />

            <Route
                path="/support"
                element={
                    <ProtectedLayout>
                        <Support />
                    </ProtectedLayout>
                }
            />
        </Routes>
    );
};

export default AppRoutes;