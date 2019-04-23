import React, { Component } from 'react'

export default class EventForm extends Component {
    state = {
        location: "",
        event: "",
        date: "",
        userId: ""
    }
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const newEvent = {
            location: this.state.location,
            event: this.state.event,
            date: this.state.date,
            userId: Number(sessionStorage.getItem("userID"))
        }
        this.props.createEvent(newEvent).then(() => this.props.history.push("/events"))

    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <form>
                        <label htmlFor="nameInput">Event Name</label>
                        <input type="text"
                            id="event"
                            required
                            onChange={this.handleFieldChange} />
                        <label htmlFor="dateInput">Event Date</label>
                        <input type="date"
                            id="date"
                            required
                            onChange={this.handleFieldChange} />
                        <label htmlFor="locationInput">Event Location</label>
                        <input type="text"
                            id="location"
                            required
                            onChange={this.handleFieldChange} />
                        <button onClick={this.handleSubmit}>Submit New Event</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}