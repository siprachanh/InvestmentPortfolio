import { getToken } from "./authManager";

const _apiUrl = "/api/portfolio";

export const getAllPortfolios = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An error occurred retrieving portfolios");
            }
        });
    });
};

export const addPortfolio = (portfolio) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolio),
    });
};
