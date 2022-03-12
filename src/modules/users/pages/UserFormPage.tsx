import React, { useCallback, useEffect, useState } from 'react'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { DARK_BLUE, WHITE_COLOR } from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { useStyles } from '../../../styles/makeStyles'
import { ArrowBackIcon } from '../../common/components/Icons';
import UserForm from '../component/UserForm'
import { UserFormValues, VendorDataProps } from '../../../models/userlist';
import { setLoading } from '../../common/redux/loadingReducer';
import { API_PATHS } from '../../../configs/api';
import { fetchThunk } from '../../common/redux/thunk';
import { useParams } from 'react-router';

interface Props { }

const UserFormPage = (props: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const params = useParams<{ id: string }>();
  const [vendorDetails, setVendorDetails] = useState<VendorDataProps>();

  const onSubmit = useCallback(async (values: UserFormValues) => {
    const { status, id, statusComment, ...others } = values;
    let newFormat

    dispatch(setLoading(true))
    // nếu có status là đang update
    if (status || id || statusComment) {
      newFormat = {
        ...values,
        roles: values.roles.map(item => item.id),
        membership_id: values.membership_id === 'none' ? '' : values.membership_id
      };

      const json = await dispatch(fetchThunk(API_PATHS.editUsersList, 'post', {
        params: [newFormat]
      }));
      dispatch(setLoading(false))

      if (json.success) {
        // show toastify
        dispatch(push(ROUTES.userList))
      }

      // error show toastify
    } else {
      newFormat = {
        ...others,
        roles: others.roles.map(item => item.id),
        membership_id: others.membership_id === 'none' ? '' : others.membership_id
      }

      const json = await dispatch(fetchThunk(API_PATHS.createUser, 'post', newFormat));
      dispatch(setLoading(false))

      if (json.success) {
        // show toastify
        dispatch(push(ROUTES.userList))
      }

      // error show toastify
    }

  }, [dispatch]);

  const fetchVendorDetails = useCallback(async (id: string) => {
    dispatch(setLoading(true));

    const json = await dispatch(fetchThunk(API_PATHS.getVendorDetail, 'post', { id: id }));

    dispatch(setLoading(false));

    if (json.success) {
      setVendorDetails({
        account_status: json.data.account_status,
        info: json.data.info
      })
    }
  }, [dispatch])

  useEffect(() => {
    if (params?.id) {
      fetchVendorDetails(params.id)
    }

  }, [params.id, fetchVendorDetails])

  return (
    <div className={classes.mainPage}>
      <div style={{
        height: 'auto'
      }}>
        <div style={{
          marginBottom: '30px'
        }}>
          <div>
            <button
              style={{
                color: DARK_BLUE,
                backgroundColor: WHITE_COLOR,
                width: '32px !important',
                minWidth: '32px',
                height: '32px',
                borderRadius: '50%',
                outline: 'none',
                border: `1px solid ${WHITE_COLOR}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: "center"
              }}
              onClick={() => {
                dispatch(push(ROUTES.userList))
              }}
            >
              <ArrowBackIcon sx={{
                width: '20px',
                height: '20px'
              }} />
            </button>
          </div>
        </div>
        <div>
          <UserForm
            title={vendorDetails
              ? `${vendorDetails.info.email}(${vendorDetails.info.companyName})`
              : 'Create account'
            }
            onSubmit={(values: UserFormValues) => onSubmit(values)}
            vendorDetails={vendorDetails}
          />
        </div>
      </div>
    </div>
  )
}

export default UserFormPage