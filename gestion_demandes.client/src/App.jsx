import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeePage from './components/Employes/Employe';

const App = () => {
    return (
        <div>
            <Router>
            <Dashboard />
                <Routes>
                    <Route path="/employes/liste" element={<EmployeePage/>} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;