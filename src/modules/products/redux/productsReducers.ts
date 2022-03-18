import { ProductsProps } from './../../../models/products';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface ProductsState {
  products?: ProductsProps[]
}

export const setProducts = createCustomAction('auth/setProducts', (data: ProductsProps[]) => ({
  data,
}));

const actions = { setProducts };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductsState = {}, action: Action) {
  switch (action.type) {
    case getType(setProducts):
      return {
        ...state, products: action.data
      }
    default:
      return state;
  }
}