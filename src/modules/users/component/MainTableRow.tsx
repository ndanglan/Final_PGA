import React from 'react'
import { Button, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { UserDataProps } from '../../../models/userlist'
import { useStyles } from '../../../styles/makeStyles';
import { DeleteIcon } from '../../common/components/Icons';
import { ROUTES } from '../../../configs/routes';

interface Props {
  user: UserDataProps,
  handleAddDeleteUser(id: string, isDeleting: boolean): void,
  isDeleting: boolean
}

const MainTableRow = (props: Props) => {
  const { user, handleAddDeleteUser, isDeleting } = props;
  const classes = useStyles();

  return (
    <tr
      style={{
        opacity: isDeleting ? '0.3' : '1'
      }}
    >
      <td>
        <div className="cell">
          <div className="action">
            <Checkbox
              checked={isDeleting}
              sx={{ color: '#fff' }}
              onChange={() => {
                handleAddDeleteUser(user.profile_id, !isDeleting)
              }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <Link to={`${ROUTES.userDetail}/${user.profile_id}`}>
              {user.vendor}
            </Link>
            <div
              style={{
                marginTop: '5px'
              }}
            >
              {user.storeName}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            {user.fistName && user.lastName ? (
              <Link to={`${ROUTES.productDetail}/${user.profile_id}`}>
                {`${user.fistName} ${user.lastName}`}
              </Link>
            ) : null}
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {user.access_level}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <Link to="/">
              {user.product}
            </Link>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {user.order.order_as_buyer}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell small-cell">
          <div>
            <span>
              {user.wishlist}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {moment.unix(+user.created).format('MMM DD,YYYY,LT')}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <span>
              {moment.unix(+user.last_login).format('MMM DD,YYYY,LT')}
            </span>
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div className={classes.mainButton}>
            <Button
              onClick={() => {
                handleAddDeleteUser(user.profile_id, !isDeleting)
              }}>
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default MainTableRow