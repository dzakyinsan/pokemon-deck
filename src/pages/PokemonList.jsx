import React, { useState, useEffect } from "react";
import "./pages.css";
import CardPokemon from "./../components/CardPokemon";
import Loading from "./../assets/loading2.gif";
import Logo from "./../assets/logo.png";

function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  useEffect(() => {
    setTimeout(() => {
      getAllPokemons();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);
    if (data) {
      setAllPokemons((currentData) => [...currentData, ...data.results]);
    }
  };

  if (!allPokemons.length) {
    return (
      <div className="loading-page">
        <img src={Loading} alt="loading" />
        <p>
          <strong>Loading ...</strong>
        </p>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-center">
        <img src={Logo} alt="Logo" height="250px" />
      </h1>
      <div className="row">
        {allPokemons?.map((pokemon) => (
          <CardPokemon pokemon={pokemon} />
        ))}
      </div>
      <div className="d-flex justify-content-center pb-4">
        <div className="load-more" onClick={() => getAllPokemons()}>
          <i className="fas fa-redo-alt load-icon"></i>
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
