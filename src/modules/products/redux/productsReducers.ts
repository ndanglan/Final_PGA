import { CommonSelectProps, ProductsProps } from './../../../models/products';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface ProductsState {
  categories?: CommonSelectProps[];
  products?: ProductsProps[]
}

export const setCategories = createCustomAction('auth/setCategories', (data: CommonSelectProps[]) => ({
  data,
}));

export const setProducts = createCustomAction('auth/setProducts', (data: ProductsProps[]) => ({
  data,
}));

const actions = { setCategories, setProducts };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductsState = {}, action: Action) {
  switch (action.type) {
    case getType(setCategories):
      return { ...state, categories: action.data };
    case getType(setProducts):
      return {
        ...state, products: action.data
      }
    default:
      return state;
  }
}