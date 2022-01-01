import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Recipe from "./Recipe";
import Select from "react-select";
function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const APP_ID = "4574d7ab";
  const APP_KEY = "96792a5f0d4daeaab117939b40988ca6";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const getRecipe = async () => {
    const response = await axios.get(url);
    setRecipes(response.data.hits);
    console.log(response.data.hits);
  };
  useEffect(() => {
    getRecipe();
  }, [query]);
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  };
  const UpdateSelectedOption = (e) => {
    setQuery(e["value"]);
  };

  const options = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Snack", label: "Snack" },
    { value: "Teatime", label: "Teatime" },
    { value: "Alcohol-cocktail", label: "Alcohol-cocktail" },
    { value: "Bread", label: "Bread" },
    { value: "Biscuits and cookies", label: "Biscuits and cookies" },
    { value: "Drinks", label: "	Drinks" },
    { value: "	Desserts", label: "	Desserts" },
    { value: "	Egg", label: "	Egg" },
    { value: "Main course", label: "Main course" },
    { value: "		Omelet", label: "		Omelet" },
    { value: "	Pancake", label: "	Pancake" },
    { value: "	Preps", label: "	Preps" },
    { value: "	Preserve", label: "	Preserve" },
    { value: "	Salad", label: "	Salad" },
    { value: "		Sandwiches", label: "		Sandwiches" },
    { value: "	Soup", label: "	Soup" },
    { value: "		Starter", label: "		Starter" },
    { value: "	American", label: "	American" },
    { value: "	Asian", label: "	Asian" },
    { value: "	British  ", label: "	British" },
    { value: "	Chinese", label: "	Chinese" },
    { value: "	French", label: "	French" },
    { value: "	Indian", label: "	Indian" },
    { value: "	Italian", label: "	Italian" },
    { value: "	Japanese", label: "	Japanese" },
    { value: "	Mexican    ", label: "	Mexican" },
  ];
  const customStyles = {
    control: (_, { selectProps: { width }}) => ({
      width: width
    })};
  return (
    <div className="App">
      <div className="header">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="/">
              <h2>Food Recipe</h2>
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <h5>Home</h5>
                </a>
              </li>
              <a className="nav-link active" aria-current="page" href="/">
                <h5>Food Categories</h5>
              </a>

              <Select
                styles={customStyles}
                onChange={UpdateSelectedOption}
                options={options}
                width='200px'
              />
            </ul>

            <div
              className="justify-content-center d-flex"
              id="navbarSupportedContent"
            >
              <form onSubmit={updateQuery} className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={updateSearch}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
          <div className="container mt-5">
            <div className="row justify-content-md-center row-cols-3">
              {recipes.map((recipe) => (
                <div className="col">
                  <Recipe
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                    ingredients={recipe.recipe.ingredients}
                    url={recipe.recipe.url}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
