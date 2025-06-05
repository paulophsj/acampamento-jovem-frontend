import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { findOneUser, updateUser } from '@/api/User';
import Loader from '@/components/Loader';
import Alert from '@/components/LabelMessage';

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para cada campo do formulário
  const [formData, setFormData] = useState({
    nome: '',
    telefoneUsuario: '',
    nomeGrupo: '',
    rede: '',
    tamanhoCamisa: '',
    nomeResponsavel: '',
    parentescoResponsavel: '',
    telefoneResponsavel: '',
    temAlergia: '',
    temMedicamento: '',
    temMedicamentoControlado: ''
  });

  // Carrega os dados do usuário
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await findOneUser(id)
        setUser(response);
        setFormData(response); // Preenche o formulário com os dados do usuário
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Atualiza o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Envia os dados atualizados
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(id, formData)
      alert("Usuário atualizado com sucesso!")
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader spinCollor={'black'} borderCollor={'white'}/>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Usuário - ID: {id}</h1>
      {
        error ? (
            <Alert isError={true} message={error}/>
        ) : (
            ""
        )
      }
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Informações Pessoais</h2>
            <div>
              <label className="block mb-1">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Telefone</label>
              <input
                type="tel"
                name="telefoneUsuario"
                value={formData.telefoneUsuario}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Tamanho da Camisa</label>
              <select
                name="tamanhoCamisa"
                value={formData.tamanhoCamisa}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione</option>
                <option value="PP">PP</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
              </select>
            </div>
          </div>

          {/* Informações de Grupo */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Informações de Grupo</h2>
            <div>
              <label className="block mb-1">Grupo</label>
              <input
                type="text"
                name="nomeGrupo"
                value={formData.nomeGrupo}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Rede</label>
              <input
                type="text"
                name="rede"
                value={formData.rede}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Informações de Saúde */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Informações de Saúde</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Alergias</label>
              <textarea
                name="temAlergia"
                value={formData.temAlergia}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div>
              <label className="block mb-1">Medicamentos</label>
              <textarea
                name="temMedicamento"
                value={formData.temMedicamento}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div>
              <label className="block mb-1">Medicamentos Controlados</label>
              <textarea
                name="temMedicamentoControlado"
                value={formData.temMedicamentoControlado}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Informações do Responsável */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Responsável</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Nome do Responsável</label>
              <input
                type="text"
                name="nomeResponsavel"
                value={formData.nomeResponsavel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Parentesco</label>
              <input
                type="text"
                name="parentescoResponsavel"
                value={formData.parentescoResponsavel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Telefone do Responsável</label>
              <input
                type="tel"
                name="telefoneResponsavel"
                value={formData.telefoneResponsavel}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 cursor-pointer"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}