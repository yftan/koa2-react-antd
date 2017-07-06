import fetch from 'isomorphic-fetch'

export const MAIN_RECEIVE_SUMMARY = 'MAIN_RECEIVE_SUMMARY'
export const MAIN_RECEIVE_LINECHART = 'MAIN_RECEIVE_LINECHART'
export const MAIN_LINECHART_DELETED = 'MAIN_LINECHART_DELETED'

export function fetchSummaryData() {
    return dispatch => {
        fetch('/api/summary',  {
                credentials: 'same-origin'
            })
            .then( tresponse => {
                return tresponse.json()
            })
            .then( tjson => {
                dispatch({
                    type : MAIN_RECEIVE_SUMMARY,
                    data : tjson.data
                })
            })
    }
}

export function fetchMainChartData() {
    return dispatch => {
        fetch('/api/linechart', {
            credentials: 'same-origin'
        })
        .then( tresponse => {
                return tresponse.json()
        })
        .then( tjson => {
            dispatch({
                type : MAIN_RECEIVE_LINECHART,
                data : tjson.data
            })
        })
    }
}

export function deleteLineChart() {
    return {
        type : MAIN_LINECHART_DELETED,
    }
}