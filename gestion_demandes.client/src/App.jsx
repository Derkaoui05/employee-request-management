import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import EmployeePage from "./components/Employes/Employe";
import DemandesPage from "./components/Demandes/page"

const App = () => {
    return (
        <Router>
            <Dashboard>
                <Routes>
                    <Route path="/" element={<>

                        <h1 class="flex items-center text-5xl font-extrabold ">Bienvenue MR. YASSIR en Tant que
                        <span className="bg-blue-100 text-blue-800 text-3xl font-bold me-2 px-3 py-1 rounded-sm shadow-sm ms-2 animate-shine">
                            Manager
                        </span></h1>

                    </>} />
                    <Route path="/employes/liste" element={<EmployeePage />} />
                    <Route path="/demandes/nouvelle" element={<DemandesPage />} />
                </Routes>
            </Dashboard>
        </Router>
    );
};

export default App;
