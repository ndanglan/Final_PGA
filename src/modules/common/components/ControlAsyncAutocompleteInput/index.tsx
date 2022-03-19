import React, { useState, useEffect, useCallback } from 'react';
import {
  Controller,
  useFormContext
} from 'react-hook-form'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { Action } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import { makeStyles } from '@mui/styles';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../redux/thunk';
import { API_PATHS } from '../../../../configs/api';
import FormControlGroup from '../FormControlGroup';
import {
  DARK_PURPLE,
  WHITE_COLOR,
} from '../../../../configs/colors';


interface Props {
  label: string,
  name: string,
  labelSize?: number,
  inputSize?: number,
  required: boolean,
}

const useStyles = makeStyles(({
  input: {
    '& .MuiFormControl-root .MuiOutlinedInput-root': {
      padding: 0,
      border: '1px solid #000',

      '& input': {
        padding: '10px 15px'
      },

      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        '& legend': {
          display: 'none'
        }
      }
    },

  }
}))

const ControlAsyncAutocompleteInput = (props: Props) => {
  const { control, watch } = useFormContext();
  const classes = useStyles()
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<
    { id: number | string, value: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(() => {
    return ''
  })

  const fetchVendorsBySearch = useCallback(async (searchValue: { search: string }) => {
    setLoading(true);

    const json = await dispatch(fetchThunk(API_PATHS.getVendors, 'post', searchValue));

    setLoading(false);

    if (json?.success && json.data) {
      const newArr = json.data.map((item: any) => ({ id: item.id, value: item.name }))
      setOptions(newArr)
    }
  }, [dispatch]);

  useEffect(() => {
    fetchVendorsBySearch({ search: searchValue })
  }, [searchValue, fetchVendorsBySearch])

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <FormControlGroup
      label={props.label}
      required={props.required}
      inputSize={props.inputSize ? props.inputSize : 4}
      labelSize={props.labelSize ? props.labelSize : 2}
    >
      <Controller
        control={control}
        name={props.name}
        render={({ field: { onChange, ...others } }) => {

          return (
            <Autocomplete
              {...others}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              ListboxProps={{
                style: {
                  backgroundColor: DARK_PURPLE,
                  color: WHITE_COLOR,
                  border: '1px solid #1a1f33'
                }
              }}
              className={classes.input}
              getOptionLabel={(option) => {
                if (option.value) {
                  return option.value
                }

                return ''
              }}
              options={options}
              loading={loading}
              onChange={(e, data) => {
                onChange(data)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {
                          loading
                            ? <CircularProgress color="inherit" size={20} />
                            : null
                        }
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          )
        }}
      />
    </FormControlGroup>
  )
}

export default ControlAsyncAutocompleteInput