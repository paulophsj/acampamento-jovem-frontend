import { CheckUserLogged } from "@/api/Auth";

const { createContext, useState, useEffect, useContext } = require("react");

const UserContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        setLoad(true)
        try {
            const userData = await CheckUserLogged()
            setUser(userData)
        }catch (err) {
            setUser(null)
        }
        finally{
            setLoad(false)
        }
    }
    
    return (
        <UserContext.Provider value={{ user, load, checkAuth }}>
            {children}
        </UserContext.Provider>
    )
}

export function UseUserContext() {
    return useContext(UserContext)
}