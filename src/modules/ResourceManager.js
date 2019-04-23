const baseURL = "http://localhost:5002"

const API = {
 getAll(path, id){
    return fetch(`${baseURL}/${path}?userId=${id}`)
    .then(e => e.json())
 },
 getOneEntry(id, path){
     return fetch(`${baseURL}/${path}/${id}`)
     .then(e => e.json())
 },
 getAllUsers(){
     return fetch(`${baseURL}/users`)
     .then(r => r.json())
 }
}

export default API