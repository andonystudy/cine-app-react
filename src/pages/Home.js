import React, { useState, useEffect } from "react";
import {
  top5Film,
  countActorBySex,
  top3FilmActor,
} from "../services/ReporteService.";

import { Doughnut } from "react-chartjs-2";

export default function Home() {
  const [topfilm, setTopfilm] = useState([]);
  const [topfilmactor, setTopfilmactor] = useState([]);
  const [countsexM, setCountsexM] = useState({});
  const [countsexF, setCountsexF] = useState({});

  const data = {
    labels: ["Femenino", "Masculino"],
    datasets: [
      {
        data: [countsexF.sexo_mujer, countsexM.sexo_hombre],
        backgroundColor: ["#274fbb", "#011b62"],
        hoverBackgroundColor: ["#2044a5", "#001652"],
      },
    ],
  };

  useEffect(() => {
    top5Film().then((data) => setTopfilm(data));
    top3FilmActor().then((data) => setTopfilmactor(data));
    countActorBySex({ sex: "m" }).then((data) => setCountsexM(data));
    countActorBySex({ sex: "f" }).then((data) => setCountsexF(data));
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="m-0">Actores por Género:</h5>
            </div>
            <div className="card-body dona">
              <Doughnut data={data} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="m-0">Top 5 películas con más Raiting:</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {topfilm.map((film) => (
                  <li key={film.id} className="list-group-item">
                    <div className="left">
                      {film.raiting}
                      <span></span>⭐
                    </div>
                    <div className="right">
                      <h6>{film.title}</h6>
                      <p>{film.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="m-0">Top 3 - Oscar Ganados:</h5>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {topfilmactor.map((data) => (
                  <li key={data.id} className="list-group-item">
                    <div className="left">
                      {data.oscarWinner}
                      <span></span>🗽
                    </div>
                    <div className="right">
                      <h6>{data.film.title}</h6>
                      <p>
                        {data.actor.name} {data.actor.lastname}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
