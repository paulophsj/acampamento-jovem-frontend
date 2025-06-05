import { useState, useEffect } from 'react';
import { UseUserContext } from "../Auth/UserContext";
import { deleteUser, getAllUsers } from "@/api/User";
import UsuarioCard from "./UsuarioCard";
import Loader from "../Loader";
import Alert from '../LabelMessage';

export default function Usuarios() {
  const { user } = UseUserContext();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null)

  const fetchUsuarios = async () => {
    try {
      const response = await getAllUsers();
      setUsuarios(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const deletarUsuario = async (id) => {
  try {
    await deleteUser(id)
    setSuccessMsg("Usuário excluído com sucesso!")
    fetchUsuarios()
  } catch (error) {
    setError(error.message)
  }
}

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
    <div className="min-h-full bg-white text-gray-900 p-4 md:p-8">
      <header className="mb-8 flex justify-between">
        <div>
        <h1 className="text-2xl md:text-3xl font-bold">Lista de Usuários</h1>
        <p className="text-gray-600">Bem-vindo, {user.email || 'usuário'}!</p>
        </div>
        <aside>
          {
            successMsg ? (
              <Alert isError={false} message={successMsg}/>
            ) : error ? (
              <Alert isError={true} message={error} />
            ) : (
              ""
            )
          }
        </aside>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader spinCollor={'black'} borderCollor={'white'} />
        </div>
      ) : usuarios.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum usuário cadastrado.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {usuarios.map(usuario => (
            <UsuarioCard key={usuario.id} usuario={usuario} deletarUsuario={deletarUsuario} />
          ))}
        </div>
      )}
    </div>
  );
}