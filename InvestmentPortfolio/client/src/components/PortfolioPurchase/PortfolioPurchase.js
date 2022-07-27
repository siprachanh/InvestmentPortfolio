import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { getAllPortfolioPurchases, deletePortfolioPurchase } from "../../modules/portfolioPurchaseManager";

const PortfolioPurchase = ({ portfolioPurchase }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        deletePortfolioPurchase(PortfolioPurchase.id).then(() => {
            getAllPortfolioPurchases()
        });
    };

    return (
        <Card>
            <h3>My Portfolio Purchase</h3>

            <CardBody>
                <p> PortfolioPurchase Id: {portfolioPurchase.id}</p>
                <p> PortfolioPurchase SecurityId: {portfolioPurchase.securityId}</p>
                <p> PortfolioPurchase PortfolioId: {portfolioPurchase.portfolioId}</p>
                <p> PortfolioPurchase AmountPurchase: {portfolioPurchase.amountPurchase}</p>
                <p> PortfolioPurchase PurchaseDate: {portfolioPurchase.purchaseDate}</p>
                <Button className="btn btn-primary" onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card>
    );
};

export default PortfolioPurchase;
// PortfolioPurchase: Id, SecurityId, PortfolioId, AmountPurchase, PurchaseDate