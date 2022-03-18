import React, { useCallback, useEffect, useState } from 'react'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { useParams } from 'react-router';
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
import SnackBarCustom from '../../common/components/SnackBarCustom';
import { SnackBarProps } from '../../../models/snackbar';

const UserFormPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const params = useParams<{ id: string }>();
  const [vendorDetails, setVendorDetails] = useState<VendorDataProps>();

  const [snackbarOptions, setSnackbarOptions] = useState<SnackBarProps>({
    message: '',
    open: false,
  })

  // close snackbar
  const onCloseSnackBar = () => {
    setSnackbarOptions({
      message: '',
      open: false,
      type: snackbarOptions.type,
      duration: snackbarOptions.duration
    })
  }

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

        setSnackbarOptions({
          open: true,
          message: 'Your change is success!',
          type: 'success',
          duration: 1000
        });

        // sau khi update thành công sẽ fetch lại detail
        if (id) {
          setTimeout(() => {
            fetchVendorDetails(id)
          }, 1000)
        }

        return;
      }

      setSnackbarOptions({
        open: true,
        message: json.errors,
        type: 'error',
        duration: 1000,
      })
    } else {
      newFormat = {
        ...others,
        roles: others.roles.map(item => item.id),
        membership_id: others.membership_id === 'none' ? '' : others.membership_id
      }

      const json = await dispatch(fetchThunk(API_PATHS.createUser, 'post', newFormat));
      dispatch(setLoading(false))

      if (json.success) {
        setSnackbarOptions({
          open: true,
          message: 'Your account is activated!',
          type: 'success',
          duration: 1000
        });
        // sau khi tạo thành công chuyển về trang userlist
        setTimeout(() => {
          dispatch(push(ROUTES.userList))
        }, 1000)

        return;
      }

      // handle errors when create user
      let errorMessage;
      if (typeof json.errors === 'object') {
        const key = Object.keys(json.errors)[0];
        errorMessage = `${key}: ${json.errors[key]}`;
      } else {
        errorMessage = json.errors
      }

      setSnackbarOptions({
        open: true,
        message: errorMessage,
        type: 'error',
        duration: 1000,
      })
    }

  }, [dispatch, fetchVendorDetails]);

  useEffect(() => {
    if (params?.id) {
      fetchVendorDetails(params.id)
    }

  }, [params.id, fetchVendorDetails])

  return (
    <>
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
                ? `${vendorDetails.info.email}${vendorDetails.info.companyName ? `(${vendorDetails.info.companyName})` : ''}`
                : 'Create account'
              }
              onSubmit={(values: UserFormValues) => onSubmit(values)}
              vendorDetails={vendorDetails}
            />
          </div>
        </div>
      </div>
      <SnackBarCustom
        open={snackbarOptions.open}
        message={snackbarOptions.message}
        type={snackbarOptions?.type}
        duration={snackbarOptions?.duration}
        onClose={onCloseSnackBar}
      />
    </>
  )
}

export default UserFormPage