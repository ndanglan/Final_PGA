import React, { useState } from 'react'
import { Checkbox, FormControlLabel, Switch, Typography, Grid, Select, MenuItem, FormControl } from '@mui/material'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import InputGroup from '../../common/components/Layout/InputGroup'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ArrowDropDownIcon, ArrowDropUpIcon, CalendarTodayIcon, KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '../../common/components/Icons';
import { Editor } from '@tinymce/tinymce-react';
import { API_TYNY_KEY, contentCSS, plugins } from '../../../configs/textEditor';
import { makeStyles } from '@mui/styles';
import { BG_DISABLE, BLACK_COLOR, DARK_PURPLE, MEDIUM_BLUE, MEDIUM_PURPLE, WHITE_COLOR } from '../../../configs/colors';
import FormSeperateSpace from '../../common/components/Layout/FormSeperateSpace';
import { Calendar } from 'react-date-range';

interface Props {
  title: string
}

const useStyles = makeStyles(({
  switch: {
    '&.MuiSwitch-root': {
      padding: '8px',
      marginTop: '-2px',

      '& .MuiSwitch-switchBase': {
        color: WHITE_COLOR,

        '& .MuiSwitch-thumb ': {
          borderRadius: '7px'
        }
      },

      '& .MuiSwitch-track': {
        borderRadius: '22/2',
        backgroundColor: WHITE_COLOR,

        '&:before, &:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 30,
          height: 30,
        },
      },

      '& .Mui-checked+.MuiSwitch-track': {
        backgroundColor: MEDIUM_PURPLE,
        opacity: '1',
      }
    },
  },
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
    height: '100%',
    border: `1px solid ${MEDIUM_PURPLE} !important`
  },

  select: {
    '&.MuiOutlinedInput-root': {
      borderRadius: '0.25rem',
      color: '#fff',
      width: '40%',

      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: MEDIUM_PURPLE
      },

      '& .MuiSelect-select': {
        backgroundColor: MEDIUM_BLUE,
        border: `1px solid ${MEDIUM_PURPLE}`,
        color: '#fff',
        textAlign: 'left',
        fontSize: '0.9375rem',
        lineHeight: '1.5rem',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '& .MuiSvgIcon-root': {
        color: '#fff'
      },

      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        '& legend': {
          width: '0',
        }
      }
    }
  },

  dateRange: {
    position: 'absolute',
    right: '-30%',
    top: '-100px',
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
  }
}))

const InfoProductForm = (props: Props) => {
  const classes = useStyles();
  const { title } = props;
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <form>
      <div className="part1">
        <Typography variant="h4" sx={{
          marginBottom: '30px'
        }}>
          {title}
        </Typography>
        <InputGroup
          label="vendor"
          required={true}
        >
          <input
            type="text"
            placeholder="Type vendor name to select"
          />
        </InputGroup>
        <InputGroup
          label="Product Title"
          required={true}
        >
          <input
            type="text"
            placeholder="Type title "
          />
        </InputGroup>
        <InputGroup
          label="Brand"
          required={true}
        >
          <input
            type="text"
            placeholder="Type brand name to select"
            style={{
              cursor: 'pointer'
            }}
          />
          <ArrowDropDownIcon
            sx={{
              position: 'absolute',
              right: '20px',
              top: '8px'
            }}
          />
        </InputGroup>
        <InputGroup
          label="Condition"
          required={true}
        >
          <Select
            label=""
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#323259',
                  color: '#fff',
                }
              }
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </InputGroup>
        <InputGroup
          label="Used Conditions"
          required={false}
        >
          <Select
            label=""
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#323259',
                  color: '#fff',
                }
              }
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </InputGroup>
        <InputGroup
          label="SKU"
          required={false}
        >
          <input
            type="text"
          />
        </InputGroup>
        <InputGroup
          label="Image"
          required={true}
        >
          <input
            type="file"
            hidden
          />
          <div style={{
            width: '130px',
            height: '130px',
            border: '1px dashed #fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <CameraAltIcon
              sx={{
                width: '50px',
                height: '50px'
              }}
            />
          </div>
        </InputGroup>
        <InputGroup
          label="Category"
          required={true}
          inputSize={6}
        >
          <input
            type="text"
            placeholder="Type categories name to select"
            style={{
              cursor: 'pointer'
            }}
          />
          <ArrowDropDownIcon
            sx={{
              position: 'absolute',
              right: '20px',
              top: '8px'
            }}
          />
        </InputGroup>
        <InputGroup
          label="Description"
          required={true}
          inputSize={6}
        >
          <Editor
            apiKey={API_TYNY_KEY}
            //  onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>Enter text here...</p>"
            init={{
              height: 250,
              width: '100%',
              content_css: contentCSS,
              menubar: false,
              plugins: plugins,
              toolbar:
                'bold | italic | code' +
                ' bullist numlist | ',
              toolbar_mode: 'sliding',
              content_style: 'body { font-family:OpenSans,Arial,sans-serif; font-size:16px }',
              statusbar: false,
              skin: 'oxide'
            }}
          />
        </InputGroup>
        <InputGroup
          label="Available for sale"
          required={true}
          inputSize={6}
        >
          <Switch defaultChecked className={classes.switch} />
        </InputGroup>
      </div>
      <FormSeperateSpace />
      <div className="part2">
        <Typography variant="h4" sx={{
          margin: '15px 0'
        }}>
          Prices & Inventory
        </Typography>
        <InputGroup
          label="Memberships"
          required={false}
        >
          <Select
            label=""
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#323259',
                  color: '#fff',
                }
              }
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </InputGroup>
        <InputGroup
          label="Tax class"
          required={false}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0.25rem 0'
          }}>
            <p style={{
              margin: '0'
            }}>Default</p>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    padding: 0
                  }}
                  defaultChecked
                />}
              label="Tax Exempt"
              sx={{
                alignItems: 'flex-start',
                columnGap: '5px'
              }}
            />
          </div>
        </InputGroup>
        <InputGroup
          label="Price"
          required={true}
          inputSize={6}
          helper={"empty"}
        >
          <Grid container>
            <Grid container md={4} >
              <Grid item md={3} className={classes.disableLabel}>
                <p>$</p>
              </Grid>
              <Grid item md={9} >
                <input type="text" className={classes.priceInput} />
              </Grid>
            </Grid>
            <Grid item md={2}
              sx={{
                marginLeft: '30px'
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      padding: 0
                    }}
                    defaultChecked
                  />}
                label="Sale"
                sx={{
                  width: '100%'
                }}
              />
            </Grid>
            <Grid item md={5} >
              <FormControl
                sx={{
                  flexDirection: "row"
                }}>
                <Select
                  className={classes.select}
                  value={'$'}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#323259',
                        color: '#fff',
                        top: '205px !important'
                      }
                    }
                  }}
                >
                  <MenuItem
                    value={'$'}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(180,180,219,0.16)'
                      }
                    }}
                  >
                    $
                  </MenuItem>
                  <MenuItem
                    value={'%'}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(180,180,219,0.16)'
                      }
                    }}
                  >
                    %
                  </MenuItem>
                </Select>
                <input type="text" className={classes.priceInput} />
              </FormControl>
            </Grid>
          </Grid>
        </InputGroup>
        <InputGroup
          label="Arrival date"
          required={false}
          inputSize={6}
          helper={"empty"}
        >
          <Grid container
            sx={{
              position: 'relative'
            }}>
            <Grid item md={1} className={classes.disableLabel}>
              <p>
                <CalendarTodayIcon />
              </p>
            </Grid>
            <Grid item md={6}>
              <input
                type="text"
                className={classes.priceInput}
                onClick={() => setShowDatePicker(true)}
                onBlur={() => setShowDatePicker(false)}
              />
            </Grid>
            {showDatePicker && (
              <Calendar
                color={MEDIUM_PURPLE}
                date={new Date()}
                className={classes.dateRange}
              // onChange={this.handleSelect}
              />
            )}
          </Grid>
        </InputGroup>
        <InputGroup
          label="Quantity in stock"
          required={true}
          inputSize={2}
        >
          <input
            type="text"
          />
        </InputGroup>
      </div>
      <FormSeperateSpace />
      <div className="part3">
        <Typography variant="h4" sx={{
          margin: '15px 0'
        }}>
          Shipping
        </Typography>
        <InputGroup
          label="Continental U.S."
          required={true}
          inputSize={6}
          helper={"empty"}
        >
          <Grid container
            sx={{
              position: 'relative'
            }}>
            <Grid item md={1} className={classes.disableLabel}>
              <p>
                $
              </p>
            </Grid>
            <Grid item md={6}>
              <input
                type="text"
                className={classes.priceInput}
              />
            </Grid>
          </Grid>
        </InputGroup>
        <InputGroup
          label="Canada"
          required={true}
          inputSize={3}
          helper={"empty"}
        >
          <Grid container
            sx={{
              position: 'relative',
            }}>
            <Grid item md={2} className={classes.disableLabel}>
              <p>
                $
              </p>
            </Grid>
            <Grid item md={6}>
              <input
                type="text"
              />
            </Grid>
            <div style={{
              marginLeft: '15px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}>
              <span >
                Remove
              </span>

            </div>
          </Grid>
        </InputGroup>
        <InputGroup
          label=""
          required={false}
          inputSize={5}
        >
          <Grid container sx={{
            justifyContent: 'space-between'
          }}>
            <Grid
              item
              md={6}
              sx={{
                position: 'relative',
              }}>
              <Select
                label=""
                MenuProps={{
                  PaperProps: {
                    style: {
                      backgroundColor: '#323259',
                      color: '#fff',
                    }
                  }
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              md={5}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <span
                style={{
                  cursor: 'pointer'
                }}>
                Add shipping Location
              </span>
            </Grid>
          </Grid>
        </InputGroup>
      </div>
      <FormSeperateSpace />
      <div className="part4">
        <Typography variant="h4" sx={{
          margin: '15px 0'
        }}>
          Marketing
        </Typography>
        <InputGroup
          label="Open Graph meta tags"
          required={false}

        >
          <Select
            label=""
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#323259',
                  color: '#fff',
                }
              }
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </InputGroup>
        <InputGroup
          label="Meta description"
          required={false}
        >
          <Select
            label=""
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#323259',
                  color: '#fff',
                }
              }
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </InputGroup>
        <InputGroup
          label="Meta keywords"
          required={false}
        >
          <input
            type="text"
          />
        </InputGroup>
        <InputGroup
          label="Product page title"
          required={false}
          helper="Leave blank to use product name as Page Title."
        >
          <input
            type="text"
          />
        </InputGroup>
        <InputGroup
          label="Add to Facebook product feed"
          required={false}
        >
          <Switch defaultChecked className={classes.switch} />
        </InputGroup>
        <InputGroup
          label="Add to Google product feed"
          required={false}
        >
          <Switch defaultChecked className={classes.switch} />
        </InputGroup>
      </div>
    </form>
  )
}

export default InfoProductForm