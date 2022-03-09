import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { CommonSelectProps } from '../../../models/products';

export interface ConditionsProps {
  conditions?: CommonSelectProps[]
}

export const setConditions = createCustomAction('conditions/setConditions', (data: CommonSelectProps[]) => ({
  data
}))

const actions = { setConditions };

type Action = ActionType<typeof actions>;

const reducer = (
  state: ConditionsProps = {},
  action: Action) => {
  switch (action.type) {
    case getType(setConditions):
      return {
        ...state,
        conditions: action.data
      }
    default:
      return state
  }
}

export default reducer;