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
  categories?: CategoryProps[],
  conditions?: CommonSelectProps[],
  countries?: CountriesDataProps[],
  shipping?: CommonSelectProps[]
  vendors?: CommonSelectProps[]
}

// export interface BrandsProps {
//   brands?: CommonSelectProps[]
// }

// export interface CategoriesProps {
//   categories?: CategoryProps[]
// }

// export interface ConditionsProps {
//   conditions?: CommonSelectProps[]
// }



// export interface CountriesProps {
//   countries?: CountriesDataProps[]
// }

// export interface ShippingProps {
//   shipping?: CommonSelectProps[]
// }

// export interface VendorsProps {
//   vendors?: CommonSelectProps[]
// }

export const setBrands = createCustomAction('brands/setBrands', (data: CommonSelectProps[]) => ({
  data
}))

export const setCategories = createCustomAction('categories/setCategories', (data: FetchCategoryProps[]) => ({
  data
}))

export const setConditions = createCustomAction('conditions/setConditions', (data: CommonSelectProps[]) => ({
  data
}))

export const setCountries = createCustomAction('countries/setCountries', (data: CountriesDataProps[]) => ({
  data
}))

export const setShipping = createCustomAction('shipping/setShipping', (data: CommonSelectProps[]) => ({
  data
}))

export const setVendors = createCustomAction('vendors/setVendors', (data: FetchVendorsProps[]) => ({
  data
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