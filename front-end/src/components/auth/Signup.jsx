import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderField = ({input, label, type, meta: { touched, error }}) => (
    <div className="form-group">
        <label htmlFor={type}>{label}</label>
                <input className="form-control" {...input} type={type} />
                {touched && error && <span className="text-danger">{error}</span>}
    </div>
);

class Signup extends Component {
    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    name="email"
                    component={renderField}
                    type="text"
                    label="Email:"
                />
                <Field
                    name="password"
                    component={renderField}
                    type="password"
                    label="Password:"
                />
                <Field
                    name="confirmPassword"
                    component={renderField}
                    type="password"
                    label="Confirm password:"
                />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {};
    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (formProps.password !== formProps.confirmPassword) {
        errors.password = 'Password must match';
    }
    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }
    if (!formProps.confirmPassword) {
        errors.confirmPassword = 'Please enter a password confirmation';
    }

    return errors;
}

function mapStateToProps (state) {
    return { errorMessage: state.auth.error };
}


export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
})(connect(mapStateToProps, actions)(Signup));
