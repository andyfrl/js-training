import React, { Component } from 'react';

 class RolePermissions extends Component {
    constructor(props) {
        super(props);

        this.foldRows = this.foldRows.bind(this);

        this.state = {
            group_1: {
                visibility: "visible"
            },
            group_2: {
                visibility: "visible"
            },
            group_3: {
                visibility: "visible"
            },
            group_4: {
                visibility: "visible"
            }
        }
    }


    foldRows(group) {
        console.log(this.state[group]);
        if (this.state[group].visibility === "visible") {
            this.setState({[group]: {visibility:"collapse"}});
        } else {
            this.setState({[group]: {visibility:"visible"}});
        }

    }

    render() {
        return (
            <div id='role-permissions'>
                <div id='role-permissions-table-heading'>
                    Role Permissions
                </div>
                <table>
                    <thead>
                        <tr>
                            <th id='empty-cell'></th>
                            <th>Owner <span className="font-icon ico-f ico-f-info"></span></th>
                            <th>+Add Role</th>
                            <th>+Add Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PermissionRow rowType="foldable" rowText="POS Permissions"
                                       onClick={this.foldRows}
                                       arg="group_1"/>

                        <PermissionRow rowType="regular" rowText="Manager Access"
                                       style={this.state.group_1}/>
                        <PermissionRow rowType="regular" rowText="iPad reports"
                                       style={this.state.group_1}/>
                        <PermissionRow rowType="regular" rowText="Perform Returns Exchanges & Refunds"
                                       style={this.state.group_1}/>
                        <PermissionRow rowType="regular" rowText="Override Price"
                                       style={this.state.group_1}/>
                        <PermissionRow rowType="regular" rowText="Apply Discounts"
                                       style={this.state.group_1}/>
                        <PermissionRow rowType="regular" rowText="Pay-In / Pay-Out"
                                       style={this.state.group_1}/>
                        <PermissionRow rowType="regular" rowText="Refresh POS"
                                       style={this.state.group_1}/>

                        <PermissionRow rowType="foldable" rowText="Employee Modifictaions"
                                       onClick={this.foldRows}
                                       arg="group_2"/>

                        <PermissionRow rowType="foldable" rowText="Product Modifications"
                                       onClick={this.foldRows}
                                       arg="group_3"/>

                        <PermissionRow rowType="regular" rowText="Set Price"
                                       style={this.state.group_3}/>
                        <PermissionRow rowType="regular" rowText="Set Cost"
                                       style={this.state.group_3}/>
                        <PermissionRow rowType="regular" rowText="Change Quantity"
                                       style={this.state.group_3}/>
                        <PermissionRow rowType="regular" rowText="Create and Manage Tabs"
                                       style={this.state.group_3}/>
                        <PermissionRow rowType="regular" rowText="Create Discounts"
                                       style={this.state.group_3}/>
                        <PermissionRow rowType="regular" rowText="Import and Export Products"
                                       style={this.state.group_3}/>


                        <PermissionRow rowType="foldable" rowText="Back Office Access"
                                       onClick={this.foldRows}
                                       arg="group_4"/>

                        <PermissionRow rowType="regular" rowText="Account Info"
                                       style={this.state.group_4}/>
                        <PermissionRow rowType="regular" rowText="Billing Page"
                                       style={this.state.group_4}/>
                        <PermissionRow rowType="regular" rowText="View Reports"
                                       style={this.state.group_4}/>
                        <PermissionRow rowType="regular" rowText="View Employees"
                                       style={this.state.group_4}/>
                        <PermissionRow rowType="regular" rowText="Settings"
                                       style={this.state.group_4}/>
                    </tbody>
                </table>
                <span id="control-btns">
                    <button className="upload del-employee" >Cancel</button>
                    <button className="add add-employee" >Save</button>
                </span>
            </div>
        );
    }
}

class PermissionRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foldable_icon: "font-icon ico-f ico-f-angle-up"
        };

        this.toggleIcon = this.toggleIcon.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    generateCheckedCell() {
        return (
            <td>
                <span className='font-icon ico-f ico-f-ok'>
                </span>
            </td>
        )
    }

    toggleIcon() {
        (this.state.foldable_icon === "font-icon ico-f ico-f-angle-up")
        ? this.setState({foldable_icon: "font-icon ico-f ico-f-angle-down"})
        : this.setState({foldable_icon: "font-icon ico-f ico-f-angle-up"});
    }

    handleClick() {
        this.props.onClick(this.props.arg);
        this.toggleIcon();
    }

    render() {
        if (this.props.rowType === 'regular') {
            return (
                <tr className='regular-row' style={this.props.style}>
                    <td>{this.props.rowText}</td>
                    {this.generateCheckedCell()}
                    <td></td>
                    <td></td>
                </tr>
            );
        } else {
            return (
                <tr className='foldable-row'>
                    <td>
                        <span className={this.state.foldable_icon}
                              onClick={this.handleClick}>
                        </span>
                        {this.props.rowText}
                    </td>
                    {this.generateCheckedCell()}
                    <td></td>
                    <td></td>
                </tr>
            );
        }
    }
}

export {RolePermissions};
