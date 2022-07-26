import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PortfolioList from "./Portfolio/PortfolioList";
import PortfolioForm from "./Portfolio/PortfolioForm";
import EditPortfolio from "./Portfolio/PortfolioEdit";
import { deletePortfolio } from "../modules/portfolioManager";
import PortfolioPurchaseList from "./PortfolioPurchase/PortfolioPurchaseList";
import RiskLevelList from "./RiskLevel/RiskLevelList";
import SecurityList from "./Security/SecurityList";
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
                    <Route index element={isLoggedIn ? <PortfolioList /> : <Navigate to="/login" />} />
                    <Route path="newportfolio"
                        element={isLoggedIn ? <PortfolioForm /> : <Navigate to="/login" />} />

                    <Route path="portfolio/Edit/:id"
                        element={isLoggedIn ? <EditPortfolio /> : <Navigate to="/login" />} />

                    <Route path="portfolio/Delete"
                        element={isLoggedIn ? <deletePortfolio /> : <Navigate to="/portfolio" />} />

                    <Route path="portfoliopurchase"
                        element={isLoggedIn ? <PortfolioPurchaseList /> : <Navigate to="/login" />} />

                    <Route path="risklevel" exact>
                        <Route index element={<RiskLevelList />} />
                    </Route>
                    <Route path="security" exact>
                        <Route index element={<SecurityList />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main >
    );
};
