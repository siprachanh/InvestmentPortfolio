import { getToken } from "./authManager";

const _apiUrl = "/api/portfoliopurchase";

export const getAllPortfolioPurchases = () => {
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
                throw new Error("An error occurred retrieving portfolio purchases");
            }
        });
    });
};