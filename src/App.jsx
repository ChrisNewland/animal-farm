import './App.css';
import { useEffect, useState } from 'react';

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  }, []);
  
  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080/?' + new URLSearchParams({ q })
    );
    const data = await response.json();
    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  };

  return { search, animals };
}

function App() {
  const { search, animals } = useAnimalSearch();

  return (
    <main className='App'>
      <h1>Animal Farm</h1>
      <input
        type='text'
        placeholder='Search'
        onChange={(e) => search(e.target.value)}
      />
      <ul>
        {animals &&
          animals.map((animal) => <Animal key={animal.id} {...animal} />)}
        {animals.length === 0 && 'No animals found'}
      </ul>
    </main>
  );
}

function Animal({ species, name, age }) {
  return (
    <li>
      <strong>{species}</strong> {name} {age}
    </li>
  );
}

export default App;
