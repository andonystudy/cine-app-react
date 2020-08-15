const PUERTO = "8085";

async function getGenres() {
  const response = await fetch(`http://localhost:${PUERTO}/api/genre`);
  const json = await response.json();
  return json;
}

export { getGenres };
