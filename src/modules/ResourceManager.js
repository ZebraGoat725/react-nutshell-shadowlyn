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
    getFriendsUserId(userId) {
        return fetch(`${baseURL}/friends?currentUserId=${userId}&_expand=user`)
            .then(r => r.json())
    },
    postItem(path, object) {
        return fetch(`${baseURL}/${path}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(object)
        }).then(data => data.json())
      }
}

export default API