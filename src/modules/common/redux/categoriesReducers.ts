import { createCustomAction, ActionType, getType } from 'typesafe-actions';
import { CategoryProps, FetchCategoryProps } from '../../../models/products';

export interface CategoriesProps {
  categories?: CategoryProps[]
}

export const setCategories = createCustomAction('categories/setCategories', (data: FetchCategoryProps[]) => ({
  data
}))

const actions = { setCategories };

type Action = ActionType<typeof actions>;

const reducer = (
  state: CategoriesProps = {},
  action: Action) => {
  switch (action.type) {
    case getType(setCategories):
      return {
        ...state,
        categories: action.data.map(item => ({ id: item.id, name: item.name }))
      }
    default:
      return state
  }
}

export default reducer;