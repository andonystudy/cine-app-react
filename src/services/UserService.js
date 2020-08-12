async function validateUser({user}){
    const data = await fetch('http://localhost:8080/api/users/validate', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    const json = await data.json()
    return json
}

export { validateUser }