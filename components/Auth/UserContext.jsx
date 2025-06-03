const { createContext, useState, useEffect, useContext } = require("react");

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user_profile')

        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = async (credentials) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao logar");
            }
            return data;
        } catch (error) {
            throw new Error(error.message || "Erro ao logar");
        }
    };
    const checkLogged = async (token) => {
        try {
            const response = await fetch("http://localhost:8080/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao logar");
            }
            return data;
        } catch (error) {
            throw new Error(error.message || "Erro ao localizar perfil");
        }
    };

    return (
        <UserContext.Provider value={{ user, token, login, checkLogged }}>
            {children}
        </UserContext.Provider>
    )
}

export function UseUserContext() {
    return useContext(UserContext)
}