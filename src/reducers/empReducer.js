import {FETCH_EMP_DATA, POST_EMP_DATA,
        UPDATE_EMP_DATA, DELETE_EMP_DATA,
        SELECTION_CHANGE, SELECTION_SET,
        SORT_BY_PARAM} from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {

    switch (action.type) {
        case FETCH_EMP_DATA:
        console.log('fetch emp data');
            return {
                ...state,
                items: action.payload
            };
        case POST_EMP_DATA:
        console.log('post emp data');
            return {
                ...state,
                item: action.payload
            };
        case UPDATE_EMP_DATA:
        console.log('update emp data');
            return {
                ...state,
                items: state.items.map(el => {
                    if (el._id === action.id) {
                        return {...el, ...action.payload };
                    }
                    return el;
                })
            };
        case DELETE_EMP_DATA:
        console.log('delete emp data');
            return {
                ...state,
                items: state.items.filter(el => el._id !== action.id)
            };
        case SELECTION_CHANGE:
            console.log('selection change' + action.id);
            return {
                ...state,
                items: state.items.map(el => {
                    if (el._id === action.id) {
                        return ((el.hasOwnProperty('isSelected'))
                            ? {...el, isSelected: !el.isSelected}
                            : {...el, isSelected: true})
                    }
                    return el;
                })
            };
        case SELECTION_SET:
            console.log('selection set');
            return {
                ...state,
                items: state.items.map(el => {
                    if (el._id === action.id) {
                        return {...el, isSelected: action.isSelected};
                    }
                    return el;
                })
            };
        case SORT_BY_PARAM:
            console.log('sort_by_parameter');

            let sortProp = action.param;
            let mappedItems = state.items.map((el, i) => {
                console.log(el[sortProp]);
                return {
                    ...el,
                    [sortProp]: el[sortProp].toLowerCase(),
                    index: i
                };
            });

            mappedItems.sort((a, b) => {
                if (a[sortProp] > b[sortProp]) {
                    return 1;
                }
                if (a[sortProp] < b[sortProp]) {
                    return -1;
                }
                return 0;
            });

            return {
                ...state,
                items: mappedItems.map(el => {
                    return state.items[el.index];
                })
            };
            default:
                return state;

    }

}
