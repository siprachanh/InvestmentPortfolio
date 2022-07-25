import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getAllPortfolios } from "../../modules/portfolioManager";
import Portfolio from "./Portfolio";
import { Link } from "react-router-dom";
//display 

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const getPortfolios = () => {
        getAllPortfolios()
            .then(setPortfolios)
    };


    useEffect(() => {
        getPortfolios();
    }, []);


    return (
        <div className="container">
            <Link to="/portfolio/add">Add a Portfolio</Link>
            <div className="row justify-content-center">
                <ListGroup>
                    {portfolios.map((p) => {
                        if (p.id !== "No Portfolio") {
                            return (
                                <ListGroupItem key={p.id}>
                                    <Portfolio portfolio={portfolio} />
                                    {p.id} <Link to={'/portfolio/edit/${p.id}'}>Edit</Link>{" "}
                                    <Link to={'portfolio/delete/${p.id}'}>Delete</Link>
                                    <Link to={'/portfolios/${portfolio.id}'}>Details</Link>
                                </ListGroupItem>
                            );
                        } else {
                            return (
                                <ListGroupItem key={p.id}>
                                    {p.id} <p>Default Portfolio</p>
                                </ListGroupItem>
                            );
                        }
                    })}
                </ListGroup>
            </div>
        </div>
    );
};



export default PortfolioList;