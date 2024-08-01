import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI('AIzaSyAlB8RBlZuj9ohRVcgUJdUdG-GTjdt6VO0');
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const [recipe, setRecipe] = useState('');
  
  async function getRecipe() {
    setLoading(true);
    const prompt = `Generate a recipe for ${search}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setRecipe(text);
    setLoading(false);
  }
  
  const [search, setSearch] = useState('');
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleClick = () => {
    getRecipe();
  }

  return (
    <div className="App">
      <h1 className="header">Recipe Maker</h1>
      <div className="search-container">
        <input
          className="search-input"
          placeholder='Enter an ingredient or dish'
          onChange={(e) => handleChangeSearch(e)}
        />
        <button className="search-button" onClick={() => handleClick()}>
          Get Recipe
        </button>
      </div>
      {
        loading && search !== '' ?
          <p className="loading-text">Generating recipe...</p>
          :
          <div className="recipe-container">
            <p className="recipe-text">{recipe}</p>
          </div>
      }
    </div>
  );
}

export default App;
