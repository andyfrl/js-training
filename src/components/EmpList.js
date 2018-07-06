import React , { Component } from 'react';
import { EmpTableContainer } from './EmpTable';
import { connect } from  'react-redux';
import { fetchEmps } from '../actions/empActions';
import { deleteEmp } from '../actions/empActions';
import { toggleVisibility } from '../actions/menuActions';
import MenuHeading from './MenuHeading';
import {ListFooterContainer} from './ListFooter';


class EmpList extends Component {
    constructor(props) {
        super(props);

        this.onClickDel = this.onClickDel.bind(this);
        this.onClickAdd = this.onClickAdd.bind(this);
    }

    componentWillMount() {
        this.props.fetchEmps();
    }

    onClickDel() {
        this.props.emps.forEach(element => {
            if (element.isSelected) {
                this.props.deleteEmp(element._id);
            }
        });
    }

    onClickAdd() {
        this.props.createEmp({employees_menu: false, employee_details: true});
    }

    render() {
        return (
            <div id="employee-list">
                <MenuHeading />
                <ListControls onClickDel={this.onClickDel}
                              onClickAdd={this.onClickAdd}/>
                <EmpTableContainer employees={this.props.emps} />
                <ListFooterContainer />
            </div>
        )
    }
}

const ListControls = ({onClickAdd, onClickDel}) => (
    <span id="emp-list-controls">
        <span id="table-caption">Employee List</span>
        <span id="control-btns">
            <button className="upload del-employee" onClick={onClickDel}>- Del</button>
            <button className="add add-employee" onClick={onClickAdd}>+ Add</button>
        </span>
    </span>
);

const mapStateToProps = state => ({
    emps: state.emps.items,
    menu: state.menu
});

const mapDispatchToProps = dispatch => ({
    fetchEmps: () => dispatch(fetchEmps()),
    deleteEmp: (id) => dispatch(deleteEmp(id)),
    createEmp: (visibleMenus) => dispatch(toggleVisibility(visibleMenus))
});

export const EmpListContainer = connect(mapStateToProps, mapDispatchToProps)(EmpList);
