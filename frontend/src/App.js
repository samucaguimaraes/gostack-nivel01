import React, { useEffect, useState }  from 'react';
import api from './services/api';

import Header from './components/Header';

function App(){
  const [repositories, setRepositories]   = useState([]);
    
  useEffect( () => {
    api.get('/repositories').then( response => {
        setRepositories(response.data);
      });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories',{
      url: "https://github.com/samucaguimaraes/gostack-conceitos-node",
      title: "Projeto 02dasdas",
      techs: ["Node","React"],
      likes: 0
    });
    
    setRepositories([...repositories, response.data]);
  }

  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
              {repository.title+repository.id}

              <button onClick="">
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
