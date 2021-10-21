/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import "./pages.css";
import { ColorFormatter } from "./../components/FormatColor";
import Loading from "./../assets/loading2.gif";

export default function DetailPokemon() {
  const { name } = useParams();

  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    getDetailPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetailPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    if (data) {
      setDataDetail(data);
    }
  };

  const onCatchPokemon = () => {
    Swal.fire({
      title: `Catch ${dataDetail.name} ?`,
      text: "Lets Go!!",
      imageUrl: `${dataDetail.sprites.front_default}`,
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      cancelButtonText: "let it go",
      confirmButtonText: "Catch!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          if (Math.random() < 0.5) {
            (async () => {
              const { value: nickname } = await Swal.fire({
                title: "Congrats! you caught the pokemon!",
                text: "Give pokemone a nickname to save it on the deck",
                icon: "success",
                input: "text",
                inputPlaceholder: "give the pokemon a nickname",
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to write a nickname!";
                  }
                },
              });
              if (nickname) {
                Swal.fire(`${nickname} save to deck`);
                const { name, abilities, sprites } = dataDetail;
                const newPokemon = {
                  nickname,
                  name,
                  abilities,
                  sprites,
                };
                const dataLs = localStorage.getItem("myPokemon");
                const parseLs = JSON.parse(dataLs);
                const addToLs = [...parseLs, newPokemon];
                localStorage.setItem("myPokemon", JSON.stringify(addToLs));
              }
            })();
          } else {
            Swal.fire("pokemon managed to escape!", "Try again later :)", "error");
          }
        }, 1000);
      }
    });
  };

  if (!dataDetail.name) {
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
    <div className="d-flex justify-content-center detail-container">
      <div className="detail-card">
        <div className="row p-3 pb-4">
          <div className="col-lg-5 col-md-12">
            <div className="d-flex justify-content-center detail-img" style={{ backgroundImage: `linear-gradient(${ColorFormatter.setBackground(dataDetail?.types[0]?.type.name)}, whitesmoke)` }}>
              <img src={dataDetail?.sprites?.other?.dream_world?.front_default} alt={dataDetail?.name} />
            </div>
            <div>
              <Button className="catch-btn" size="lg" block onClick={onCatchPokemon}>
                Catch Pokemon
              </Button>
            </div>
          </div>
          <div className="col-lg-7 col-md-12 mt-3 detail-pokemon">
            <h5>{dataDetail?.name}</h5>
            <div>
              <h6>Moves</h6>
              {dataDetail?.moves?.map((val, i) => {
                if (i === dataDetail.moves.length - 1) {
                  return <span>{val.move.name}</span>;
                } else {
                  return <span>{val.move.name},</span>;
                }
              })}
            </div>
            <div>
              <h6>Types</h6>
              <div className="row">
                {dataDetail?.types?.map((val) => (
                  <div className="col-6">
                    <div className="row">
                      <div className="col">
                        <span>{val.type.name}</span>
                      </div>
                      <div className="col dot-color-cont">
                        <div className="dot-color" style={{ background: ColorFormatter.setBackground(val.type.name) }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h6>Status</h6>
              <div className="row">
                {dataDetail?.stats?.map((val) => (
                  <div className="col-6">
                    <div className="row">
                      <div className="col">
                        <span>{val.stat.name}</span>
                      </div>
                      <div className="col dot-color-cont">
                        <span style={{ fontWeight: "bold" }}>{val.base_stat}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
