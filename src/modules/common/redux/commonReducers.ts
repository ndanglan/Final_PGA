import {
  createCustomAction,
  ActionType,
  getType
} from 'typesafe-actions';
import {
  CommonSelectProps,
  CategoryProps,
  FetchCategoryProps,
  FetchVendorsProps
} from '../../../models/products';

export interface CountriesDataProps {
  active_currency: string | null
  code: string
  code3: string
  country: string
  currency_id: string
  enabled: string
  id: string
  is_fraudlent: string
}

export interface CommonProps {
  brands?: CommonSelectProps[],
  categories?: CommonSelectProps[],
  conditions?: CommonSelectProps[],
  countries?: CommonSelectProps[],
  shipping?: CommonSelectProps[]
  vendors?: CommonSelectProps[]
}

export const setBrands = createCustomAction('brands/setBrands', (data: CommonSelectProps[]) => ({
  data
}))

export const setCategories = createCustomAction('categories/setCategories', (data: FetchCategoryProps[]) => ({
  data: data.map(item => ({ id: item.id, name: item.name }))
}))

export const setConditions = createCustomAction('conditions/setConditions', (data: CommonSelectProps[]) => ({
  data
}))

export const setCountries = createCustomAction('countries/setCountries', (data: CountriesDataProps[]) => ({
  data: data.map(item => ({ id: item.code, name: item.country }))
}))

export const setShipping = createCustomAction('shipping/setShipping', (data: CommonSelectProps[]) => ({
  data
}))

export const setVendors = createCustomAction('vendors/setVendors', (data: FetchVendorsProps[]) => ({
  data: data.map(item => ({ id: item.id, name: item.name }))
}))

const actions = {
  setBrands,
  setCategories,
  setConditions,
  setCountries,
  setShipping,
  setVendors
};

type Action = ActionType<typeof actions>;

const reducer = (
  state: CommonProps = {},
  action: Action) => {
  switch (action.type) {
    case getType(setBrands):
      return {
        ...state,
        brands: action.data
      }
    case getType(setCategories):
      return {
        ...state,
        categories: action.data
      }
    case getType(setConditions):
      return {
        ...state,
        conditions: action.data
      }
    case getType(setCountries):
      return {
        ...state,
        countries: action.data
      }
    case getType(setShipping):
      return {
        ...state,
        shipping: action.data
      }
    case getType(setVendors):
      return {
        ...state,
        vendors: action.data
      }
    default:
      return state
  }
}

export default reducer;