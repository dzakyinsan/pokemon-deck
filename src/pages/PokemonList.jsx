import React, { useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
import Bounce from "react-reveal/Bounce";
import { useHistory } from "react-router";
import "./pages.css";
import CardPokemon from "../components/card-pokemon";
import LoadingComponent from "../components/loading-component";
import Logo from "./../assets/logo.png";
import Device from "./../assets/device.png";

function PokemonList() {
  const history = useHistory();
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getAllPokemons();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toMyDeck = () => {
    history.push(`/myPokemon`);
  };

  const getAllPokemons = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=52");
    const data = await res.json();
    const dataLs = localStorage.getItem("myPokemon");
    const parseLs = JSON.parse(dataLs);

    const addOwned = data.results.map((val) => {
      const owned = { ...val, owned: 0 };
      return owned;
    });
    for (let i = 0; i < parseLs.length; i++) {
      let index = addOwned.findIndex((val) => val.name === parseLs[i].name);
      addOwned[index].owned += 1;
    }
    if (data) {
      setAllPokemons(addOwned);
    }
  };

  if (!allPokemons.length) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <div>
        <h1 className="text-center">
          <img src={Logo} alt="Logo" height="250px" />
        </h1>
        <div className="my-pokemon">
          <Bounce right>
            <img src={Device} alt="my-deck" height="60px" id="my-pokemon" onClick={toMyDeck} />
            <UncontrolledTooltip placement="bottom" target="my-pokemon">
              Your Deck
            </UncontrolledTooltip>
          </Bounce>
        </div>
      </div>
      <div className="row">
        {allPokemons?.map((pokemon) => (
          <CardPokemon pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
