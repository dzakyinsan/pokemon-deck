import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/DetailPokemon";
import MyPokemon from "./pages/MyPokemon";
import Background from "./assets/background.png";

function App() {
  const [state, setState] = useState([]);

  useEffect(() => {
    const localPokemon = JSON.parse(localStorage.getItem("myPokemon")) || [];
    setState(localPokemon);
  }, []);

  useEffect(() => {
    if (state) localStorage.setItem("myPokemon", JSON.stringify(state || []));
  }, [state]);

  return (
    <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat: "round", minHeight: "100vh", width: "100%", height: "auto" }}>
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact component={PokemonList} />
          <Route path={"/pokemonDetail/:name"} component={PokemonDetail} />
          <Route path={"/myPokemon"} component={MyPokemon} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
