import React, {Component} from 'react';
import {connect} from 'react-redux';

import {EmpRowContainer} from './EmpRow';
import {toggleSelection} from '../actions/empActions';
import {setSelection} from '../actions/empActions';
import {sortByParam} from '../actions/empActions';


class EmpTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allSelected: false,
            allSelectedIcon: "font-icon ico-f ico-f-radio"
        }

        this.onClickSelectAll = this.onClickSelectAll.bind(this);
    }

    onClickSelectAll() {
        this.props.employees.forEach(el => {
                this.props.setSelection({id: el._id, isSelected: !this.state.allSelected});
            }
        );
        this.setState({allSelected: !this.state.allSelected});
    }

    render() {
        return (
            <table id='emp-table'>
                <thead>
                    <NavBarContainer onClick={this.onClickSelectAll}
                        icon={(this.state.allSelected)
                            ?  'font-icon ico-f ico-f-ok'
                            :  'font-icon ico-f ico-f-radio'}/>
                </thead>
                <tbody>
                    {this.props.employees.map(employee => {
                        if (!employee.hasOwnProperty('isSelected')) {
                            return (<EmpRowContainer key={employee._id}
                                    employee={employee}
                                    icon={'font-icon ico-f ico-f-radio'}/>)
                        } else if (employee.isSelected) {
                            return (<EmpRowContainer key={employee._id}
                                    employee={employee}
                                    icon={'font-icon ico-f ico-f-ok'}/>)
                        } else {
                            return (<EmpRowContainer key={employee._id}
                                    employee={employee}
                                    icon={'font-icon ico-f ico-f-radio'}/>)
                        }
                    })}
                </tbody>
            </table>
        )
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {ln_class: "", fn_class: "", rl_class: ""};
        this.highlightLn = this.highlightLn.bind(this);
        this.highlightFn = this.highlightFn.bind(this);
        this.highlightRl = this.highlightRl.bind(this);
    }

    highlightLn() {
        this.setState({ln_class: "highlighted", fn_class: "", rl_class: ""});
    }
    highlightFn() {
        this.setState({ln_class: "", fn_class: "highlighted", rl_class: ""});
    }
    highlightRl() {
        this.setState({ln_class: "", fn_class: "", rl_class: "highlighted"});
    }

    render() {

        return (
            <tr id="nav-bar">
                <SelectAll icon={this.props.icon} onClick={this.props.onClick}/>
                <th id="ln"
                    className={this.state.ln_class}
                    onClick={() => {
                        this.props.sortByParam('last_name');
                        this.highlightLn();
                    }}>LAST NAME
                    <span className="font-icon ico-f ico-f-sorting"></span>
                </th>
                <th id="fn"
                    className={this.state.fn_class}
                    onClick={() => {
                        this.props.sortByParam('first_name');
                        this.highlightFn();
                    }}>FIRST NAME
                    <span className="font-icon ico-f ico-f-sorting"></span>
                </th>
                <th id="rl"
                    className={this.state.rl_class}
                    onClick={() => {
                        this.props.sortByParam('role');
                        this.highlightRl();
                    }}>ROLE
                    <span className="font-icon ico-f ico-f-sorting"></span>
                </th>
                <th className="table-arrow">
                </th>
            </tr>
        );
    }
}

/*
 * Navigation Bar
 */
const mapStateToProps = state => ({
    items: state.emps.items
});

const mapDispatchToProps = dispatch => ({
    toggleSelection: ({id}) => dispatch(toggleSelection({id})),
    setSelection: ({id, isSelected}) => dispatch(setSelection({id, isSelected})),
    sortByParam: (param) => dispatch(sortByParam(param))
});

const EmpTableContainer = connect(mapStateToProps, mapDispatchToProps)(EmpTable);
const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

const SelectAll = (props) => (
    <th className={props.icon} onClick={props.onClick}>
        <div className="font-icon ico-f ico-f-dropdown"></div>
    </th>
);

export {EmpTableContainer};
