import { CheckUserLogged } from "@/api/Auth";

const { createContext, useState, useEffect, useContext } = require("react");

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const userData = await CheckUserLogged()
            setUser(userData)
        }catch (err) {
            setUser(null)
        }
    }
    
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

export function UseUserContext() {
    return useContext(UserContext)
}