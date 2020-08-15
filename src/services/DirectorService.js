const PUERTO = "8085";

async function getDirectores() {
  const response = await fetch(`http://localhost:${PUERTO}/api/director`);
  const json = await response.json();
  return json;
}

async function getDirector({ id }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/director/${id}`);
  const json = await response.json();
  return json;
}

async function changeStatus({ id }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/director/${id}`, {
    method: "PUT"
  });
  const json = await response.json();
  return json;
}

async function createDirector({ director }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/director`, {
    method: "POST",
    body: JSON.stringify(director),
    headers: {},
  });
  const json = await response.json();
  return json;
}

async function updateDirector({ director }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/director`, {
    method: "PUT",
    body: JSON.stringify(director),
    headers: {},
  });
  const json = await response.json();
  return json;
}

export { getDirectores, getDirector, createDirector, updateDirector, changeStatus };
