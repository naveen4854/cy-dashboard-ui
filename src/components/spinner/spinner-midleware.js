import { BeginTask, EndTask, EndAllTasks } from './spinner.reducer'

const defaultTypeSuffixes = ['PENDING', 'FULFILLED', 'REJECTED']

export default function spinnerMiddleware(config = {}) {
  const promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes
  const scope = config.scope || 'default'

  return ({ getState, dispatch }) => next => (action) => {
    if (action.type) {
      console.log(action.type, "action.type")
      const [PENDING, FULFILLED, REJECTED] = promiseTypeSuffixes

      const isPending = new RegExp(`${PENDING}$`, 'g')
      const isFulfilled = new RegExp(`${FULFILLED}$`, 'g')
      const isRejected = new RegExp(`${REJECTED}$`, 'g')

      const actionScope = action.scope || scope

      if (action.type.match(isPending)) {
        console.log('match pending')
      } else if (action.type.match(isFulfilled) ||
        action.type.match(isRejected)) {
        console.log('match isRejected,isFulfilled')
      }
    }

    return next(action)
  }
}