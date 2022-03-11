import React, { useState, memo, useCallback, useEffect } from 'react'
import { Button, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { useStyles } from '../../../styles/makeStyles';
import { FilterUsersProps } from '../../../models/userlist';
import SelectMultiGroupInput from './SelectMultiGroupInput';
import SelectInput from './SelectInput';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import DateRangePickerInput from './DateRangePickerInput';
import TextInput from './TextInput';
import { MEMBERSHIP_DATA, STATUS_DATA, TYPES_DATA } from '../utils';

interface Props {
  filters: FilterUsersProps,
  onChangeFilter(filters: FilterUsersProps): void
}

const FilterUserForm = (props: Props) => {
  const classes = useStyles();
  const { filters, onChangeFilter } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const countries = useSelector((state: AppState) => state.countries.countries)?.map(item => ({ value: item.code, name: item.country }))
  const [openMoreFilter, setOpenMoreFilter] = useState(false);

  const [formValues, setFormValues] = useState<{
    address: string,
    country: string,
    date_range: FilterUsersProps['date_range'],
    date_type: string,
    memberships: string[],
    phone: string,
    search: string,
    state: string,
    status: string[],
    types: string[],
  }>({
    address: filters.address,
    country: filters.country,
    date_range: filters.date_range,
    date_type: filters.date_type,
    memberships: filters.memberships,
    phone: filters.phone,
    search: filters.search,
    state: filters.state,
    status: filters.status,
    types: filters.types,
  });

  const [states, setStates] = useState<{
    code: string,
    country_code: string,
    region_code: string | null,
    state: string,
    state_id: string
  }[]>([])


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
    if (formValues.country) {
      fetchState(formValues.country)
    }
  }, [formValues.country, fetchState])

  return (
    <form
      className="filter-form"
      onSubmit={(e) => {
        e.preventDefault();
        // format lại date_range
        onChangeFilter({
          ...filters,
          ...formValues
        })
      }}>
      <div className="filter-box">
        {/* First row filter */}
        <div className="filter-options">
          <Grid item md={3}>
            <TextInput
              placeHolder="Type to search"
              required={false}
              inputSize={12}
              onChange={(e) => setFormValues({
                ...formValues,
                search: e
              })}
            />
          </Grid>
          <Grid item md={3}>
            <SelectMultiGroupInput
              required={false}
              inputSize={12}
              data={MEMBERSHIP_DATA}
              onChange={(e) => setFormValues({
                ...formValues,
                memberships: e
              })}
            />
          </Grid>
          <Grid item md={3}>
            <SelectMultiGroupInput
              required={false}
              inputSize={12}
              data={TYPES_DATA}
              onChange={(e) => setFormValues({
                ...formValues,
                types: e
              })}
            />
          </Grid>
          <Grid item md={2}>
            <SelectInput
              inputSize={12}
              data={STATUS_DATA}
              required={false}
              onChange={(e) => {
                if (e === 'clear') {
                  setFormValues({
                    ...formValues,
                    status: []
                  })
                  return;
                }

                setFormValues({
                  ...formValues,
                  status: [e]
                })
              }}
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
          {openMoreFilter ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
            <SelectInput
              inputSize={7}
              data={countries ? countries : []}
              required={false}
              label="Country"
              onChange={(e) => setFormValues({
                ...formValues,
                country: e
              })}
            />
            {states.length > 0 ? (
              <SelectInput
                inputSize={7}
                data={states.map(item => (
                  {
                    value: item.code,
                    name: item.state
                  }))}
                required={false}
                label="State"
                onChange={(e) => setFormValues({
                  ...formValues,
                  state: e
                })}
              />
            ) : (
              <TextInput
                label="State"
                placeHolder="Type your state"
                required={false}
                inputSize={7}
                onChange={(e) => setFormValues({
                  ...formValues,
                  state: e
                })}
              />
            )}
            <TextInput
              label="Address"
              placeHolder="Type your address"
              required={false}
              inputSize={7}
              onChange={(e) => setFormValues({
                ...formValues,
                address: e
              })}
            />
            <TextInput
              label="Phone"
              placeHolder="Type your phone"
              required={false}
              inputSize={7}
              onChange={(e) => setFormValues({
                ...formValues,
                phone: e
              })}
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
                >
                  <FormControlLabel
                    sx={{
                      display: 'inline'
                    }}
                    value="R"
                    control={<Radio />}
                    label="Register"
                  />
                  <FormControlLabel
                    sx={{
                      display: 'inline'
                    }}
                    value="L"
                    control={<Radio />}
                    label="Last logged in"
                  />
                </RadioGroup>
              </div>
              <DateRangePickerInput
                range={formValues.date_range}
                inputSize={12}
                required={false}
                onChange={(e) => setFormValues({
                  ...formValues,
                  date_range: [{
                    startDate: e.selection.startDate,
                    endDate: e.selection.endDate,
                    key: e.selection.key,
                  }]
                })}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </form>
  )
}

export default memo(FilterUserForm)