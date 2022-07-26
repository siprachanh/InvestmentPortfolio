import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PortfolioList from "./Portfolio/PortfolioList";
import PortfolioForm from "./Portfolio/PortfolioForm";
// import PortfolioPurchase from "./PortfolioPurchase";
import RiskLevelList from "./RiskLevel/RiskLevelList";
import Login from "./Login";
import Register from "./Register";

//Routes comp from npm module looks through its child routes and find the match
//if url matches value of path attribute, the element of that <route> will be rendered
//* indicate default route
export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">

                    <Route index element={isLoggedIn ? <PortfolioList /> : <Navigate to="/login" />}
                    />
                    <Route path="newportfolio"
                        element={isLoggedIn ? <PortfolioForm /> : <Navigate to="/login" />} />
                    <Route path="risklevel">
                        <Route index element={<RiskLevelList />} />
                    </Route>
                    <Route path=":id" element={<p>TODO: Make Portfolio Details component</p>} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};
