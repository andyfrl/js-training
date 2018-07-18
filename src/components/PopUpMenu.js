import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleVisibility } from '../actions/menuActions';

class PopUpMenu extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.dispatch(
                toggleVisibility({popup_menu: false, employees_menu: true})
            );
        }, 2000);
    }

    render() {
        return (
            <div id="confirmation-box">
               <span className="default-caption-right-padding">
                   Your Employee list has been updated!
               </span>
               <span className="close-icon font-icon ico-f ico-f-cross"
                     onClick={() => {
                         this.props.dispatch(
                             toggleVisibility({popup_menu: false, employees_menu: true})
                         );
                     }}>

              </span>
            </div>
        )
    }
}

const PopUpMenuContainer = connect()(PopUpMenu);
export {PopUpMenu};
export {PopUpMenuContainer};
