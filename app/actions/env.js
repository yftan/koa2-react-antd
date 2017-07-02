import fetch from 'isomorphic-fetch'

export const ENV_STATE_REQUEST = 'ENV_STATE_REQUEST'
export const ENV_STATE_SUCCEED = 'ENV_STATE_SUCCEED'
export const ENV_STATE_FAILED = 'ENV_STATE_FAILED'

//服务端使用http.request方法需要完整路径
//客户端使用ajax，使用相对路径
//这里也可以使用 __SERVER__ ＝ typeof window !== 'undefined'
const fetchStateUrl = __SERVER__ ? `http://localhost:${require('../../platforms/common/config').port}/api/env` : '/api/env'

export function fetchEnvState() {
  return dispatch => {
    dispatch(envStateRequest())
    return fetch(fetchStateUrl)
      .then(res => res.json())
      .then(data => {
        dispatch(envStateSucceed(data))
      })
      .catch(e => dispatch(envStateFailed(e)))
  }
}

export function fetchEnvStateIfNeeded(state) {
  return (dispatch) => {
    return dispatch(fetchEnvState())
  }
}

export function envStateRequest() {
  return {
    type: ENV_STATE_REQUEST
  }
}
export function envStateSucceed(data) {
  return {
    type: ENV_STATE_SUCCEED,
    data: data
  }
}
export function envStateFailed(error) {
  console.log('Envirenment state get failed', error)
  return {
    type: ENV_STATE_FAILED,
    error
  }
}