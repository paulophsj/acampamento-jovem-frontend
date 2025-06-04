import { getAllMessages } from "@/api/Messages";
import { UseUserContext } from "@/components/Auth/UserContext";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user } = UseUserContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getAllMessages()
        setMessages(response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error(err);
      }
    };

    fetchMessages();
  }, []);

  const toggleApproval = (e) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isActive: !msg.isActive } : msg
    ));
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setMessages(messages.map(msg => ({ ...msg, isActive: newSelectAll })));
  };

  const saveApprovals = async () => {
    try {
      // Simulação de salvamento
      console.log("Mensagens isActives:", messages.filter(msg => msg.isActive));
      alert("Aprovações salvas com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar aprovações:", err);
      alert("Erro ao salvar aprovações");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso não autorizado</h1>
          <p>Você precisa estar logado para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Moderação de Mensagens</h1>
        <p className="text-gray-600">Bem-vindo, {user.email || 'usuário'}!</p>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="h-4 w-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
              />
              <label className="ml-2 text-sm text-gray-900">Selecionar todas</label>
            </div>
            <button
              onClick={saveApprovals}
              className="bg-gray-900 cursor-pointer text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Salvar Aprovações
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Aprovar
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Mensagem
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages.map((message) => (
                  <tr key={message.id} className={message.isActive ? "bg-green-50" : ""}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={message.isActive}
                        onChange={() => toggleApproval(message.id)}
                        className="h-4 w-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{message.nome}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{message.mensagem}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {message.isActive ? (
                        <span className="text-green-600">Autorizada</span>
                      ) : (
                        <span className="text-red-600">Não autorizada</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {messages.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhuma mensagem encontrada.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}