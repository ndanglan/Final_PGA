import { makeStyles } from "@mui/styles";
import {
  DARK_BLUE,
  MEDIUM_PURPLE,
  BORDER_COLOR,
  DARK_PURPLE,
  WHITE_COLOR,
  MEDIUM_BLUE
} from "../configs/colors";

export const useStyles = makeStyles({
  mainButton: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiButton-root': {
      backgroundColor: MEDIUM_PURPLE,
      color: WHITE_COLOR,
      transition: '0.3s all ease-in-out',

      '&:hover': {
        backgroundColor: '#b18aff',
        color: DARK_BLUE,
      }
    }
  },

  inputField: {
    '& .MuiInputLabel-root': {
      color: WHITE_COLOR,

      '&.Mui-focused': {
        color: WHITE_COLOR
      }
    },
    // đổi màu khi focus
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: WHITE_COLOR
      }
    },

    '& input': {
      color: WHITE_COLOR,
      borderColor: WHITE_COLOR,
      backgroundColor: MEDIUM_BLUE,
      borderRadius: '5px'
    }
  },

  mainPage: {
    '& .title': {
      fontSize: '2rem',
      color: WHITE_COLOR,
      lineHeigth: '2.5rem',
      marginBottom: '1rem'
    },

    '& .filter-box': {
      border: `1px solid ${BORDER_COLOR}`,
      background: DARK_PURPLE,
      position: 'relative',
      marginBottom: '40px',
      padding: '20px 20px 0',
      marginLeft: 0,

      '& .filter-options': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: '20px',
        marginBottom: '20px',
        transition: '0.3s all ease-in-out',

        "& .search-in": {
          display: 'flex',
          alignItems: 'flex-start',
          columnGap: '10px',

          '& .search-in-title': {
            padding: '8px',
          },

          '& .MuiTypography-root': {
            fontSize: '15px'
          }
        },

        '& .MuiSvgIcon-root': {
          color: '#fff'
        }
      },

      '& .toggle-btn': {
        backgroundColor: '#323259',
        padding: '0.25rem 0.5rem',
        borderRadius: '10px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '-25px',
        cursor: 'pointer'
      }
    },
  },

  filterFormControl: {
    '& input, & .MuiSelect-select': {
      display: 'block',
      backgroundColor: '#1b1b38',
      color: '#fff',
      width: '100%',
      borderRadius: '5px',
      border: '1px solid #13132b',
      overflow: 'visible',
      fontSize: '0.9375rem',
      fontWeight: '600',
      lineHeight: '1.5rem',
      padding: '0.4375rem 1rem',
    },
    '& .MuiOutlinedInput-root': {
      border: 'none',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',

        '&:hover': {
          border: 'none'
        }
      }
    },

    '& .MuiSelect-nativeInput': {
      border: 'none',
    },

  },
  dropdownVendorList: {
    position: 'absolute',
    height: 'auto',
    top: '40px',
    border: '1px solid #000',
    borderRadius: '5px',
    minWidth: '220px',
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.8)",
    overflow: 'hidden',

    '& ul': {
      padding: 0,
      margin: 0,
      maxHeight: '250px',
      overflowY: 'auto',

      '& li': {
        padding: '10px',
        textAlign: 'center',
        backgroundColor: DARK_BLUE,
        transition: '0.2s all ease-in-out',
        cursor: 'pointer',

        '&:hover': {
          backgroundColor: MEDIUM_PURPLE
        },
      }
    }
  },

  mainTable: {
    width: '100%',
    height: '100%',
    overflowX: 'scroll',
    marginTop: '40px',

    '&::-webkit-scrollbar': {
      display: 'none'
    },

    '& table': {
      backgroundColor: '#323259',
      maxWidth: '100%',
      width: '100%',
      border: '1px solid #13132b',

      '& thead': {
        backgroundColor: '#323259',

        '& th': {
          padding: '0 15px',
          fontSize: '15px',
          color: '#fff',
          whiteSpace: 'nowrap'
        }
      },

      '& th': {
        paddingLeft: '15px'
      },

      '& tbody': {
        '& tr': {
          backgroundColor: '#323259',
          '& .editable': {
            padding: '6px 10px 6px 9px',
            borderRadius: '4px',
            minHeight: '32px',
            maxWidth: "200px",
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            border: '1px solid transparent',
          },

          '&:hover .editable': {
            cursor: 'pointer',
            backgroundColor: '#b18aff',
            border: '1px solid #b18aff',
            overflow: 'hidden'
          },

          '& .input-group-edit': {
            display: 'flex',
            alignItems: 'center',

            '& span': {
              padding: '6px 12px',
              fontSize: '14px',
              fontWeigth: "400",
              color: '#555',
              textAlign: 'center',
              backgroundColor: "#eee",
              border: '1px solid #c3c3c3',
              borderRadius: '3px 0 0 3px'
            },

            '& input': {
              padding: '6px 10px 6px 9px',
              border: '1px solid #c3c3c3',
              marginLeft: '-1px',
              borderRadius: '3px',
              width: '90px',
            }
          }
        },

        '& td': {
          fontSize: '14px',
          padding: '10px 17px',
          whiteSpace: 'nowrap',
          borderTop: '1px solid #13132b',
          minHeight: '80px',

          '& .cell': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4px 0',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: "300px",

            '&.big-cell': {
              width: "300px",
              overflow: 'hidden'
            },

            '&.small-cell': {
              width: "100px",
              overflow: 'hidden',
            },

            '&>div': {
              position: 'relative'
            },

            '& .action': {
              paddingRight: '10px',
              borderRight: ' 1.5px dashed #bbb',
            },

            '& .action-next': {
              paddingLeft: '10px',
              cursor: 'pointer',

              '&:hover': {
                color: WHITE_COLOR
              }
            }
          }
        }
      }
    },
  },
})