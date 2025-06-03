import { useState } from "react";
import Alert from "./LabelMessage";
import Loader from "./Loader";
import { useRouter } from "next/router";
import { CheckUserLogged, UserLogin } from "@/api/Auth";

export default function Login() {
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()


    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formResponse = new FormData(e.target);
            const credentials = Object.fromEntries(formResponse);

            const { message } = await UserLogin(credentials)

            setMessage(message + ". Redirecionando... ")
            setIsError(false)
            setTimeout(() => {
                router.push('/')
            }, 3000)
        } catch (error) {
            setMessage(error.message)
            setIsError(true)
        } finally {
            setLoading(false)
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
                            <Loader spinCollor={'black'} borderCollor={'white'} />
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
