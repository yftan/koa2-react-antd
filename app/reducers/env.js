import {
  ENV_STATE_FAILED,
  ENV_STATE_SUCCEED,
  ENV_STATE_REQUEST
} from '../actions/env'

export default (state = {}, action) => {
  switch (action.type) {
    case ENV_STATE_REQUEST:
      return {...state
      }
    case ENV_STATE_SUCCEED:
      // console.log(action.data)
      const _data = {
        envConfig: action.data,
        loaded: true
      }
      return {...state,
        ..._data
      }
    case ENV_STATE_FAILED:
      return {...state,
        loaded: false
      }
    default:
      return state
  }
}

