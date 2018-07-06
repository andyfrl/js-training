import React from 'react';
import { connect } from 'react-redux';

import Main from './Main';
import Header from './Header';

import {EmpListContainer} from './EmpList';
import {SideContainer} from './Side';
import {DetailsContainer} from './Details';
import {ModalMenuContainer} from './ModalMenu';

import store from '../store';

const App = ({props}) => (
<div id="container">
    <Header />
    <div className="menu-container">
        <SideContainer />
        {props.employees_menu && <EmpListContainer />}
        {props.employee_details && <DetailsContainer />}
        {props.main_menu && <Main />}
        {props.modal_menu && <ModalMenuContainer />}
    </div>
</div>
)

const mapStateToProps = state => ({
    props: state.menu
});

const AppContainer = connect(mapStateToProps, null)(App);

export {AppContainer};
