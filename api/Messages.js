import { BASE_URL } from "./config/envConfig"

export const getAllMessagesForAdmin = async () => {
    try {
        const response = await fetch(`${BASE_URL}/mural_mensagem/`, {
            credentials: "include"
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar todas as mensagens")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}
export const getAllMessagesForUser = async () => {
    try {
        const response = await fetch(`${BASE_URL}/mural_mensagem/find`)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar todas as mensagens")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}
export const updateMessages = async (id, isActive) => {
    try {
        const response = await fetch(`${BASE_URL}/mural_mensagem/${id}`, {
            credentials: "include",
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(isActive)
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || "Erro ao atualizar mensagem")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}
export const postMessages = async (message) => {
    try {
        const response = await fetch(`${BASE_URL}/mural_mensagem/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message || "Erro ao cadastrar mensagem")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}