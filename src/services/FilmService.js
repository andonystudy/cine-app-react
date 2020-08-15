const PUERTO = "8085";

async function getFilms() {
  const response = await fetch(`http://localhost:${PUERTO}/api/film`);
  const json = await response.json();
  return json;
}

async function getFilm({ id }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/film/${id}`);
  const json = await response.json();
  return json;
}

async function changeStatus({ id }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/film/${id}`, {
    method: "PUT"
  });
  const json = await response.json();
  return json;
}

async function createFilm({ film }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/film`, {
    method: "POST",
    body: JSON.stringify(film),
    headers: {},
  });
  const json = await response.json();
  return json;
}

async function updateFilm({ film }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/film`, {
    method: "PUT",
    body: JSON.stringify(film),
    headers: {},
  });
  const json = await response.json();
  return json;
}

export { getFilms, getFilm, createFilm, updateFilm, changeStatus };
