export const getAllMessages = async () => {
    try {
        const response = await fetch('http://localhost:8080/mural_mensagem/', {
            credentials: "include"
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message || "Erro ao buscar todas as mensagens")
        }
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}