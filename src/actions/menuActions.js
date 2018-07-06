import {VISIBILITY_CHANGE} from './types';

export const toggleVisibility = visibleMenus => ({
    type: VISIBILITY_CHANGE,
    visibleMenus
});
