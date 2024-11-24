import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import ActionButtons from "../formFields/ActionButtons";

const EmpresaList = () => {
  // Estado para armazenar a lista de empresas
  const [empresas, setEmpresas] = useState([]);

  // Estado para controlar se o popup está aberto ou fechado
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Estado para armazenar a empresa que está sendo editada ou null se for uma nova adição
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);

  // 1. Carregar empresas do backend quando o componente é montado
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/empresas");
        setEmpresas(response.data); // Atualiza o estado com os dados recebidos do backend
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    fetchEmpresas();
  }, []);

  // Função para abrir o popup de adição de nova empresa
  const openAddPopup = () => {
    setEmpresaSelecionada(null);
    setIsPopupOpen(true);
  };

  // Função para abrir o popup de edição de empresa
  const openEditPopup = (empresa) => {
    setEmpresaSelecionada(empresa);
    setIsPopupOpen(true);
  };

  // Função para salvar (adicionar ou editar) uma empresa
  const handleSaveEmpresa = async (novaEmpresa) => {
    try {
      if (empresaSelecionada) {
        // Editando uma empresa existente
        const response = await axios.put(
          `http://localhost:5000/api/empresas/${empresaSelecionada._id}`,
          novaEmpresa
        );
        // Atualiza a lista de empresas com a empresa editada
        setEmpresas((prevEmpresas) =>
          prevEmpresas.map((empresa) =>
            empresa._id === empresaSelecionada._id ? response.data : empresa
          )
        );
      } else {
        // Adicionando uma nova empresa
        const response = await axios.post(
          "http://localhost:5000/api/empresas",
          novaEmpresa
        );
        // Adiciona a nova empresa à lista de empresas
        setEmpresas((prevEmpresas) => [...prevEmpresas, response.data]);
      }
      setIsPopupOpen(false); // Fecha o popup após salvar
    } catch (error) {
      console.error("Erro ao salvar a empresa:", error);
    }
  };

  return (
    <div>
      <h1>Lista de Empresas</h1>

      {/* Mapeia a lista de empresas para exibir cada uma */}
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa._id}>
            {empresa.nome} - Nota: {empresa.nota}
            <p>{empresa.descricao}</p>
            <ActionButtons
              onAddClick={openAddPopup}
              onEditClick={() => openEditPopup(empresa)}
            />
          </li>
        ))}
      </ul>

      {/* Popup para adicionar ou editar uma empresa */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSaveEmpresa}
        empresaData={empresaSelecionada}
      />
    </div>
  );
};

export default EmpresaList;
