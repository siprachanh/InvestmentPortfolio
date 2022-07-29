import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePortfolio, getPortfolioById } from "../../modules/portfolioManager";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { getAllRiskLevels } from "../../modules/riskLevelManager";

const EditPortfolio = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [portfolio, portfolioUpdate] = useState({});

    const [riskLevels, setRiskLevels] = useState([]);

    useEffect(() => {
        getPortfolioById(id).then(portfolioUpdate);
    }, []);

    useEffect(() => {
        getAllRiskLevels().then((riskLevels) => {
            setRiskLevels(riskLevels)
        })
    }, [])

    const handleInputChange = (e) => {
        const value = e.target.value;
        const key = e.target.id;

        const portfolioCopy = { ...portfolio };

        portfolioCopy[key] = value;
        portfolioUpdate(portfolioCopy);
    };
    const handleEdit = (e) => {
        const editedPortfolio = {
            id: id,
            riskLevelId: portfolio.riskLevelId,
            cashOnHand: portfolio.cashOnHand,
            userId: portfolio.userId,
            description: portfolio.description,
        }
        updatePortfolio(editedPortfolio).then(() => {
            navigate("/");
        });
    };
    return (
        <Form>
            <FormGroup>
                <Label for="risklevelId">RiskLevelId</Label>
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

            <Button className="btn btn-primary" onClick={handleEdit}>Submit</Button>

        </Form >
    );
};
export default EditPortfolio;