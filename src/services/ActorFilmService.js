async function getActorFilms() {
  const response = await fetch("http://localhost:8080/api/filmActor");
  const json = await response.json();
  return json;
}

async function getActorFilm({ id }) {
  const response = await fetch(`http://localhost:8080/api/filmActor/${id}`);
  const json = await response.json();
  return json;
}

async function createActorFilm({ actorFilm }) {
  const response = await fetch("http://localhost:8080/api/filmActor", {
    method: "POST",
    body: JSON.stringify(actorFilm),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

async function updateActorFilm({ actorFilm }) {
  const response = await fetch("http://localhost:8080/api/filmActor", {
    method: "PUT",
    body: JSON.stringify(actorFilm),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

export { getActorFilms, getActorFilm, createActorFilm, updateActorFilm };
