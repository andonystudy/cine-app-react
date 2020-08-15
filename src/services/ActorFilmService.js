const PUERTO = '8085';

async function getActorFilms() {
  const response = await fetch(`http://localhost:${PUERTO}/api/filmActor`);
  const json = await response.json();
  return json;
}

async function getActorFilm({ id }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/filmActor/${id}`);
  const json = await response.json();
  return json;
}

async function changeStatus({ id }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/filmActor/${id}`, {
    method: "PUT"
  });
  const json = await response.json();
  return json;
}

async function createActorFilm({ actorFilm }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/filmActor`, {
    method: "POST",
    body: JSON.stringify(actorFilm),
    headers: {},
  });
  const json = await response.json();
  return json;
}

async function updateActorFilm({ actorFilm }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/filmActor`, {
    method: "PUT",
    body: JSON.stringify(actorFilm),
    headers: {},
  });
  const json = await response.json();
  return json;
}

export { getActorFilms, getActorFilm, createActorFilm, updateActorFilm, changeStatus };
