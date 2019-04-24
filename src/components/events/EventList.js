import React, { Component } from 'react'
import './event.css'

export default class EventList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="wrapper">
                    <div className="eventButton">
                        {/* redirects user to page where a new event can be created */}
                        <button type="button" onClick={
                            () => {
                                this.props.history.push("/events/new")
                            }
                        }>Create New Event</button>
                    </div>
                    {
                        this.props.events.map(event =>
                            <div key={event.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">
                                            {event.event}
                                        </h3>
                                        <div className="card-text">Where: {event.location}</div>
                                        <div className="card-text">When: {event.date}</div>
                                        <button className="btn btn-primary"
                                            type="button"
                                            onClick={() => {
                                                {/* Redirects user to an edit page specific to the individual event */ }
                                                this.props.history.push(`/events/${event.id}/edit`);
                                            }}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        this.props.friendsEvents.map(event =>
                            event.map(entry => 
                                <div key={entry.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                {entry.event}
                                            </h3>
                                            <div className="card-text">Where: {entry.location}</div>
                                            <div className="card-text">When: {entry.date}</div>
                                        </div>
                                    </div>
                                </div>
                            )


                        )
                    }
                </div>
            </React.Fragment>
        )
    }
}