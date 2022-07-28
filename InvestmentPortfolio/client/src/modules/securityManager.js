import { getToken } from "./authManager";

const _apiUrl = "/api/security";

export const getAllSecurity = () => {
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
                throw new Error("An error occurred retrieving security list");
            }
        });
    });
};