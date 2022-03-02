import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  appBar: {

    '&.MuiAppBar-root': {
      backgroundColor: '#323259'
    },

    '& .MuiToolbar-root': {
      padding: '1rem',
      zIndex: '1000',
      boxShadow: "0 0.5rem 1rem 0 #1a1f33",
    },

    '& .MuiTypography-h5': {
      fontSize: '28px'
    },
  },

  accountButtonAppBar: {
    position: 'relative',
    opacity: 0.5,
    transition: '0.3s all ease-in-out',

    '& .popover-account': {
      display: 'none',
      position: 'absolute',
      minWidth: "200px",
      padding: '0.5rem 1rem',
      backgroundColor: '#fff',
      right: 0,
      borderRadius: '5px',

      '& .MuiTypography-subtitle1': {
        color: '#000',
        fontSize: '14px'
      },

      '& a': {
        display: 'block',
        marginTop: '10px',
        color: '#000',
        fontSize: '15px',
        cursor: 'pointer',

        '&:hover': {
          color: '#5ca1e7'
        }
      }
    },

    '&:hover': {
      opacity: 1,

      '& .popover-account': {
        display: 'block'
      }
    }
  },

  sideBar: {
    '& .MuiPaper-root': {
      top: '80px',
      zIndex: '999',
      backgroundColor: '#323259',
    },

    '& .MuiListItemButton-root': {
      borderBottom: '1px solid #000',
      color: '#fff',

      '& .MuiTypography-root': {
        fontSize: "13px",
      },

      '& .MuiListItemIcon-root': {
        color: '#fff',
      }
    },

    '& .collapse-item-active': {
      color: '#9266e7',

      '& .MuiListItemIcon-root': {
        color: '#9266e7 !important',
      }
    }
  },

  mainButton: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiButton-root': {
      backgroundColor: '#b18aff',
      color: '#fff',
      transition: '0.3s all ease-in-out',
      '&:hover': {
        backgroundColor: '#b18aff',
        color: '#1b1b38',
      }
    }
  },

  inputField: {
    '& .MuiInputLabel-root': {
      color: '#fff',

      '&.Mui-focused': {
        color: "#fff"
      }
    },
    // đổi màu khi focus
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: '#fff'
      }
    },

    '& input': {
      color: '#fff',
      borderColor: '#fff',
      backgroundColor: '#252547',
      borderRadius: '5px'
    }
  },

  mainPage: {

    '& .title': {
      fontSize: '2rem',
      color: '#fff',
      lineHeigth: '2.5rem',
      marginBottom: '1rem'
    },

    '& .filter-box': {
      border: '1px solid #13132b',
      background: '#323259',
      position: 'relative',
      marginBottom: '40px',
      padding: '20px 20px 0',
      marginLeft: 0,

      '& .filter-options': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap: '30px',
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

  mainTable: {
    width: '100%',
    height: '100%',
    overflowX: 'auto',
    marginTop: '40px',

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
          backgroundColor: '#323259',
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
              color: '#fff',
              borderRight: ' 1.5px dashed #bbb',
            },

            '& .action-next': {
              color: '#72b25b',
              paddingLeft: '10px',
              cursor: 'pointer',

              '&:hover': {
                color: '#fff'
              }
            }
          }
        }
      }
    },
  },

  pagination: {
    '& li button': {
      color: '#fff',

      '&.Mui-selected': {
        backgroundColor: '#b18aff',
        color: '#fff',
        borderColor: 'transparent'
      }
    }
  },

  utilsContainer: {
    position: 'sticky',
    postion: '-webkit-sticky',
    bottom: '0',
    width: '100%',
    padding: '18px 36px',
    backgroundColor: '#323259',
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.8)",
    marginTop: '40px',
    zIndex: '1000',
    overflowX: 'hidden',

    '& .MuiButton-root:hover': {
      backgroundColor: '#f0ad4e',
      borderColor: 'transparent',
      color: '#191836'
    }
  },
})