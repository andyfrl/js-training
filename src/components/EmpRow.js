import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from  'react-redux';
import { toggleSelection } from '../actions/empActions';

class EmpRow extends PureComponent {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log('update ROW');
    }

    onClick() {
        this.props.toggleSelection({id: this.props.employee._id});
    }

    render() {
        return (
            <tr>
                <SelectItem onClick={this.onClick} icon={this.props.icon}/>
                <td className="l-name">{this.props.employee.last_name}</td>
                <td className="f-name">{this.props.employee.first_name}</td>
                <td className="role">{this.props.employee.role}</td>
                <td className="table-arrow">
                    <span className="font-icon ico-f ico-f-angle-right"></span>
                </td>
            </tr>
        )
    }
}

// EmpRow.propTypes = {
//     lastName: PropTypes.string.isRequired,
//     firstName: PropTypes.string.isRequired,
//     role: PropTypes.string.isRequired
// };


const SelectItem = (props) => (
    <td className={props.icon} onClick={props.onClick}>
    </td>
);

const mapStateToProps = state => ({
    elements: state.elements
});

export const EmpRowContainer = connect(mapStateToProps, { toggleSelection })(EmpRow);
