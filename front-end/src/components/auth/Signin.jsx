import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Mobile from '../mobile';

class Signin extends Component {
    constructor(props){
        super(props)
        this.state = {
            mobile : "apple"
        }
    }

    handleFormSubmit({ email, password }) {
        console.log(email, password);
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                <fieldset className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field 
                        name="email"
                        component="input"
                        type="text"
                        className="form-control"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                        name="password"
                        type="input"
                        component="input"
                        className="form-control"
                    />
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
                {this.state.mobile && <Mobile /> }
            </div>
        );
    }
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
})(Signin);
