import {VISIBILITY_CHANGE} from '../actions/types';

const initialState = {
    employees_menu: false,
    employee_details: false,
    main_menu: true,
    modal_menu: false
}

export default function(state = initialState, action) {

    switch (action.type) {

        case VISIBILITY_CHANGE:
        console.log(action);
            return {
                ...state,
                employees_menu: action.visibleMenus.employees_menu,
                employee_details: action.visibleMenus.employee_details,
                main_menu: action.visibleMenus.main_menu,
                modal_menu: action.visibleMenus.modal_menu
            };
        default:
            return state;
    }

}
