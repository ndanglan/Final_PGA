import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { CommonSelectProps } from '../../../models/products';

export interface ShippingProps {
  shipping?: CommonSelectProps[]
}

export const setShipping = createCustomAction('shipping/setShipping', (data: CommonSelectProps[]) => ({
  data
}))

const actions = { setShipping };

type Action = ActionType<typeof actions>;

const reducer = (
  state: ShippingProps = {},
  action: Action) => {
  switch (action.type) {
    case getType(setShipping):
      return {
        ...state,
        shipping: action.data
      }
    default:
      return state
  }
}

export default reducer;