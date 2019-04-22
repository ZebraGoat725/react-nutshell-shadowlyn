import React, { Component } from 'react'

export default class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    //Sets ID to be "email"/"password", and the value to be whatever
    //is typed in.
    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    }
    //prevent page reloading,
    //sets login key to "valid", 
    //converts email/password to JSON
    handleLogin = (event) => {
        event.preventDefault();

        sessionStorage.setItem(
            "valid",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        )
    }

    render() {
        //Renders Login Form
        return (
            <React.Fragment>
                <form onSubmit={this.handleLogin}>
                    <h1>Sign In!</h1>
                    <label htmlFor="emailInput">Email: </label>
                    <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="Email address"
                        required=""
                        autoFocus=""
                    />
                    <label htmlFor="passwordInput">Password: </label>
                    <input onChange={this.handleFieldChange} type="password"
                        id="password"
                        placeholder="Password"
                        required=""
                    />
                    <button type="submit">
                        Sign In
                    </button>
                </form>
            </React.Fragment>
        )
    }
}