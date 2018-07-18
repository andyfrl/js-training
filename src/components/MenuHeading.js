import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleVisibility } from '../actions/menuActions';

import { SearchBoxContainer } from './SearchBox';

class MenuHeading extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search_box_visible: false
        }

        this.onClickMagnifier = this.onClickMagnifier.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
    }

    onClickMagnifier() {
        this.setState({search_box_visible: true});
    }

    onClickClose() {
        this.setState({search_box_visible: false})
    }

    render() {
        return (
            <div className="main-1">
                <div className="main-1-controls-employees">
                    <h4>Employees</h4>
                </div>
                {!this.state.search_box_visible &&
                <span className="main-1-controls-employee-list">
                    <h4>Employee List</h4>
                </span>}
                {!this.state.search_box_visible &&
                <span className="main-1-controls-roles"
                    onClick={() => this.props.toggleVisibility({
                        employees_menu: false,
                        employee_details: false,
                        main_menu: false,
                        modal_menu: false,
                        popup_menu: false,
                        role_permissions_menu: true})}>
                    <h4>Roles</h4>
                </span>
                }
                {(this.state.search_box_visible)
                    ? <SearchBoxContainer
                        closeHandle={this.onClickClose}/>
                    : <span className="font-icon ico-f ico-f-magnifier"
                            onClick={this.onClickMagnifier}></span>
                }

            </div>
        )
    }
}

const mapStateToProps = state => ({
    menu: state.menu
});

const mapDispatchToProps = dispatch => ({
    toggleVisibility: visibleMenus => dispatch(toggleVisibility(visibleMenus))
});

const MenuHeadingContainer = connect(mapStateToProps, mapDispatchToProps)(MenuHeading);

export {MenuHeading};
export {MenuHeadingContainer};
