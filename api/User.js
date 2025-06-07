import { BASE_URL } from "./config/envConfig"

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/usuario/`, {
            credentials: "include"
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar usuários")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}
export const findOneUser = async (id) => {
        try {
        const response = await fetch(`${BASE_URL}/usuario/${id}`, {
            credentials: "include",
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar usuários")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}
export const updateUser = async (id, novoUsuario) => {
    try {
        const response = await fetch(`${BASE_URL}/usuario/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoUsuario)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar usuários")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}
export const deleteUser = async (id) => {
        try {
        const response = await fetch(`${BASE_URL}/usuario/${id}`, {
            credentials: "include",
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar usuários")
        }
    } catch (error) {
        throw new Error(error.message)
    }
}
export const createUser = async (user) => {
        try {
        const response = await fetch(`${BASE_URL}/usuario/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || "Erro ao cadastrar")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}