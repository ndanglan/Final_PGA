import React, { memo, useState } from 'react'
import { DateRange } from 'react-date-range';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';
import FormControlGroup from '../../common/components/FormControlGroup';
import {
  DARK_PURPLE,
  WHITE_COLOR,
  DATE_TEXT_COLOR,
  MEDIUM_PURPLE
} from '../../../configs/colors';
import { InputBase, Popover } from '@mui/material';

interface Props {
  label?: string,
  name: string,
  placeHolder?: string,
  inputSize?: number,
  required: boolean,
}

const useStyles = makeStyles(({
  dateRange: {
    backgroundColor: DARK_PURPLE,
    boxShadow: "0 0.5rem 1rem 0 #1a1f33",

    '& .rdrDateDisplayWrapper': {
      backgroundColor: 'transparent',

      '& .rdrDateDisplay': {
        color: WHITE_COLOR,

        '& input': {
          borderColor: 'transparent'
        }
      }
    },

    '& .rdrMonthAndYearWrapper': {
      '& span': {
        color: DATE_TEXT_COLOR,
        fontSize: '16px'
      }
    },

    '& .rdrMonthsVertical': {
      '& .rdrMonth': {
        '& .rdrWeekDays': {
          '& span': {
            fontSize: '14px',
            color: DATE_TEXT_COLOR
          }
        },

        '& .rdrDays': {

          '& .rdrDay': {

            '& span': {
              color: WHITE_COLOR,
              fontSize: "14px",

              '&::after': {
                backgroundColor: MEDIUM_PURPLE
              }
            },

            '&.rdrDayPassive span': {
              color: DATE_TEXT_COLOR,
            },

            '& .rdrStartEdge, & .rdrInRange, & .rdrEndEdge': {
              color: `${MEDIUM_PURPLE} !important`,
            },
          },
        }
      },
    }
  }
}))

const DateRangePickerInput = (props: Props) => {
  const {
    label,
    placeHolder,
    inputSize,
    required,
    name } = props;
  const { control, watch } = useFormContext()
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [dateRange, setDateRange] = useState(() => {
    if (watch(name).selection.key) {
      console.log('test')
      return [
        watch(name).selection
      ]
    }

    return [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]
  })

  return (
    <FormControlGroup
      label={label}
      required={required}
      inputSize={inputSize ? inputSize : undefined}
    >
      <InputBase
        value={
          moment(dateRange[0].startDate).format('MMM DD,YYYY')
          +
          ' - '
          + moment(dateRange[0].endDate).format('MMM DD,YYYY')
        }
        placeholder={placeHolder}
        componentsProps={
          {
            input: {
              onClick: (e) => handleClick(e)
            }
          }
        }
        inputProps={{
          style: {
            color: '#fff',
            border: '1px solid #13132b',
            outline: 'none',
            padding: '10px 15px',
            fontSize: '15px',
            textAlign: 'left',
            fontWeight: '500',
            borderRadius: '0.25rem',
            backgroundColor: '#252547'
          }
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <DateRange
              ranges={dateRange}
              className={classes.dateRange}
              showMonthAndYearPickers={false}
              showPreview={false}
              showDateDisplay={false}
              onChange={item => {
                if (
                  item?.selection?.key
                  && item?.selection?.startDate
                  && item?.selection?.endDate
                ) {
                  setDateRange([{
                    startDate: item.selection.startDate,
                    endDate: item.selection.endDate,
                    key: item.selection.key,
                  }])

                  field.onChange(item)
                }
              }}
            />
          )}
        />
      </Popover>
    </FormControlGroup>
  )
}

export default memo(DateRangePickerInput)