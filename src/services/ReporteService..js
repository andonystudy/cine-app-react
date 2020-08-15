const PUERTO = "8085";

async function top5Film() {
  const response = await fetch(`http://localhost:${PUERTO}/api/film/raiting`);
  const json = await response.json();
  return json;
}

async function top3FilmActor() {
  const response = await fetch(`http://localhost:${PUERTO}/api/filmActor/oscarwinner`);
  const json = await response.json();
  return json;
}

async function countActorBySex({sex}) {
  const response = await fetch(`http://localhost:${PUERTO}/api/actor/sex/${sex}`);
  const json = await response.json();
  return json;
}

export { top5Film, top3FilmActor, countActorBySex };
