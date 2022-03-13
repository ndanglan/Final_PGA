import React, { memo, useState } from 'react'
import { DateRange } from 'react-date-range';
import InputGroup from '../../common/components/Layout/InputGroup';
import moment from 'moment';
import { makeStyles } from '@mui/styles';
import { DARK_PURPLE, WHITE_COLOR, DATE_TEXT_COLOR, MEDIUM_PURPLE } from '../../../configs/colors';
import { Controller, useFormContext } from 'react-hook-form';

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
  const { label, placeHolder, inputSize, required, name } = props;
  const { control } = useFormContext()

  const classes = useStyles();

  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  return (
    <InputGroup
      label={label}
      required={required}
      inputSize={inputSize ? inputSize : undefined}
    >
      <input
        value={
          moment(dateRange[0].startDate).format('MMM DD,YYYY')
          +
          '-'
          + moment(dateRange[0].endDate).format('MMM DD,YYYY')
        }
        placeholder={placeHolder}
        onClick={() => setShowDateRangePicker(prev => !prev)}
      />
      {showDateRangePicker && (
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
                  item?.selection.key
                  && item?.selection.startDate
                  && item?.selection.endDate
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
      )}
    </InputGroup>
  )
}

export default memo(DateRangePickerInput)