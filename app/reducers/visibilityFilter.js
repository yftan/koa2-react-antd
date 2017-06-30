/**
 * Created by tanyufeng on 2017/6/28.
 */
import {
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from '../actions/notes';
const { SHOW_ALL,SHOW_ACTIVE } = VisibilityFilters;
function visibilityFilter(state = SHOW_ACTIVE, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}
export default visibilityFilter;