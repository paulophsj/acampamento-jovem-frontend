import Link from "next/link";

export default function UsuarioCard({ usuario, deletarUsuario }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{usuario.nome}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {usuario.tamanhoCamisa}
            </span>
            <Link href={{pathname: `/user/${usuario.id}`}} className="text-white transition-colors hover:bg-yellow-500 cursor-pointer bg-yellow-300 p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </Link>
            <button onClick={() => deletarUsuario(usuario.id)} className="text-white transition-colors hover:bg-red-700 cursor-pointer bg-red-500 p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Informações de Contato</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Telefone:</span> {usuario.telefoneUsuario}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Grupo:</span> {usuario.nomeGrupo || 'Não informado'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Rede:</span> {usuario.rede || 'Não informado'}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Responsável</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Nome:</span> {usuario.nomeResponsavel}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Parentesco:</span> {usuario.parentescoResponsavel}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Telefone:</span> {usuario.telefoneResponsavel}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Informações de Saúde</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-3 rounded-lg">
              <h4 className="font-medium text-red-800">Alergias</h4>
              <p className="text-red-600 mt-1">
                {usuario.temAlergia || 'Nenhuma alergia informada'}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-800">Medicamentos</h4>
              <p className="text-yellow-600 mt-1">
                {usuario.temMedicamento || 'Nenhum medicamento informado'}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <h4 className="font-medium text-purple-800">Medicamentos Controlados</h4>
              <p className="text-purple-600 mt-1">
                {usuario.temMedicamentoControlado || 'Nenhum medicamento controlado informado'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}