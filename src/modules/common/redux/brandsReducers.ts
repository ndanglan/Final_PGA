import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { CommonSelectProps } from '../../../models/products';

export interface BrandsProps {
  brands?: CommonSelectProps[]
}

export const setBrands = createCustomAction('brands/setBrands', (data: CommonSelectProps[]) => ({
  data
}))

const actions = { setBrands };

type Action = ActionType<typeof actions>;

const reducer = (
  state: BrandsProps = {},
  action: Action) => {
  switch (action.type) {
    case getType(setBrands):
      return {
        ...state,
        brands: action.data
      }
    default:
      return state
  }
}

export default reducer;