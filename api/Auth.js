import { BASE_URL } from "./config/envConfig";

export const UserLogin = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao logar");
        }
        document.cookie = `first_code=${data.access_token}; path=/; max-age=300; secure; samesite=none`;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
export const CheckUserLogged = async () => {
    try {
        const response = await fetch(`${BASE_URL}/auth/profile`, {
            credentials: "include"
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao logar");
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};