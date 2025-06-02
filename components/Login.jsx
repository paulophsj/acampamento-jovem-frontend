import { useContext, useEffect, useState } from "react";
import Alert from "./LabelMessage";
import Loader from "./Loader";
import { UserContext } from "./User/UserContext";

export default function Login() {
    const { logged, setLogged } = useContext(UserContext)
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);


    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formResponse = new FormData(e.target);
        const formObject = Object.fromEntries(formResponse);
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formObject),
            });

            const data = await response.json();
            setMessage(data.message || "Login realizado");
            setIsError(!response.ok);
            await definirUsuario(data.access_token)
        } catch (error) {
            setMessage(error.message || "Erro inesperado");
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };
    const definirUsuario = async (access_token) => {
        try {
            const response = await fetch('http://localhost:8080/auth/profile', {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
            const data = await response.json()
            setLogged({
                id: data.sub,
                email: data.email
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm">
                <form
                    onSubmit={formSubmit}
                    className="bg-white text-gray-900 p-8 rounded-2xl shadow-lg space-y-6"
                >
                    <h2 className="text-2xl font-bold text-center">Login</h2>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1 font-medium">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-1 font-medium">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>
                    {
                        loading ? (
                            <Loader />
                        ) : (
                            <button
                                type="submit"
                                className="w-full cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Entrar
                            </button>

                        )
                    }
                </form>
                <Alert isError={isError} message={message} />
            </div>
        </div>
    );
}
