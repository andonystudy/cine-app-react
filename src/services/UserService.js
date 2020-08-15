const PUERTO = "8085";

async function validateUser({user}){
    const data = await fetch(`http://localhost:${PUERTO}/api/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {}
      })
    const json = await data.json()
    return json
}

export { validateUser }