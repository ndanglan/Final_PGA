import React, {
  useState,
  memo,
  useCallback,
  useEffect
} from 'react'
import {
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { FormProvider, useForm } from 'react-hook-form';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { useStyles } from '../../../styles/makeStyles';
import { FilterUsersProps } from '../../../models/userlist';
import ControlSelectMultiGroupInput from '../../common/components/ControlSelectMultiGroupInput';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import DateRangePickerInput from './DateRangePickerInput';
import { MEMBERSHIP_DATA, STATUS_DATA } from '../utils';
import ControlNormalInput from '../../common/components/ControlNormalInput';
import ControlSelectInput from '../../common/components/ControlSelectInput';
import { GroupInputProps } from '../../../models/input';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../../common/components/Icons';
import useFetchCommonData from '../../common/hooks/useFetchCommonData';
import { CountriesDataProps } from '../../../models/common';

interface Props {
  filters: FilterUsersProps,
  onChangeFilter(filters: FilterUsersProps): void,
  roles: GroupInputProps[]
}

const UserListFilterForm = (props: Props) => {
  const { filters, roles, onChangeFilter } = props;
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const { data: countries } = useFetchCommonData(API_PATHS.getCountry);

  const [openMoreFilter, setOpenMoreFilter] = useState(false);

  const [states, setStates] = useState<{
    code: string,
    country_code: string,
    region_code: string | null,
    state: string,
    state_id: string
  }[]>([])

  const methods = useForm<{
    address: string,
    country: string,
    date_range: FilterUsersProps['date_range'],
    date_type: string,
    memberships: FilterUsersProps['memberships'],
    phone: string,
    search: string,
    state: string,
    status: string,
    types: FilterUsersProps['types'],
  }>({
    defaultValues: {
      address: filters.address,
      country: filters.country,
      date_range: filters.date_range,
      date_type: filters.date_type,
      memberships: filters.memberships,
      phone: filters.phone,
      search: filters.search,
      state: filters.state,
      status: filters.status[0] ? filters.status[0] : '0',
      types: filters.types,
    }
  });

  const country = methods.watch('country');

  const onSubmit = (data: {
    address: string,
    country: string,
    date_range: FilterUsersProps['date_range'],
    date_type: string,
    memberships: FilterUsersProps['memberships'],
    phone: string,
    search: string,
    state: string,
    status: string,
    types: FilterUsersProps['types'],
  }) => {
    onChangeFilter({
      ...filters,
      ...data,
      page: 1
    })
  }

  const toggleFilter = () => {
    setOpenMoreFilter((prev) => !prev)
  }

  const fetchState = useCallback(async (code: string) => {
    const json = await dispatch(fetchThunk(API_PATHS.getState, 'post', { code: code }))

    if (json.success) {
      setStates(json.data)
      return;
    }

    setStates([])
  }, [dispatch])

  useEffect(() => {
    if (country) {
      fetchState(country);
      methods.setValue('state', '')
    }
  }, [country, fetchState, methods])

  useEffect(() => {
    methods.setValue('address', filters.address)

    methods.setValue('country', filters.country)

    methods.setValue('date_range', filters.date_range)

    methods.setValue('date_type', filters.date_type)

    methods.setValue('memberships', filters.memberships)

    methods.setValue('phone', filters.phone)

    methods.setValue('search', filters.search)

    methods.setValue('state', filters.state)

    methods.setValue('status', filters.status[0] ? filters.status[0] : '0')

    methods.setValue('types', filters.types)
  }, [filters, methods])

  return (
    <FormProvider {...methods}>
      <form
        className="filter-form"
        onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="filter-box">
          {/* First row filter */}
          <div className="filter-options">
            <Grid item md={6}>
              <ControlNormalInput
                name="search"
                required={{
                  value: false,
                  message: ''
                }}
                label=""
                inputSize={12}
                labelSize={0}
                placeHolder="Search keyword"
              />
            </Grid>
            <Grid item md={3}>
              <ControlSelectMultiGroupInput
                name='memberships'
                required={false}
                inputSize={12}
                labelSize={0}
                data={MEMBERSHIP_DATA}
                placeHolder={'All memberships'}
              />
            </Grid>
            <Grid item md={3}>
              <ControlSelectMultiGroupInput
                name='types'
                required={false}
                inputSize={12}
                labelSize={0}
                data={roles}
                placeHolder={'All user types'}
              />
            </Grid>
            <Grid item md={2}>
              <ControlSelectInput
                label=''
                name='status'
                required={{
                  value: false,
                  message: ''
                }}
                data={STATUS_DATA}
                labelSize={0}
                inputSize={12}
              />
            </Grid>
            <div className={classes.mainButton} style={{
              marginBottom: '1.5rem'
            }}>
              <Button
                type="submit"
                className={classes.mainButton}
              >Search
              </Button>
            </div>
          </div>

          {/* toggle button */}
          <div className="toggle-btn" onClick={toggleFilter}>
            {openMoreFilter
              ? <KeyboardArrowUpIcon />
              : <KeyboardArrowDownIcon />}
          </div>

          {/* Second row hidden*/}
          <div
            className="filter-options"
            style={{
              alignItems: 'flex-start',
              height: openMoreFilter ? '270px' : '0',
              opacity: openMoreFilter ? '1' : '0',
              pointerEvents: openMoreFilter ? 'auto' : 'none'
            }}>
            <Grid item md={5}>
              <ControlSelectInput
                label="Country"
                name='country'
                required={{
                  value: false,
                  message: ''
                }}
                defaultValue={'0'}
                data={countries
                  ? [
                    { value: '0', name: 'Select country' },
                    ...countries.map(
                      (item: CountriesDataProps) =>
                        ({ value: item.code, name: item.country }))
                  ]
                  : []}
                inputSize={7}
              />
              {states.length > 0 ? (
                <ControlSelectInput
                  label="State"
                  name='state'
                  required={{
                    value: false,
                    message: ''
                  }}
                  data={states.map(item => (
                    {
                      value: item.state,
                      name: item.state
                    }))}
                  inputSize={7}
                />
              ) : (
                <ControlNormalInput
                  name="state"
                  required={{
                    value: false,
                    message: ''
                  }}
                  label="State"
                  inputSize={7}
                  placeHolder="Type your state"
                />
              )}
              <ControlNormalInput
                name="address"
                required={{
                  value: false,
                  message: ''
                }}
                label="Address"
                inputSize={7}
                placeHolder="Type your address"
              />
              <ControlNormalInput
                name="phone"
                required={{
                  value: false,
                  message: ''
                }}
                label="Phone"
                inputSize={7}
                placeHolder="Type your phone"
              />
            </Grid>
            <Grid container md={5}>
              <Grid item md={4} sx={{
                padding: '9px'
              }}>
                User Activity
              </Grid>
              <Grid item md={8}>
                {/* radio */}
                <div style={{
                  marginBottom: '5px'
                }}>
                  <RadioGroup
                    defaultValue="R"
                    sx={{
                      flexDirection: 'row'
                    }}
                    onChange={(e) => {
                      methods.setValue('date_type', e.target.value)

                    }}
                  >
                    <FormControlLabel
                      sx={{
                        display: 'inline'
                      }}
                      value="R"
                      control={<Radio
                        checked={methods.watch('date_type') === 'R'}
                      />}
                      label="Register"
                    />
                    <FormControlLabel
                      sx={{
                        display: 'inline'
                      }}
                      value="L"
                      control={<Radio
                        checked={methods.watch('date_type') === 'L'}
                      />}
                      label="Last logged in"
                    />
                  </RadioGroup>
                </div>
                <DateRangePickerInput
                  inputSize={12}
                  required={false}
                  name="date_range"
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default memo(UserListFilterForm)