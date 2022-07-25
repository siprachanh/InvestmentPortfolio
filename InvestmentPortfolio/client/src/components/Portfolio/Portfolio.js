import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { getAllPortfolios } from "../../modules/portfolioManager";

const Portfolio = ({ portfolio }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        deletePortfolio(portfolio.id).then(() => {
            getAllPortfolios()
        });
    };

    return (
        <Card>
            <h3>Portfolio List</h3>

            <CardBody>
                <p> Portfolio Id: {portfolio.id}</p>
                <p> Portfolio Risk Level: {portfolio.riskLevel.name}</p>
                <p> Portfolio Cash On Hand: {portfolio.cashOnHand}</p>
                <p> Portfolio User: {portfolio.userProfile.email}</p>
                <p> Portfolio Description: {portfolio.description}</p>
                <Button className="btn btn-primary" onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card>
    );
};

export default Portfolio;