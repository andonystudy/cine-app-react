const PUERTO = '8085';

async function getActores() {
  const response = await fetch(`http://localhost:${PUERTO}/api/actor`);
  const json = await response.json();
  return json;
}

async function getActor({ id }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/actor/${id}`);
  const json = await response.json();
  return json;
}

async function changeStatus({ id }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/actor/${id}`, {
    method: "PUT"
  });
  const json = await response.json();
  return json;
}

async function createActor({ actor }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/actor`, {
    method: "POST",
    body: JSON.stringify(actor),
    headers: {},
  });
  const json = await response.json();
  return json;
}

async function updateActor({ actor }) {
  const response = await fetch(`http://localhost:${PUERTO}/api/actor`, {
    method: "PUT",
    body: JSON.stringify(actor),
    headers: {},
  });
  const json = await response.json();
  return json;
}

export { getActores, getActor, createActor, updateActor, changeStatus };
