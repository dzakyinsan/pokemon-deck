import React from "react";
import { useHistory } from "react-router";
import Bounce from "react-reveal/Bounce";
import "./component.css";
import Pokeball from "./../assets/pokeball.png";

export default function CardPokemon({ pokemon }) {
  const history = useHistory();

  const DetailPokemon = (name) => {
    history.push(`/pokemonDetail/${name}`);
  };

  return (
    <div className="col-lg-3 col-md-6 list-cards-container">
      <Bounce bottom>
        <div className="main-container">
          <div className="the-card">
            <div className="the-front">
              <img src={Pokeball} alt={pokemon.name} />
            </div>
            <div className="the-back" onClick={() => DetailPokemon(pokemon.name)}>
              <div className="back-detail">
                <p>
                  <strong>{pokemon.name}</strong>
                </p>
                <p>{`Owned : ${pokemon.owned}`}</p>
              </div>
            </div>
          </div>
        </div>
      </Bounce>
    </div>
  );
}
