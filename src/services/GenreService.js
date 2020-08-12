async function getGenres() {
  const response = await fetch("http://localhost:8080/api/genre");
  const json = await response.json();
  return json;
}

export { getGenres };
