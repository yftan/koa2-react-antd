import {MAIN_RECEIVE_SUMMARY,MAIN_RECEIVE_LINECHART,MAIN_LINECHART_DELETED} from '../actions/summary'

const initState = {
   
        avgTime : '0',
        bounceRate : '0',
        totalVisitors : '0',
        uniqueVisitors : '0',
        uv : [],
        pv : [],
        legends : [],
        chartShow : true
    
}

const summary = (state = initState, action) => {
    switch(action.type) {
        case MAIN_RECEIVE_SUMMARY: {
            return Object.assign({}, state, {
                avgTime : action.data.avgTime,
                bounceRate : action.data.bounceRate,
                totalVisitors : action.data.totalVisitors,
                uniqueVisitors : action.data.uniqueVisitors,
            });
        }

        case MAIN_RECEIVE_LINECHART: {
            return Object.assign({}, state, {
                uv : action.data.uv,
                pv : action.data.pv,
                legends : action.data.legends
            })
        }

        case MAIN_LINECHART_DELETED : {
            return Object.assign({}, state, {
                chartShow : false
            })
        }
           
        default:
            return state;
    }
}

export default summary;
