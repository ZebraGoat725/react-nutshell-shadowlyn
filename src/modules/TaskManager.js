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
    },
    put(editedTask) {
        return fetch(`${remoteURL}/tasks/${editedTask.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedTask)
    }).then(response => response.json())
    },
    // This fetch call grabs the tasks that the user who is logged in has not completed with the boolean value of false.
    getFalseTask(id) {
        return fetch(`${remoteURL}/tasks?isComplete=false&userId=${id}`).then(task => task.json())
    },
    
    patchTask(object) {
        return fetch(`${remoteURL}/tasks/${object.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(task => task.json())
    }
}