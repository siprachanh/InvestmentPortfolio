import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getAllPortfolioPurchases } from "../../modules/portfolioPurchaseManager";
import PortfolioPurchase from "./PortfolioPurchase";
import { Link } from "react-router-dom";

//display list of portfolio; when component loads, it will call the getAllPort fn, set the 
//state of the portfolios array and rerender to display list 

const PortfolioPurchaseList = () => {
    const [portfolioPurchases, setPortfolioPurchases] = useState([]);
    const getPortfolioPurchases = () => {
        getAllPortfolioPurchases()
            .then(setPortfolioPurchases)
    };


    useEffect(() => {
        getPortfolioPurchases();
    }, []);


    return (
        <div className="container">
            <Link to="/newportfolio">Add a New Portfolio Purchase</Link>
            <div className="row justify-content-center">
                <ListGroup>
                    {portfolioPurchases.map((portfolioPurchase) => {
                        if (portfolioPurchase.id !== "No Portfolio Purchase") {
                            return (
                                <ListGroupItem key={portfolioPurchase.id}>
                                    <PortfolioPurchase portfolioPurchase={portfolioPurchase} />
                                    {portfolioPurchase.id} <Link to={'/portfoliopurchase/Edit/${portfolioPurchase.id}'}>Edit</Link>{" "}
                                    <Link to={'portfoliopurchase/delete/${portfolioPurchase.id}'}>Delete</Link>
                                    <Link to={'/portfoliopurhcases/${portfolioPurchase.id}'}>Details</Link>
                                </ListGroupItem>
                            );
                        } else {
                            return (
                                <ListGroupItem key={portfolioPurchase.id}>
                                    {portfolioPurchase.id} <p>Default Portfolio</p>
                                </ListGroupItem>
                            );
                        }
                    })}
                </ListGroup>
            </div>
        </div>
    );
};



export default PortfolioPurchaseList;