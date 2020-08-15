import React, { useState, useEffect } from "react";
import { getGenres } from "../services/GenreService";
import { getDirectores } from "../services/DirectorService";
import {
  getFilms,
  getFilm,
  createFilm,
  changeStatus,
  updateFilm,
} from "../services/FilmService";

export default function Film() {
  const [genres, setGenres] = useState([]);
  const [directores, setDirectores] = useState([]);

  const [films, setFilms] = useState([]);

  let film = {};
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState(1);
  const [director, setDirector] = useState(1);
  const [year, setYear] = useState("");
  const [raiting, setRaiting] = useState("");

  const limpiar = () => {
    setId("");
    setTitle("");
    setGenre(1);
    setDirector(1);
    setYear("");
    setRaiting("");
  };

  const cambiarEstado = (id) => {
    changeStatus({ id }).then((resp) => {
      listar();
    });
    console.log(id);
  };

  const listar = () => {
    getFilms().then((films) => {
      setFilms(films);
    });
  };

  const obtenerFilm = (id) => {
    getFilm({ id }).then((film) => {
      setId(film.id);
      setTitle(film.title);
      setGenre(film.genre.id);
      setDirector(film.director.id);
      setYear(film.year);
      setRaiting(film.raiting);
    });
  };

  const create = (film) => {
    createFilm({ film }).then((resp) => {
      console.log(resp);
      listar();
      limpiar();
    });
  };

  const update = (film) => {
    updateFilm({ film }).then((resp) => {
      console.log(resp);
      listar();
      limpiar();
    });
  };

  const save = (e) => {
    e.preventDefault();
    if (title.trim() === "" || year.trim() === "") return;
    film = {
      id,
      title,
      genre: { id: genre },
      director: { id: director },
      year,
      raiting,
    };
    if (id === "") create(film);
    else update(film);
  };

  useEffect(() => {
    getGenres().then((genres) => {
      setGenres(genres);
    });
    getDirectores().then((directores) => {
      setDirectores(directores);
    });
    listar();
  }, []);

  return (
    <div>
      <h3>Película</h3>
      <hr />
      <div className="row">
        <div className="col-md-3">
          <form onSubmit={save}>
            <label>Título:</label>
            <input
              type="text"
              className="field"
              placeholder="Escriba el Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label>Categoría:</label>
            <select
              className="field"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <label>Director:</label>
            <select
              className="field"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            >
              {directores.map((director) => (
                <option key={director.id} value={director.id}>
                  {director.name} {director.lastname}
                </option>
              ))}
            </select>
            <label>Año:</label>
            <input
              type="number"
              className="field"
              placeholder="Año de Lanzamiento"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              min="1000"
            />
            <label>Estrellas:</label>
            <input
              type="number"
              className="field"
              placeholder="Puntos obtenidos"
              value={raiting}
              onChange={(e) => setRaiting(e.target.value)}
              required
              min="0"
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
        <div className="table-responsive col-md-9">
          <table className="table table-hover table-striped">
            <thead className="thead-dark text-center">
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Categpría</th>
                <th>Director</th>
                <th>Año</th>
                <th>Estrellas</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {films.map((film, idx) => (
                <tr key={film.id} className="text-center">
                  <td>{idx + 1}</td>
                  <td>{film.title}</td>
                  <td>{film.genre.name}</td>
                  <td>{film.director.name}</td>
                  <td>{film.year}</td>
                  <td>
                    {film.raiting} <span></span>⭐
                  </td>
                  <td>
                    {film.status ? (
                      <span className="badge badge-success">ACTIVO</span>
                    ) : (
                      <span className="badge badge-danger">INACTIVO</span>
                    )}
                  </td>
                  <td>
                    {film.status ? (
                      <button
                        onClick={() => obtenerFilm(film.id)}
                        className="btn bg-custom-outline btn-sm"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                    ) : (
                      ""
                    )}
                    <button
                      onClick={() => cambiarEstado(film.id)}
                      className="btn bg-custom-outline btn-sm ml-2"
                    >
                      {film.status ? (
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
