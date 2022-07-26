import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Button, Form } from "reactstrap";
import { addPortfolio, updatePortfolio } from "../../modules/portfolioManager";

const PortfolioForm = ({ getPortfolio }) => {
    const navigate = useNavigate();
    const emptyPortfolio = {
        id: 0,
        riskLevelId: 1,
        cashOnHand: 0,
        userId: 1,
        description: "",

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
            // navigate('/portfolio/${portfolioId}');
            //Navigate user back to the home/dashboard route
            navigate("/newportfolio");
        });
    };


    return (
        <Form>
            <FormGroup>
                <Label for="risk level id"> Portfolio Risk Level</Label>
                <Input type="select" value={portfolio.riskLevelId} name="risk level id" id="riskLevelId" placeholder="portfolio risklevel name"

                    onChange={handleInputChange}
                    className="form-control">
                    <option value="0"> Select a risk level</option>
                    {portfolio.map(singlePortfolio => (
                        <option key={singlePortfolio.riskLevelId} value={singlePortfolio.riskLevelId}>
                            {singlePortfolio.riskLevelId}
                        </option>
                    ))}

                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="Risk Level"> Portfolio Cash On Hand ($): </Label>
                <Input type="number" name="cash on hand" id="cashOnHand" placeholder="portfolio cash on hand"
                    value={portfolio.cashOnHand}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="description"> Portfolio Description</Label>
                <Input type="text" name="description" id="description" placeholder="portfolio description"
                    value={portfolio.description}
                    onChange={handleInputChange} />
            </FormGroup>

            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>

        </Form >
    );
};

export default PortfolioForm;
