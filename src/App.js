import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories');

      setRepositories(response.data);
    }
    loadRepositories();
  }, [setRepositories]);

  async function handleAddRepository() {
    try {
      const title = `Novo repositório ${Date.now()}`;
      const newRepository = {
        title,
        url: `http://${title}`,
        techs: [
          'Node js',
          'React js',
          'React Native',
        ],
        likes: 0,
      };

      await api.post('/repositories', newRepository);
      setRepositories([...repositories, newRepository]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const array = repositories.filter(repository => repository.id !== id);

      setRepositories(array);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title} 
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
