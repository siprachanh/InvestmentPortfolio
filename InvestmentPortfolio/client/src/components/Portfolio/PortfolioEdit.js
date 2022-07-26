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
        CashOnHand: "",
        UserId: 1,
        Description: "",
    });

    useEffect(() => {
        getPortfolioById(id).then(setPortfolio);
    }, [id]);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const portfolioCopy = { ...portfolio };

        portfolioCopy[key] = value;
        setPortfolio(portfolioCopy);
    };
    const handleSave = (e) => {
        e.preventDefault();
        updatePortfolio(portfolio).then(() => {
            navigate("/");
        });
    };
    return (
        <Form>
            <FormGroup>
                <Label for="risklevelId">RiskLevelId</Label>
                <Input type=
            </FormGroup>
        </Form>
    )
