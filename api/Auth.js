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
        document.cookie = `access_token=${data.token_temporario}; path=/; max-age=60; secure; samesite=none`;
        /**
         * A vercel não aceita ler um cookie enviado por um dominio externo por motivos de segurança.
         * Por isso, ao usuário realizar o login, o backend retorna o valor do cookie no objeto da requisição,
         * eu guardo em um cookie definido manualmente pelo document.cookie, e após a verificação do middleware, caso o
         * cookies.get("access_token") retorne undefined, ele cria um novo cookie chamado access_token com o valor desse cookie temporario
         * e apaga o cookie temporário.
         * 
         * Dessa forma o Next - Vercel comecará a ler o cookie access_token e enviar nas requisições seguintes
         * porque o domínio de quem definiu o cookie foi o próprio lado do cliente.
         * 
         */
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