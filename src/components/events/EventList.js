import React, { Component } from 'react'
import './event.css'

export default class EventList extends Component {


    //Finds the most upcoming date in relation to the current date/time
    findUpcoming = () => {
        let currDate = Date.now();
        let testArr = this.props.events.map(event => { return Date.parse(event.date) })
        testArr.push(currDate)
        testArr.sort((a, b) => a - b)
        let date = new Date(currDate)

        let dateAfterIndex = testArr.indexOf(currDate) + 1
        let dateAfter = new Date(testArr[dateAfterIndex])
        let findDate = this.props.events.find(event => Date.parse(event.date) === Date.parse(dateAfter))
        return findDate

    }

    render() {
        return (
            <React.Fragment>
                <div className="wrapper lineUp">
                    <div className="eventButton">
                        {/* redirects user to page where a new event can be created */}
                        <button type="button" onClick={
                            () => {
                                this.props.history.push("/events/new")
                            }
                        }>Create New Event</button>
                    </div>
                    {
                        this.props.events.map((event, index) =>
                            <div key={event.id}>
                                <div className="card events">
                                    <div className="card-body">

                                        {
                                            //conditionally renders event that is coming up the soonest
                                            (event === this.findUpcoming()) ?
                                                (
                                                    <h1 className="card-title">
                                                        {event.event}
                                                    </h1>
                                                )
                                                :
                                                (
                                                    <h5 className="card-title">
                                                        {event.event}
                                                    </h5>
                                                )
                                        }
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
                                    <div className="card events">
                                        <div className="card-body friendEvents">
                                            User: {this.props.users.find(userToFind => entry.userId === userToFind.id).userName}
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