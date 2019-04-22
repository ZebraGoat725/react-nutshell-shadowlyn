const url = "http://localhost:5002/messages"

const messageData = {
    getAllMessages() {
        return fetch(url)
            .then(r => r.json())
    }
}

export default messageData