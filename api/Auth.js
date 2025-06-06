export const UserLogin = async (credentials) => {
    try {
        const response = await fetch("https://acampamento-jovem-backend.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao logar");
        }
        document.cookie = `access_token=${data.access_token}; path=/; max-age=60; secure; samesite=None; HttpOnly`;
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
export const CheckUserLogged = async () => {
    try {
        const response = await fetch("https://acampamento-jovem-backend.onrender.com/auth/profile", {
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