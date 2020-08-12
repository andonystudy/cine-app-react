async function getFilms() {
  const response = await fetch("http://localhost:8080/api/film");
  const json = await response.json();
  return json;
}

async function getFilm({ id }) {
  const response = await fetch(`http://localhost:8080/api/film/${id}`);
  const json = await response.json();
  return json;
}

async function createFilm({ film }) {
  const response = await fetch("http://localhost:8080/api/film", {
    method: "POST",
    body: JSON.stringify(film),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

async function updateFilm({ film }) {
  const response = await fetch("http://localhost:8080/api/film", {
    method: "PUT",
    body: JSON.stringify(film),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

export { getFilms, getFilm, createFilm, updateFilm };
