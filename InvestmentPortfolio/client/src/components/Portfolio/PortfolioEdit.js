import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePortfolio, getPortfolioById } from "../../modules/portfolioManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const EditPortfolio = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState({
        Id: 0,
        RiskLevelId: 1,
        CashOnHand: 0,
        UserId: 1,
        Description: "",
    });

    useEffect(() => {
        getPortfolioById(id).then(setPortfolio);
    }, [id]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;

        const portfolioCopy = { ...portfolio };

        portfolioCopy[key] = value;
        setPortfolio(portfolioCopy);
    };
    const handleSave = (e) => {
        e.preventDefault();
        updatePortfolio(portfolio).then(() => {
            navigate("/portfolios");
        });
    };
    return (
        <Form>
            <FormGroup>
                <Label for="risklevelId">RiskLevelId</Label>
                <Input type="select" value={portfolio.riskLevelId} name="risk level id" id="riskLevelId" placeholder="portfolio risklevel name"

                    onChange={handleInputChange}
                    className="form-control">
                    <option value="0"> Select a risk level</option>
                    {portfolio.map((risklevel) => (
                        <option key={risklevel.id} value={risklevel.id}>
                            {risklevel.name}
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
export default EditPortfolio;