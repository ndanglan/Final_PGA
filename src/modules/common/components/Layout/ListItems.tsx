import React, { useEffect } from 'react'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { ROUTES } from '../../../../configs/routes';

interface Props {
  currentLocation: string,
  handleSwitchPage(values: string): void
}

const ListItems = (props: Props) => {
  const [open, setOpen] = React.useState<string[]>([]);

  const handleClick = (values: string) => {
    const isExisted = open.indexOf(values);

    if (isExisted >= 0) {
      setOpen(prev => {
        return prev.filter(item => item !== values)
      })
      return;
    }

    setOpen(prev => [...prev, values])
  };

  return (
    <List
      sx={{ width: '260px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton
        onClick={() => handleClick('catalog')}
        className={props.currentLocation.includes('products/')
          ? 'collapse-item-active'
          : ''}
      >
        <ListItemIcon>
          <SellOutlinedIcon />
        </ListItemIcon>

        <ListItemText primary="Catalog" />

        {!open.includes('catalog') ? <ChevronLeftOutlinedIcon /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open.includes('catalog')}
        timeout="auto"
        unmountOnExit>
        <List component="div" disablePadding style={{
          paddingLeft: "57px",
          paddingRight: '16px'
        }}>

          <ListItemButton
            onClick={() => props.handleSwitchPage(ROUTES.productList)}
            className={props.currentLocation.includes('products/manage-product')
              ? 'collapse-item-active'
              : ''}
          >
            <ListItemText primary="Products" />
          </ListItemButton>

        </List>
      </Collapse>

      <ListItemButton
        onClick={() => handleClick('users')}
        className={props.currentLocation.includes('user/')
          ? 'collapse-item-active'
          : ''}
      >
        <ListItemIcon>
          <GroupOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
        {!open.includes('users') ? <ChevronLeftOutlinedIcon /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open.includes('users')}
        timeout="auto"
        unmountOnExit>
        <List component="div" disablePadding style={{
          paddingLeft: "57px",
          paddingRight: '16px'
        }}>
          <ListItemButton
            onClick={() => props.handleSwitchPage(ROUTES.userList)}
            className={props.currentLocation.includes('user/manage-user')
              ? 'collapse-item-active'
              : ''}
          >
            <ListItemText primary="Users List" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}

export default ListItems