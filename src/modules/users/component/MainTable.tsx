import React from 'react'
import { Button, Checkbox } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useStyles } from '../../../styles/makeStyles'
import { UserDataProps, FilterUsersProps, DeleteUsersProps } from '../../../models/userlist';
import MainTableRow from './MainTableRow';
interface Props {
  users: UserDataProps[],
  usersDeleted: DeleteUsersProps[],
  filters: FilterUsersProps,
  onChangeFilter(filters: FilterUsersProps): void,
  handleAddDeleteUser(id: string, isDeleting: boolean): void,
}

const MainTable = React.forwardRef<HTMLTableElement, Props>((props: Props, ref) => {
  const classes = useStyles();
  const {
    users,
    usersDeleted,
    onChangeFilter,
    filters,
    handleAddDeleteUser,
  } = props;

  const onSorting = (type: string) => {
    if (filters.order_by === 'ASC') {
      onChangeFilter({
        ...filters,
        sort: type,
        order_by: 'DESC'
      })
      return;
    }

    onChangeFilter({
      ...filters,
      sort: type,
      order_by: 'ASC'
    })
  }

  const renderArrowIndication = () => {
    if (filters.order_by === 'DESC') {
      return <ArrowDownwardIcon sx={{
        width: '0.6em',
        height: '0.6em',
        marginLeft: '5px'
      }} />
    }

    return <ArrowUpwardIcon sx={{
      width: '0.6em',
      height: '0.6em',
      marginLeft: '5px'
    }} />
  }

  return (
    <div ref={ref} className={classes.mainTable} id='product-table'>
      <table  >
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={usersDeleted.length === users.length}
                onChange={(e) => {
                  console.log(e.target.checked);
                  if (e.target.checked) {
                    for (let i = 0; i < users.length; i++) {
                      handleAddDeleteUser(users[i].profile_id, true)
                    }
                    return;
                  }
                  for (let i = 0; i < users.length; i++) {
                    handleAddDeleteUser(users[i].profile_id, false)
                  }
                }}
                sx={{ color: '#fff' }}
              />
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('vendor')
              }}
            >
              Login/Email
              {
                filters.sort === 'vendor' && renderArrowIndication()
              }
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('fistName')
              }}
            >
              Name
              {
                filters.sort === 'fistName' && renderArrowIndication()
              }
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('access_level')
              }}
            >
              Access level
              {
                filters.sort === 'access_level' && renderArrowIndication()
              }
            </th>
            <th>
              Products
            </th>
            <th>
              Orders
            </th>
            <th>
              Wishlist
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('created')
              }}
            >
              Created
              {
                filters.sort === 'created' && renderArrowIndication()
              }
            </th>
            <th
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                onSorting('last_login')
              }}>
              Last Login
              {
                filters.sort === 'last_login' && renderArrowIndication()
              }
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <MainTableRow
              key={user.profile_id}
              user={user}
              handleAddDeleteUser={handleAddDeleteUser}
              isDeleting={usersDeleted.find(item => item.id === user.profile_id) ? true : false}
            />
          ))}
        </tbody>
      </table>
    </div >
  )
})

MainTable.displayName = 'MainTable';

export default MainTable