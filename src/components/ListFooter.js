import React, { PureComponent } from 'react';
import { connect } from  'react-redux';
import { setSelection } from '../actions/empActions';
import { toggleVisibility } from '../actions/menuActions';



class ListFooter extends PureComponent {
    constructor(props) {
        super(props);

        this.deselect = this.deselect.bind(this);
    }

    countSelectedItems(empsArray) {
         return empsArray.filter(emp => emp.isSelected === true).length;
    }

    deselect(){
        this.props.items.forEach(el => {
                this.props.setSelection({id: el._id, isSelected: false});
            }
        );
    }

    render() {
        return (
            <span id="employee-selection-footer">
                <span id='selected-count'>{this.countSelectedItems(this.props.items)}</span>
                <span id="employee-selection-footer-caption"> Employee(s) Selected</span>
                <span id="employee-deselect" onClick={this.deselect}
                    >Deselect</span>
                <span className="close-icon font-icon ico-f ico-f-move"
                    onClick={() => this.props.showModalMenu({modal_menu: true, employees_menu: true})}></span>
                <span className="close-icon font-icon ico-f ico-f-empl-perms"></span>
                <span className="close-icon font-icon ico-f ico-f-trash"></span>
            </span>
        )
    }
}

const mapStateToProps = state => ({
    items: state.emps.items,
    menu: state.menu
});

const mapDispatchToProps = dispatch => ({
    setSelection: ({id, isSelected}) => dispatch(setSelection({id, isSelected})),
    showModalMenu: visibleMenus => dispatch(toggleVisibility(visibleMenus))
})

const ListFooterContainer = connect(mapStateToProps, mapDispatchToProps)(ListFooter);


export {ListFooterContainer};
