import { getToken } from "./authManager";

const _apiUrl = "/api/portfolio";

export const getAllPortfolios = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An error occurred retrieving portfolio");
            }
        });
    });
};

export const getPortfolioById = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("An error occurred retrieving portfolio by Id");
            }
        });
    });
};

export const addPortfolio = (portfolio) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(portfolio)
        }).then(res => {
            if (res.status === 401) {
                throw new Error("Unauthorized");
            } else if (!res.ok) {
                throw new Error("An unknown error occurred while trying to save a new portfolio.");
            }
        });
    });
};

export const updatePortfolio = (portfolio) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${portfolio.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(portfolio),
        }).then(res => {
            if (res.status === 401) {
                throw new Error("Unauthorized");
            } else if (!res.ok) {
                throw new Error("An unknown error occurred while trying to save changes to portfolio.");
            }
        });
    });
};

export const deletePortfolio = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    });
};