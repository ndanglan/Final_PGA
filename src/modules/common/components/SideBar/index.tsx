import React, { memo } from 'react'
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { makeStyles } from '@mui/styles';
import { Divider, Drawer, IconButton } from '@mui/material'
import ListItems from './ListItems';
import { AppState } from '../../../../redux/reducer';
import { ChevronLeftOutlinedIcon } from '../Icons';
import { BLACK_COLOR, DARK_PURPLE, WHITE_COLOR } from '../../../../configs/colors';

interface Props {
  open: boolean,
  handleSideBarAction(): void
}

const useStyles = makeStyles(({
  sideBar: {
    '& .MuiPaper-root': {
      top: '80px',
      zIndex: '999',
      backgroundColor: DARK_PURPLE,
    },

    '& .MuiListItemButton-root': {
      borderBottom: `1px solid ${BLACK_COLOR}`,
      color: WHITE_COLOR,

      '& .MuiTypography-root': {
        fontSize: "13px",
      },

      '& .MuiListItemIcon-root': {
        color: WHITE_COLOR,
      }
    },

    '& .collapse-item-active': {
      color: '#9266e7',

      '& .MuiListItemIcon-root': {
        color: '#9266e7 !important',
      }
    }
  },
}))

const SideBar = (props: Props) => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const handleSwitchPage = (values: string) => {
    dispatch(push(values))
  }

  return (
    <Drawer
      sx={{
        width: '260px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '260px',
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
      className={classes.sideBar}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <IconButton onClick={props.handleSideBarAction}>
          <ChevronLeftOutlinedIcon
            style={{ color: '#fff' }}
          />
        </IconButton>
      </div>
      <Divider />
      <ListItems
        currentLocation={location.pathname}
        handleSwitchPage={handleSwitchPage} />
    </Drawer>
  )
}

export default memo(SideBar)