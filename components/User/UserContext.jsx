import { createContext, useState } from "react";

export const UserContext = createContext()

export function UserProvider({ children }) {
    const [logged, setLogged] = useState({
        id: null,
        email: null
    })

    return (
        <UserContext.Provider value={{ logged, setLogged }}>
            {children}
        </UserContext.Provider>
    )
}

