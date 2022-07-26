import React, { useEffect, useState } from "react";
import { getAllRiskLevels } from "../../modules/riskLevelManager";
import { Link, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const RiskLevelList = () => {
    const navigate = useNavigate()
    const [riskLevels, setRiskLevels] = useState([]);

    const getRiskLevels = () => {
        getAllRiskLevels().then(riskLevels => setRiskLevels(riskLevels));
    };

    useEffect(() => {
        getRiskLevels();
    }, []);

    return (
        <div className="container">
            <Link to="/risklevels/new">Create New RiskLevel</Link>
            <div className="row justify-content-center">
                <ListGroup>
                    {riskLevels.map((riskLevel) => {
                        return (
                            <ListGroupItem key={riskLevel.id}>
                                {riskLevel.id} : {riskLevel.name} : {riskLevel.description} <Link to={`/risklevels/edit/${riskLevel.id}`}>Edit</Link>{" "}
                                <Link to={`/risklevels/delete/${riskLevel.id}`}>Delete</Link>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
}

export default RiskLevelList;
