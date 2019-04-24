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
    //Data passed down from ApplicationViews is used to call createEvent,
    //which adds a new object along with the userId stored in Session Storage
    //to our JSON database. Redirects users to the main events page
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
                <form>
                    <div className="form-group">
                        <label htmlFor="nameInput">Event Name</label>
                        <input className="form-control"
                            type="text"
                            id="event"
                            required
                            onChange={this.handleFieldChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateInput">Event Date</label>
                        <input className="form-control"
                            type="date"
                            id="date"
                            required
                            onChange={this.handleFieldChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="locationInput">Event Location</label>
                        <input className="form-control"
                            type="text"
                            id="location"
                            required
                            onChange={this.handleFieldChange} />
                    </div>
                    <button onClick={this.handleSubmit}>Submit New Event</button>
                </form>
            </React.Fragment>
        )
    }
}