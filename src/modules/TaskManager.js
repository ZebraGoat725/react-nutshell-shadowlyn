const remoteURL = "http://localhost:5002"

export default {
    getAll() {
        return fetch(`${remoteURL}/tasks`).then(r=>r.json())
    },
    get(id) {
        return fetch(`${remoteURL}/tasks/${id}`).then(r=>r.json())
    },
    post(newTask) {
        return fetch(`${remoteURL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }).then(task=>task.json())
    }
}