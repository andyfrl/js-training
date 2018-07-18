import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createEmp } from '../actions/empActions';
import { toggleVisibility } from '../actions/menuActions';
import { MenuHeadingContainer } from './MenuHeading';


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            last_name: '',
            first_name: '',
            role: '',
            pos_login_pin: '',
            wage: '',
            email: '',
            phone: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCancel() {
        console.log("hide this");
    }

    onSubmit(e) {
        e.preventDefault();

        const entry = {
            last_name: this.state.last_name,
            first_name: this.state.first_name,
            role: this.state.role,
            pos_login_pin: this.state.pos_login_pin,
            wage: this.state.wage,
            email: this.state.email,
            phone: this.state.phone
        }

        this.props.createEmp(entry);
        this.props.showEmps({employee_details: false, employees_menu: true, popup_menu: true})
    }

    render() {
        return (
            <form id='form-employee-details' onSubmit={this.onSubmit}>
                <MenuHeadingContainer />
                <div id="form-caption">Employee Information</div>
                <div className="employee-details">

                    <span className="big-field">
                        <div className="field-name">FIRST NAME*</div>
                        <input type="text" id="first-name" className="input-box"
                            onChange={this.onChange} value={this.state.first_name}
                            name="first_name" />
                    </span>
                    <span className="big-field">
                        <div className="field-name">LAST NAME*</div>
                        <input type="text" id="last-name" className="input-box"
                            onChange={this.onChange} value={this.state.last_name}
                            name="last_name" />
                    </span>
                </div>

                <div className="employee-details">
                    <span className="big-field">
                        <div className="field-name">ROLE*</div>
                        <input type="text" id="role" className="input-box"
                            onChange={this.onChange} value={this.state.role}
                            name="role" />
                    </span>

                    <span className="small-field">
                        <div className="field-name">POS LOGIN PIN*</div>
                        <input type="password" id="pos-login-pin"
                            className="input-box"
                            onChange={this.onChange} value={this.state.pos_login_pin}
                            name="pos_login_pin" />
                    </span>
                    <span className="small-field">
                        <div className="field-name">WAGE*</div>
                        <input type="text" id="wage" className="input-box"
                            onChange={this.onChange} value={this.state.wage}
                            name="wage" />
                    </span>
                </div>

                <div className="employee-details">
                    <span className="big-field">
                        <div className="field-name">EMAIL ADDRESS*</div>
                        <input type="email" id="email-address"
                            className="input-box"
                            onChange={this.onChange} value={this.state.email}
                            name="email" />
                    </span>
                    <span className="big-field">
                        <div className="field-name">PHONE NUMBER*</div>
                        <input type="tel" id="phone-number"
                            className="input-box"
                            onChange={this.onChange} value={this.state.phone}
                            name="phone" />
                    </span>

                </div>

                <div id="filler">
                    <input type="button" value="Cancel"
                        id="btn-employee-cancel" className="upload"
                        onClick={this.onCancel} />
                    <input type="submit" value="Submit"
                        id="btn-employee-add" className="add" />
                </div>
            </form>
        )
    }

}

const mapStateToProps = state => ({
    emps: state.emps.items
});

const mapDispatchToProps = dispatch => ({
    createEmp: (postData) => dispatch(createEmp(postData)),
    showEmps: (visibleMenus) => dispatch(toggleVisibility(visibleMenus))
});

export const DetailsContainer = connect(mapStateToProps, mapDispatchToProps)(Details);
