import { createCustomAction, ActionType, getType } from 'typesafe-actions';

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

export interface CountriesProps {
  countries?: CountriesDataProps[]
}

export const setCountries = createCustomAction('countries/setCountries', (data: CountriesDataProps[]) => ({
  data
}))

const actions = { setCountries };

type Action = ActionType<typeof actions>;

const reducer = (
  state: CountriesProps = {},
  action: Action) => {
  switch (action.type) {
    case getType(setCountries):
      return {
        ...state,
        countries: action.data
      }
    default:
      return state
  }
}

export default reducer;