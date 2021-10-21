import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/DetailPokemon";
import "./App.css";
import Background from "./assets/background.png";

function App() {
  useEffect(() => {
    localStorage.setItem("myPokemon", JSON.stringify([]));
  }, []);

  return (
    <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat: "round", minHeight: "100vh", width: "100%", height: "auto" }}>
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact component={PokemonList} />
          <Route path={"/pokemonDetail/:name"} component={PokemonDetail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
