import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { CommonSelectProps, FetchVendorsProps } from '../../../models/products';

export interface VendorsProps {
  vendors?: CommonSelectProps[]
}

export const setVendors = createCustomAction('vendors/setVendors', (data: FetchVendorsProps[]) => ({
  data
}))

const actions = { setVendors };

type Action = ActionType<typeof actions>;

const reducer = (
  state: VendorsProps = {},
  action: Action) => {
  switch (action.type) {
    case getType(setVendors):
      return {
        ...state,
        vendors: action.data.map(item => ({ id: item.id, name: item.name }))
      }
    default:
      return state
  }
}

export default reducer;