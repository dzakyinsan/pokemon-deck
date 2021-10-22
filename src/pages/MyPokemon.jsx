import React, { useState, useEffect } from "react";
import Bounce from "react-reveal/Bounce";
import { Card, Button, CardTitle, CardText } from "reactstrap";
import Swal from "sweetalert2";
import "./pages.css";
import LoadingComponent from "../components/loading-component";
import EmptyListComponent from "../components/empty-list-component";
import { ColorFormatter } from "../formatter/Format-color";

export default function MyPokemon() {
  const [myPokemon, setMyPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataLs = localStorage.getItem("myPokemon");
    const parseLs = JSON.parse(dataLs);
    if (myPokemon.length !== parseLs.length) {
      setMyPokemon(parseLs);
    }
    setLoading(false);
  }, [myPokemon]);

  const onSetFree = (nickname) => {
    Swal.fire({
      title: "are you sure to release this pokemon?",
      showDenyButton: true,
      confirmButtonText: "release",
      denyButtonText: `cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        const pokemonLs = [...myPokemon];
        let index = pokemonLs.findIndex((val) => val.nickname === nickname);
        pokemonLs.splice(index, 1);
        setMyPokemon(pokemonLs);
        localStorage.setItem("myPokemon", JSON.stringify(pokemonLs));
        Swal.fire("Pokemon Released", "", "success");
      }
    });
  };

  if (loading) {
    return <LoadingComponent />;
  } else if (!myPokemon.length) {
    return <EmptyListComponent />;
  }
  return (
    <div className="p-5">
      <div className="row">
        {myPokemon?.map((pokemon, i) => (
          <Bounce bottom>
            <div className="col-lg-3 col-md-6 mt-4" key={i}>
              <Card className="text-center" body inverse style={{ backgroundColor: ColorFormatter.setBackground(pokemon?.types[0]?.type.name) }}>
                <div className="d-flex justify-content-center">
                  <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} height="150px" />
                </div>
                <CardTitle tag="h5" className="mt-4">
                  {pokemon.name}
                </CardTitle>
                <CardText>{pokemon.nickname}</CardText>
                <Button color="warning" onClick={() => onSetFree(pokemon.nickname)}>
                  Set free
                </Button>
              </Card>
            </div>
          </Bounce>
        ))}
      </div>
    </div>
  );
}
