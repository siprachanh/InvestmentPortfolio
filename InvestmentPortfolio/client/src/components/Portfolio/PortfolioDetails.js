import React from "react";
import { Button, Card, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { useState, useEffect } from "react";
import { getPortfolioById } from "../../modules/portfolioManager";
import { useParams } from "react-router-dom";

const PortfolioDetails = () => {
    const [portfolio, setPortfolio] = useState({});
    const { portfolioId } = useParams;
    const getPortfolio = (id) => {
        getPortfolioById(id).then(setPortfolio);
    };

    useEffect(() => {
        getPortfolio(portfolioId);
    }, [portfolioId]);

    return (
        <div>
            <Card>
                <p> Portfolio Id: {portfolio.id}</p>
                <p> Portfolio Risk Level: {portfolio.riskLevel.name}</p>
                <p> Portfolio Cash On Hand: {portfolio.cashOnHand}</p>
                <p> Portfolio User: {portfolio.userProfile.email}</p>
                <p> Portfolio Description: {portfolio.description}</p>

            </Card>
        </div>

    );
};
export default PortfolioDetails;

