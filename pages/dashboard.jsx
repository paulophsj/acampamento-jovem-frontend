import Messages from "@/components/Messages/Messages";
import Usuarios from "@/components/Usuario/Usuarios";

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Coluna de Mensagens */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto border-r border-gray-200">
        <Messages />
      </div>
      
      {/* Coluna de Usuários */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto">
        <Usuarios />
      </div>
    </div>
  );
}