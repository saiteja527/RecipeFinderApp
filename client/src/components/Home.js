import React, { useState, useEffect } from 'react';
import './Home.css';
import main_image from '../assets/main-image.png';
import noresults_image from '../assets/noresults-img.png';
import ReactLoading from 'react-loading';

const Home = ({ setItems }) => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(16);

  // API keys for fetching recipes from Edamam API
  const app_id = process.env.REACT_APP_APP_ID;
  const app_key = process.env.REACT_APP_APP_KEY;

  //Fetching the data from the api
  useEffect(() => {
    if (query) {
      const fetchRecipes = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}&cuisineType=Indian`
          );
          const data = await response.json();
          if (data.hits) {
            setRecipes(data.hits);
          } else {
            setRecipes([]);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching recipes:', error);
          setLoading(false);
        }
      };

      fetchRecipes();
    }
  }, [query, app_id, app_key]);


  useEffect(() => {
    setItems(recipes);
  }, [recipes, setItems]);

  //search for recipes
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value.trim();
    if (searchQuery) {
      setQuery(searchQuery);
      setCurrentPage(1);
    }
  };

  // page Numbers 
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.length ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-container">
      <section className="header">
        <div className="title-wrapper">
          <h1 className="sweet-title">
            <span data-text="Recipe">RECIPE</span>
            <span data-text="Finder">FINDER</span>
          </h1>
        </div>
      </section>
      <form onSubmit={handleSearch} className="search-form">
        <input type="text" name="query" placeholder="Search for a recipe..." />
        <button type="submit">
          <i className="fas fa-search"></i> Search
        </button>
      </form>

      {/* intialImage */}
      {!query && (
        <div className="initial-image-container">
          <img 
            src={main_image} 
            alt="Search for a recipe" 
            className="initial-image" 
          />
        </div>
      )}

      {/* Loading effect and Results */}
      {query && (
        loading ? (
          <>
            <ReactLoading className='loading' type={'bars'} color={'#ffffff'} height={'50px'} width={'50px'} />
            <p style={{ color: "white" }}>Loading recipes...</p>
          </>
        ) : (
          <div>
            {currentRecipes.length > 0 ? (
              <div className="recipes-grid">
                {currentRecipes.map((recipe, index) => (
                  <div key={index} className="recipe-card">
                    <h2>{recipe.recipe.label}</h2>
                    <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                    <p>CuisineType: {recipe.recipe.cuisineType.join(', ')}</p>
                    <p>MealType: {recipe.recipe.mealType}</p>
                    <p>DishType: {recipe.recipe.dishType}</p>
                    <p>Diet: {recipe.recipe.dietLabels.length > 0 ? recipe.recipe.dietLabels.join(', ') : 'Healthy'}</p>
                    <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results-image-container">
                <img 
                  src={noresults_image} 
                  alt="No results found" 
                  className="no-results-image" 
                />
              </div>
            )}

            {/* Page Layout  */}
            <div className="pagination">
              {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, i) => (
                <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Home;
