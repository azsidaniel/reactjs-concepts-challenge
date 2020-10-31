import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      owner: "Daniel Silva",
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    try {
      console.log(id)
      await api.delete(`repositories/${id}`);
      const repositoryIndex = repositories.find(repository => repository.id === id);
      const newArr = repositories;
      newArr.splice(repositoryIndex, 1);
      console.log(newArr);
      setRepositories([...newArr]);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository =>
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
