const baseURL = "http://localhost:5002"

const API = {
    getAll(path, id) {
        return fetch(`${baseURL}/${path}?userId=${id}`)
            .then(e => e.json())
    },
    getOneEntry(id, path) {
        return fetch(`${baseURL}/${path}/${id}`)
            .then(e => e.json())
    },
    getAllUsers() {
        return fetch(`${baseURL}/users`)
            .then(r => r.json())
    },

    postEntry(obj, path) {
        return fetch(`${baseURL}/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(e => e.json())
    },
    getFriendsUserId(userId) {
        return fetch(`http://localhost:5002/friends?currentUserId=${userId}&_expand=user`)
            .then(r => r.json())
    }
}

export default API