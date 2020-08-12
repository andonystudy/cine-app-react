async function getDirectores() {
  const response = await fetch("http://localhost:8080/api/director");
  const json = await response.json();
  return json;
}

async function getDirector({ id }) {
  const response = await fetch(`http://localhost:8080/api/director/${id}`);
  const json = await response.json();
  return json;
}

async function createDirector({ director }) {
  const response = await fetch("http://localhost:8080/api/director", {
    method: "POST",
    body: JSON.stringify(director),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

async function updateDirector({ director }) {
  const response = await fetch("http://localhost:8080/api/director", {
    method: "PUT",
    body: JSON.stringify(director),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
}

export { getDirectores, getDirector, createDirector, updateDirector };
