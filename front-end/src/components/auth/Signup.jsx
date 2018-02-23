import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

const renderField = ({input, label, type, meta: { touched, error }}) => (
    <div>
        <label htmlFor={type}>{label}</label>
            <div>
                <input className="form-control" {...input} type={type} />
                {touched && error && <span className="text-danger">{error}</span>}
            </div>
    </div>
);

class Signup extends Component {
    render() {
        const { handleSubmit } = this.props;

        return (
            <form>
                <fieldset className="form-group">
                    <Field
                        name="email"
                        component={renderField}
                        type="text"
                        className="form-control"
                        label="Email"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="password"
                        component={renderField}
                        type="password"
                        className="form-control"
                        label="Password"
                    />
                </fieldset>
                <fieldset className="form-group">
                    <Field
                        name="confirmPassword"
                        component={renderField}
                        type="password"
                        className="form-control"
                        label="Confirm password"
                    />
                </fieldset>
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};
    if (formProps.password !== formProps.confirmPassword) {
        errors.password = 'Password must match';
    }

    return errors;
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(Signup);
