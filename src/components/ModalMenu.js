import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleVisibility } from '../actions/menuActions';
import { updateEmp } from '../actions/empActions';

class ModalMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            owner_icon: "close-icon font-icon ico-f ico-f-radio",
            employee_icon: "close-icon font-icon ico-f ico-f-radio",
            current_role: "None"
        }

        this.switchIconOwner = this.switchIconOwner.bind(this);
        this.switchIconEmployee = this.switchIconEmployee.bind(this);
        this.onRoleApply = this.onRoleApply.bind(this);
    }

    switchIconOwner() {
        this.setState({
            owner_icon: "close-icon font-icon ico-f ico-f-radio-checked",
            employee_icon: "close-icon font-icon ico-f ico-f-radio",
            current_role: "Owner"
        });
    }

    switchIconEmployee() {
        this.setState({
            owner_icon: "close-icon font-icon ico-f ico-f-radio",
            employee_icon: "close-icon font-icon ico-f ico-f-radio-checked",
            current_role: "Employee"
        });
    }

    onRoleApply() {
        const empsSelected = this.props.items.filter(el => (el.isSelected));
        if (this.state.current_role !== 'None') {
            empsSelected.forEach(el => {
                this.props.updateEmp(el._id, {role: this.state.current_role});
            });
            this.props.toggleVisibility({modal_menu: false, employees_menu: true, popup_menu: true});
        } else {
            alert('Please choose the role');
        }
    }
    stp(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div id="change-employee-role-modal" className="modal"
                onClick={() => this.props.toggleVisibility({modal_menu: false, employees_menu: true})}>
                <div className="modal-content"
                    onClick={this.stp}>
                    <div id='caption-change-role'
                        >
                        Change Role
                    </div>
                    <div id='body-change-role'>
                        Which role would you like to apply to the selected employees?
                    </div>
                    <br></br>
                    <div id="controls-change-role">
                        <div id="btn-controls-owner"
                            className={this.state.owner_icon}
                            onClick={this.switchIconOwner}>
                        </div>Owner<br />
                        <div id="btn-controls-employee"
                            className={this.state.employee_icon}
                            onClick={this.switchIconEmployee}>
                        </div>Employee<br />
                    </div>
                    <span id="controls-modal-menu">
                        <input type="button" value="Cancel"
                            id="btn-change-role-cancel" className="upload"
                            onClick={() => this.props.toggleVisibility({modal_menu: false, employees_menu: true})}/>
                        <input type="button" value="Apply New Role"
                            id="btn-change-role-apply" className="add"
                            onClick={this.onRoleApply}/>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    menu: state.menu,
    items: state.emps.items
});

const mapDispatchToProps = dispatch => ({
    toggleVisibility: visibleMenus => dispatch(toggleVisibility(visibleMenus)),
    updateEmp: (id, updatedData) => dispatch(updateEmp(id, updatedData))
});

const ModalMenuContainer = connect(mapStateToProps, mapDispatchToProps)(ModalMenu);

export {ModalMenuContainer};
