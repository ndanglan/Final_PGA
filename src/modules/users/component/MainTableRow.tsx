import React, { useState, useEffect } from 'react'
import { Button, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserDataProps } from '../../../models/userlist'
import { useStyles } from '../../../styles/makeStyles';
import { DeleteIcon } from '../../common/components/Icons';
import { ROUTES } from '../../../configs/routes';
import moment from 'moment';

interface Props {
  user: UserDataProps,
  handleAddDeleteUser(id: string, isDeleting: boolean): void,
}

const MainTableRow = (props: Props) => {
  const { user, handleAddDeleteUser } = props;
  const classes = useStyles();
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    handleAddDeleteUser(user.profile_id, isDeleting)
  }, [isDeleting])

  return (
    <tr
      style={{
        opacity: isDeleting ? '0.3' : '1'
      }}
    >
      <td>
        <div className="cell">
          <div className="action">
            <Checkbox sx={{ color: '#fff' }} />
          </div>
        </div>
      </td>
      <td>
        <div className="cell">
          <div>
            <Link to='/'>
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
            <Link to={`${ROUTES.productDetail}/${user.profile_id}`}>
              {`${user.fistName} ${user.lastName}`}
            </Link>
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
                setIsDeleting((prev) => !prev);
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