import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleVisibility } from '../actions/menuActions';
import FormattedClock from './FormattedClock';

const Side = (props) => (
    <div className="side-container">
        <div className="establishment">
            <span id="establishment-caption">Establishment:</span>
            <span id="establishment-place">Annette's place</span>
        </div>
        <ul>
            <li className="dashboard">
                <span className="font-icon ico-f ico-f-overview"></span><span className="item-text">Dashboard</span>
                <div className="arrow">
                    <span className="font-icon ico-f ico-f-angle-right"></span>
                </div>
            </li>
            <li>
                <span className="font-icon ico-f ico-f-shopping-cart"></span><span className="item-text">Products</span>
                <div className="arrow">
                    <span className="font-icon ico-f ico-f-angle-right"></span>
                </div>
            </li>
            <li className="employees" onClick={() => props.onEmpClick({main_menu: false, employees_menu: true})}>
                <span className="font-icon ico-f ico-f-employees-many"></span><span className="item-text">Employees</span>
                <div className="arrow">
                    <span className="font-icon ico-f ico-f-angle-right"></span>
                </div>
            </li>
            <li className="quick-books">
                <span className="font-icon ico-f ico-f-at"></span><span className="item-text">QuickBooks</span>
                <div className="arrow">
                    <span className="font-icon ico-f ico-f-angle-right"></span>
                </div>
            </li>
            <li className="settings">
                <span className="font-icon ico-f ico-f-settings"></span><span className="item-text">Settings</span>
                <div className="arrow">
                    <span className="font-icon ico-f ico-f-angle-right"></span>
                </div>
            </li>
        </ul>
        <FormattedClock />
    </div>
)

Side.propTypes = {
  onEmpClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    menu: state.menu
});

const mapDispatchToProps = dispatch => ({
    onEmpClick: visibleMenus => dispatch(toggleVisibility(visibleMenus))
});

const SideContainer = connect(mapStateToProps, mapDispatchToProps)(Side);

export {SideContainer};
