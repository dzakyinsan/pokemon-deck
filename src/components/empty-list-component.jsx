import React from "react";
import EmptyPokemon from "./../assets/no-pokemon.png";
import "./component.css";

export default function LoadingComponent() {
  return (
    <div className="loading-page">
      <img src={EmptyPokemon} alt="empty pokemon" style={{ height: "200px" }} />
      <p>
        <strong>No Pokemon Caught...</strong>
      </p>
    </div>
  );
}
