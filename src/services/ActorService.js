async function getActores() {
  const response = await fetch("http://localhost:8080/api/actor");
  const json = await response.json();
  return json;
}

async function getActor({ id }) {
  const response = await fetch(`http://localhost:8080/api/actor/${id}`);
  const json = await response.json();
  return json;
}

async function createActor({ actor }) {
  const response = await fetch("http://localhost:8080/api/actor", {
    method: "POST",
    body: JSON.stringify(actor),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

async function updateActor({ actor }) {
  const response = await fetch("http://localhost:8080/api/actor", {
    method: "PUT",
    body: JSON.stringify(actor),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

export { getActores, getActor, createActor, updateActor };
