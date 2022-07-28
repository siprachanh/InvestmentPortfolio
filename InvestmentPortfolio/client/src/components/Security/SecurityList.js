import React, { useEffect, useState } from "react";
import { getAllSecurity } from "../../modules/securityManager";
import { Link, useNavigate } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const SecurityList = () => {
    const navigate = useNavigate()
    const [security, setSecurity] = useState([]);

    const getSecurity = () => {
        getAllSecurity().then(setSecurity);
    };

    useEffect(() => {
        getSecurity();
    }, []);

    return (
        <div className="container">
            <Link to="/security/new">Create New Security</Link>
            <div className="row justify-content-center">
                <ListGroup>
                    {security.map((security) => {
                        return (
                            <ListGroupItem key={security.id}>
                                Security Id {security.id} is a {security.name} of Type {security.typeId} worth ${security.price} per unit<Link to={`/security/edit/${security.id}`}>Edit</Link>{" "}
                                <Link to={`/security/delete/${security.id}`}>Delete</Link>
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
}

export default SecurityList;
//SecurityId, s.Name AS SecurityName, s.TypeId As SecurityTypeId, s.Price