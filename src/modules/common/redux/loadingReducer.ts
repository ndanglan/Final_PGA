import { createCustomAction, ActionType, getType } from 'typesafe-actions';
export interface LoadingProps {
  isLoading: boolean,
}

export const setLoading = createCustomAction('loading/setLoading', (data: boolean) => ({
  data
}))

const actions = { setLoading };

type Action = ActionType<typeof actions>;

const reducer = (
  state: LoadingProps = { isLoading: false },
  action: Action) => {
  switch (action.type) {
    case getType(setLoading):
      return {
        ...state,
        isLoading: action.data
      }
    default:
      return state
  }
}

export default reducer;