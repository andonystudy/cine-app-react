import React, { useState, useEffect } from "react";
import {
  getActorFilms,
  getActorFilm,
  createActorFilm,
  updateActorFilm,
  changeStatus
} from "../services/ActorFilmService";
import { getActores } from "../services/ActorService";
import { getFilms } from "../services/FilmService";

export default function FilmActor() {
  const [actores, setActores] = useState([]);
  const [films, setFilms] = useState([]);
  const [actorFilms, setActorFilms] = useState([]);

  let actorFilm = {};
  const [id, setId] = useState("");
  const [actor, setActor] = useState(1);
  const [film, setFilm] = useState(1);
  const [oscarWinner, setOscarWinner] = useState("");

  const limpiar = () => {
    setId("");
    setActor(1);
    setFilm(1);
    setOscarWinner("");
  };

  const cambiarEstado = (id) => {
    changeStatus({ id }).then((resp) => {
      listar();
    });
    console.log(id);
  };

  const listar = () => {
    getActorFilms().then((actorFilms) => setActorFilms(actorFilms));
  };

  const obtenerActorFilm = (id) => {
    getActorFilm({ id }).then((actorFilm) => {
      setId(actorFilm.id);
      setActor(actorFilm.actor.id);
      setFilm(actorFilm.film.id);
      setOscarWinner(actorFilm.oscarWinner);
    });
  };

  const create = (actorFilm) => {
    createActorFilm({ actorFilm }).then((resp) => {
      console.log(resp);
      listar();
      limpiar();
    });
  };

  const update = (actorFilm) => {
    updateActorFilm({ actorFilm }).then((resp) => {
      console.log(resp);
      listar();
      limpiar();
    });
  };

  const save = (e) => {
    e.preventDefault();
    actorFilm = {
      id,
      actor: { id: actor },
      film: { id: film },
      oscarWinner,
    };
    if (id === "") create(actorFilm);
    else update(actorFilm);
  };

  useEffect(() => {
    getActores().then((actores) => setActores(actores));
    getFilms().then((films) => {
      console.log(films);
      setFilms(films);
    });
    listar();
  }, []);

  return (
    <div>
      <h3>Película y Actor</h3>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={save}>
            <label>Actor:</label>
            <select
              className="field"
              value={actor}
              onChange={(e) => setActor(e.target.value)}
            >
              {actores.map((actor) => (
                <option key={actor.id} value={actor.id}>
                  {actor.name} {actor.lastname}
                </option>
              ))}
            </select>
            <label>Película:</label>
            <select
              className="field"
              value={film}
              onChange={(e) => setFilm(e.target.value)}
            >
              {films.map((film) => (
                <option key={film.id} value={film.id}>
                  {film.title}
                </option>
              ))}
            </select>
            <label>Oscar Ganados:</label>
            <input
              type="number"
              className="field"
              placeholder="Cantidad de Oscar"
              value={oscarWinner}
              onChange={(e) => setOscarWinner(e.target.value)}
            />
            <button type="submit" className="btn btn-block bg-custom mt-2">
              Guardar
            </button>
            <button
              type="button"
              onClick={limpiar}
              className="btn btn-block bg-custom-outline mt-2"
            >
              Cancelar
            </button>
          </form>
        </div>
        <div className="col-md-8">
          <table className="table table-hover table-striped">
            <thead className="thead-dark text-center">
              <tr>
                <th>#</th>
                <th>Actor</th>
                <th>Película</th>
                <th>Oscar Ganados</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {actorFilms.map((actorfilm, idx) => (
                <tr key={actorfilm.id} className="text-center">
                  <td>{idx + 1}</td>
                  <td>
                    {actorfilm.actor.name} {actorfilm.actor.lastname}
                  </td>
                  <td>{actorfilm.film.title}</td>
                  <td>
                    {actorfilm.oscarWinner} <span></span>🗽
                  </td>
                  <td>
                    {actorfilm.status ? (
                      <span className="badge badge-success">ACTIVO</span>
                    ) : (
                      <span className="badge badge-danger">INACTIVO</span>
                    )}
                  </td>
                  <td>
                    {actorfilm.status ? (
                      <button
                        onClick={() => obtenerActorFilm(actorfilm.id)}
                        className="btn bg-custom-outline btn-sm"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => cambiarEstado(actorfilm.id)}
                      className="btn bg-custom-outline btn-sm ml-2"
                    >
                      {actorfilm.status ? (
                        <i className="fas fa-eye-slash" title="DESACTIVAR"></i>
                      ) : (
                        <i className="fas fa-eye" title="ACTIVAR"></i>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
