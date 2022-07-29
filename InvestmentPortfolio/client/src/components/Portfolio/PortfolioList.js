import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getAllPortfolios } from "../../modules/portfolioManager";
import Portfolio from "./Portfolio";
import { Link } from "react-router-dom";

//display list of portfolio; when component loads, it will call the getAllPort fn, set the 
//state of the portfolios array and rerender to display list 

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
            <Link to="/newportfolio">Add a New Portfolio</Link>
            <div className="row justify-content-center">
                <ListGroup>
                    {portfolios.map((portfolio) => {
                        if (portfolio.id !== "No Portfolio") {
                            return (
                                <ListGroupItem key={portfolio.id}>
                                    <Portfolio portfolio={portfolio} />
                                    {portfolio.id} <Link to={`/portfolio/Edit/${portfolio.id}`}>Edit</Link>{""}
                                </ListGroupItem>
                            );
                        } else {
                            return (
                                <ListGroupItem key={portfolio.id}>
                                    {portfolio.id} <p>Default Portfolio</p>
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
//the save fn is invokded
//a new obj is created and using values from the component's state
//the update fn is invoked
//a PUT request is made to the server
//an UPDATE statement is run in sql server
// the web browser is redirected back to the Dashboard