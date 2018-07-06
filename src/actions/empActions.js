import {FETCH_EMP_DATA, POST_EMP_DATA,
        DELETE_EMP_DATA, UPDATE_EMP_DATA,
        SELECTION_CHANGE, SELECTION_SET,
        SORT_BY_PARAM} from './types';

/* fetching action with signaturre (), that returns
 * a function with signature (dispatch) that reduces
 * post data using dispatch from thunk */
export const fetchEmps = () => dispatch => {
    fetch('/employees')
    .then(res => res.json())
    .then(posts => dispatch({
            type: FETCH_EMP_DATA,
            payload: posts
        })
    ).catch(() => {
        console.dir('Unable to fetch employees');
    });
};

export const createEmp = postData => dispatch => {
    fetch('/add_employee', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(post => dispatch({
                type: POST_EMP_DATA,
                payload: post
            })
        );
};

export const deleteEmp = (id) => dispatch => {
    console.log('deleting employee');
    fetch(`/employees/delete/${id}`, {
        method: 'DELETE',
    }).then(res => dispatch({
                type: DELETE_EMP_DATA,
                id: id
            })
    );
};

export const updateEmp = (id, updatedData) => dispatch => {
    console.log(updatedData);
    fetch(`/employees/update/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
        .then(res => dispatch({
                type: UPDATE_EMP_DATA,
                id: id,
                payload: updatedData
            })
        ).catch(() => {
            console.dir('Unable to UPDATE');
        });
};

export const toggleSelection = ({id}) => ({
    type: SELECTION_CHANGE,
    id: id
});

export const setSelection = ({id, isSelected}) => ({
    type: SELECTION_SET,
    id: id,
    isSelected: isSelected
});

export const sortByParam = (param) => ({
    type: SORT_BY_PARAM,
    param: param
});
