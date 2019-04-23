const baseURL = "http://localhost:5002"

const API = {
<<<<<<< HEAD
    getAll(path, id){
    return fetch(`${baseURL}/${path}?userId=${id}`)
    .then(e => e.json())
    },
    getOneEntry(id, path){
        return fetch(`${baseURL}/${path}/${id}`)
        .then(e => e.json())
=======
    getAll(path, id) {
        return fetch(`${baseURL}/${path}?userId=${id}`)
            .then(e => e.json())
    },
    getOneEntry(id, path) {
        return fetch(`${baseURL}/${path}/${id}`)
            .then(e => e.json())
    },
    getFriendsUserId(userId) {
        return fetch(`http://localhost:5002/friends?currentUserId=${userId}&_expand=user`)
            .then(r => r.json())
>>>>>>> master
    }
}

export default API