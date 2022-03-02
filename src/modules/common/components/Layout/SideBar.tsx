import React from 'react'
import { Divider, Drawer, IconButton } from '@mui/material'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { useStyles } from '../../../../styles/makeStyles'
import ListItems from '../Layout/ListItems';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  open: boolean,
  handleSideBarAction(): void
}

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
          <ChevronLeftOutlinedIcon style={{ color: '#fff' }} />
        </IconButton>
      </div>
      <Divider />
      <ListItems
        currentLocation={location.pathname}
        handleSwitchPage={handleSwitchPage} />
    </Drawer>
  )
}

export default SideBar