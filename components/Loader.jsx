export default function Loader({spinCollor, borderCollor}) {
    return (
        <div className={`flex items-center justify-center bg-${borderCollor}`}>
            <div className={`w-5 h-5 border-2 border-${spinCollor} border-t-transparent rounded-full animate-[spin_0.5s_linear_infinite]`}></div>
        </div>
    );
}
