import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Button, Form } from "reactstrap";
import { addPortfolio } from "../../modules/portfolioManager";

const PortfolioForm = () => {
    const navigate = useNavigate();
    const emptyPortfolio = {
        Id: 0,
        RiskLevelId: 1,
        CashOnHand: "",
        UserId: 1,
        Description: "",

    };
    const [portfolio, setPortfolio] = useState(emptyPortfolio);
    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;
        const portfolioCopy = { ...portfolio };
        portfolioCopy[key] = value;
        setPortfolio(portfolioCopy);
    };
    const handleSave = (e) => {
        e.preventDefault();
        addPortfolio(portfolio).then(() => {
            navigate('/portfolio/${portfolioId}');
        });
    };

    const SubmitButton = () => {
        if (portfolio.RiskLevel.name && portfolio.Description) {
            return <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
        } else {
            return <Button className="btn btn-primary" disabled>Button</Button>
        };
    };
    return (
        <Form>
            <FormGroup>
                <Label for="Risk Level"> Portfolio Risk Level</Label>
                <Input type="text" name="risk level name" id="Risk Level Name" placeholder="portfolio risklevel name" value={portfolio.RiskLevel.name} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="Description"> Portfolio Description</Label>
                <Input type="text" name="Description" id="Description" placeholder="portfolio description" value={portfolio.Description} onChange={handleInputChange} />
            </FormGroup>
            <SubmitButton />
        </Form>
    )
};

export default PortfolioForm;