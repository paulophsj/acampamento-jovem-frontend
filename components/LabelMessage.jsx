export default function Alert({ isError, message }) {
    if (!message) return null;

    return (
        <div className={`w-full max-w-md mx-auto mt-4 p-4 rounded-lg shadow-md 
            ${isError ? "bg-red-100 text-red-800 border border-red-400" : "bg-green-100 text-green-800 border border-green-400"}`}>
            <p className="text-sm font-medium text-center">
                {message}
            </p>
        </div>
    );
}
