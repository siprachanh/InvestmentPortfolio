import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, Input, Label, Button, Form } from "reactstrap";
import { addPortfolio, updatePortfolio } from "../../modules/portfolioManager";
import { getAllRiskLevels } from "../../modules/riskLevelManager";

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
    //sets state of portfolio to object to input fields
    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;
        const portfolioCopy = { ...portfolio };
        portfolioCopy[key] = value;
        setPortfolio(portfolioCopy);
    };
    //get all of the risklevels for dropdown selection 
    const [riskLevels, setRiskLevels] = useState([]);

    //loads risklevel data for portfolio and updates state
    useEffect(() => {
        getAllRiskLevels().then((riskLevels) => {
            setRiskLevels(riskLevels)
        })
    }, [])

    const handleSave = (e) => {
        //prevent the browser from submitting the form
        // e.preventDefault();

        addPortfolio(portfolio).then(() => {
            // navigate('/portfolio/${portfolioId}');
            //Navigate user back to the portfolio/dashboard route
            navigate("/portfolio");
        });
    };

    return (
        <Form>
            <FormGroup>
                <Label for="risk level id"> Portfolio Risk Level</Label>
                <Input type="select" value={portfolio.riskLevelId} name="riskLevelId" id="riskLevelId" placeholder="portfolio risklevel name"
                    onChange={handleInputChange}
                    className="form-select">
                    <option value="0"> Select a risk level</option>
                    {riskLevels.map((risklevel) => (
                        <option key={risklevel.id} value={risklevel.id}>
                            {risklevel.name}
                        </option>
                    ))}

                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="Risk Level"> Portfolio Cash On Hand ($): </Label>
                <Input type="number" name="cashOnHand" id="cashOnHand" placeholder="portfolio cash on hand"
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
