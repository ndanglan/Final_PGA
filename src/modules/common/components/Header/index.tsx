import React, { memo } from 'react'
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { IUser } from '../../../../models/profile'
import {
  MenuIcon,
  PersonOutlineOutlinedIcon
} from '../Icons';
import { BLACK_COLOR, DARK_PURPLE, WHITE_COLOR } from '../../../../configs/colors';

interface Props {
  user?: IUser,
  handleSideBarAction(): void,
  handleLogOut(): void
}

const useStyles = makeStyles(({
  appBar: {

    '&.MuiAppBar-root': {
      backgroundColor: DARK_PURPLE
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
      backgroundColor: WHITE_COLOR,
      right: 0,
      borderRadius: '5px',

      '& .MuiTypography-subtitle1': {
        color: BLACK_COLOR,
        fontSize: '14px'
      },

      '& a': {
        display: 'block',
        marginTop: '10px',
        color: BLACK_COLOR,
        fontSize: '15px',
        cursor: 'pointer',

        '&:hover': {
          color: '#5ca1e7'
        }
      },

      '&:after': {
        content: '""',
        height: '10px',
        width: '150px',
        backgroundColor: 'transparent',
        display: 'block',
        position: 'absolute',
        top: '-8px',
        right: '2px'
      }
    },

    '&:hover': {
      opacity: 1,

      '& .popover-account': {
        display: 'block'
      }
    }
  },
}))

const Header = (props: Props) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={props.handleSideBarAction}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}>
          Gear Focus Admin
        </Typography>
        <div className={classes.accountButtonAppBar}>
          <IconButton
            size="large"
            color='inherit'
          >
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <div className="popover-account">
            <div>
              <Typography variant="subtitle1" component="p">
                My profile
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                component="p"
                style={{
                  color: '#999'
                }}
              >
                {props.user?.login}
              </Typography>
            </div>
            <div>
              <a onClick={props.handleLogOut}>
                Log out
              </a>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Header)