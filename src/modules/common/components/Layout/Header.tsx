import React, { memo } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { IUser } from '../../../../models/user'
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from '../../../../styles/makeStyles'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


interface Props {
  user?: IUser,
  handleSideBarAction(): void,
  handleLogOut(): void
}

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