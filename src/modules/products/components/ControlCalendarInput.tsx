import React, { useState } from 'react'
import { Grid, Popover } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Calendar } from 'react-date-range';
import { Controller, useFormContext } from 'react-hook-form';
import { BG_DISABLE, BLACK_COLOR, DARK_PURPLE, MEDIUM_PURPLE, WHITE_COLOR } from '../../../configs/colors';
import { CalendarTodayIcon } from '../../common/components/Icons';
import InputGroup from '../../common/components/InputGroup';
import { dateTypeToStringType } from '../../common/utils';

interface Props {
  label: string,
  required: boolean,
  inputSize?: number,
  name: string,

}

const useStyles = makeStyles(({
  disableLabel: {
    display: 'flex',

    '& p': {
      flex: '1',
      width: '100%',
      fontSize: '0.875rem',
      borderRadius: '5px 0 0 5px',
      padding: '0.5rem 1rem ',
      backgroundColor: BG_DISABLE,
      color: 'rgba(180,180,219,0.48)',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  priceInput: {
    borderRadius: '0.25rem',
    fontSize: '0.9375rem',
    lineHeight: '1.5rem',
    padding: '0.4rem 1rem',
    margin: '0',
    height: '100% !important',
    border: `1px solid ${MEDIUM_PURPLE} !important`
  },
  dateRange: {
    position: 'absolute',
    zIndex: '1000',
    background: DARK_PURPLE,
    borderRadius: "0.25rem",
    border: `1px solid ${BLACK_COLOR}`,

    '& .rdrMonthPicker, & .rdrYearPicker': {
      '& select': {
        fontSize: '16px',
        fontWeight: "600",
        color: '#ababd2'
      }
    },

    '& .rdrDayNumber span': {
      color: WHITE_COLOR,
      fontSize: '14px',
      fontWeight: '500'
    },

    '& .rdrDayPassive .rdrDayNumber span, .rdrWeekDay': {
      color: '#ababd2'
    },

    '& .rdrWeekDay': {
      fontWeight: '600',
      fontSize: '16px'
    }
  },
}))

const ControlCalendarInput = (props: Props) => {
  const { label, name, inputSize, required } = props
  const classes = useStyles();
  const { watch, control } = useFormContext();
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <InputGroup
      label={label}
      required={required}
      inputSize={inputSize ? inputSize : 6}
    >
      <Grid container>
        <Grid item md={1} className={classes.disableLabel}>
          <p>
            <CalendarTodayIcon />
          </p>
        </Grid>
        <Grid item md={6}>
          <input
            value={dateTypeToStringType(watch(name))}
            type="text"
            className={classes.priceInput}
            onClick={(e) => handleClick(e)}
          />
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            PaperProps={
              {
                sx: {
                  overflow: 'unset'
                }
              }
            }
          >
            <Controller
              control={control}
              name={name}
              render={({
                field: { onChange, ...others }
              }) => (
                <Calendar
                  {...others}
                  color={MEDIUM_PURPLE}
                  date={others.value}
                  className={classes.dateRange}
                  onChange={(e) => {
                    if (e) {
                      onChange(e);
                    }
                  }}
                />
              )}
            />
          </Popover>
        </Grid>
      </Grid>
    </InputGroup>
  )
}

export default ControlCalendarInput