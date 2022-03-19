import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import moment from 'moment';
import { push, replace } from 'connected-react-router';
import qs from 'query-string'
import { useHistory } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { useStyles } from '../../../styles/makeStyles'
import CustomPagination from '../../common/components/CustomPagination';
import { setLoading } from '../../common/redux/loadingReducer';
import { fetchThunk } from '../../common/redux/thunk';
import UserListFilterForm from '../component/UserListFilterForm';
import UtilComponent from '../../common/components/UtilComponent';
import UserListTable from '../component/UserListTable';
import ConfirmDialog, { DialogProps } from '../../common/components/ConfirmDialog';
import { ROUTES } from '../../../configs/routes';
import ScrollBar from '../../common/components/ScrollBar';
import { FilterUsersProps, UserDataProps, DeleteUsersProps } from '../../../models/userlist';
import { GroupInputProps } from '../../../models/input';
import SnackBarCustom from '../../common/components/SnackBarCustom';
import { SnackBarProps } from '../../../models/snackbar';

const UsersPage = () => {
  const classes = useStyles();
  const { location } = useHistory()
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [usersState, setUsersState] = useState<{
    usersState: UserDataProps[],
    numberUsers: number
  }>({
    usersState: [],
    numberUsers: 0
  });

  const [filters, setFilters] = useState<FilterUsersProps>(() => {
    const queryObject: any = qs.parse(location.search);
    const { types, memberships, ...others } = queryObject;
    // initialize value of filter from query
    return ({
      address: others.address ? others.address : "",
      count: others.count ? others.count : 25,
      country: others.country ? others.country : "0",
      date_range: {
        selection: {
          startDate: others.startDate ? others.startDate : undefined,
          endDate: others.endDate ? others.endDate : undefined,
          key: others.key ? others.key : ''
        }
      },
      date_type: others.date_type ? others.date_type : "R",
      memberships: memberships ? memberships.map((item: any) => qs.parse(item)) : [],
      order_by: others.order_by ? others.order_by : "DESC",
      page: others.page ? others.page : 1,
      phone: others.phone ? others.phone : "",
      search: others.search ? others.search : "",
      sort: others.sort ? others.sort : "last_login",
      state: others.state ? others.state : "",
      status: others.status ? others.status : '',
      types: types ? types.map((item: any) => qs.parse(item)) : [],
      tz: others.tz ? others.tz : 7
    })
  });

  const [roles, setRoles] = useState<GroupInputProps[]>([])

  const [usersDeleted, setUsersDeleted] = useState<DeleteUsersProps[]>([]);

  const [dialogOptions, setDialogOptions] = useState<DialogProps>({
    open: false,
    title: '',
    content: '',
  });

  const [snackbarOptions, setSnackbarOptions] = useState<SnackBarProps>({
    message: '',
    open: false,
  })

  const tableRef = useRef<HTMLTableElement>(null);

  // close snackbar
  const onCloseSnackBar = () => {
    setSnackbarOptions({
      message: '',
      open: false,
    })
  }


  const fetchRoles = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.getRoles, 'post', {}));

    if (json.success) {
      let formatedData: GroupInputProps[] = []
      for (const i in json.data) {
        formatedData = [...formatedData, ...json.data[i].map((item: any) => ({ value: item.id, name: item.name, group: i }))]
      }

      setRoles(formatedData);
      return;
    }

  }, [dispatch])

  // call api products with filtering
  const fetchUsers = useCallback(async (filters: FilterUsersProps) => {
    // format lại filter để gửi lên server
    const newFormatFilter = {
      ...filters,
      date_range: filters.date_range.selection.key ? (
        [
          moment(filters.date_range.selection.startDate).format("YYYY-MM-DD"),
          moment(filters.date_range.selection.endDate).format("YYYY-MM-DD")
        ]
      ) : [],
      types: filters.types.length > 0
        ? filters.types.map(type => type.value)
        : [],
      memberships: filters.memberships.length > 0
        ? filters.memberships.map(membership => membership.value)
        : [],
      status: filters.status && filters.status !== '0' ? [filters.status] : [],
      country: filters.country === '0' ? '' : filters.country,
      page: 1,
    }

    dispatch(setLoading(true));

    const json = await dispatch(fetchThunk(API_PATHS.getUsersList, 'post', newFormatFilter));

    dispatch(setLoading(false));

    if (json.success && json.data) {
      setUsersState({
        usersState: json.data,
        numberUsers: json.recordsTotal
      });
      return;
    }

    setUsersState({
      usersState: [],
      numberUsers: 0
    });
    return;
  }, [dispatch]);

  // // add filter values to filter state
  const handleChangeFilter = useCallback((filters: FilterUsersProps) => {
    const {
      date_range,
      types,
      memberships,
      ...others
    } = filters

    // string of others except date_range
    const othersQueryString = qs.stringify(others);

    // format để stringify array of object
    const arrayTypesQuery = types.map(item => qs.stringify(item));
    const typesQueryString = qs.stringify({ types: arrayTypesQuery });
    const arrayMembershipQuery = memberships.map(item => qs.stringify(item));
    const membershipQueryString = qs.stringify({ memberships: arrayMembershipQuery });

    // stringify date_range.selection luuwa vào query
    const userFilterQueryString =
      othersQueryString
      + '&'
      + qs.stringify(date_range.selection)
      + '&'
      + typesQueryString
      + '&'
      + membershipQueryString

    dispatch(replace(`${ROUTES.userList}?${userFilterQueryString}`));

    setFilters(filters);
  }, [dispatch]);

  useEffect(() => {
    fetchUsers(filters)
  }, [fetchUsers, filters]);

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])

  // // call api edit product
  const deleteUsers = useCallback(async (
    params: DeleteUsersProps[]
  ) => {

    setDialogOptions({
      open: false,
      title: '',
      content: ''
    })

    const json = await dispatch(fetchThunk(API_PATHS.editUsersList, 'post', {
      params: params
    }))

    if (json?.success) {
      setSnackbarOptions({
        open: true,
        message: 'Your change is success!',
        type: 'success'
      })

      setUsersDeleted([])

      setTimeout(() => {
        setFilters((prev) => ({ ...prev }))
      }, 1500)
    }

    setSnackbarOptions({
      open: false,
      message: 'Your change is failed!',
      type: 'error'
    });
  }, [dispatch])

  //  options dialog
  const handleCloseDialog = useCallback(() => {
    setDialogOptions({
      open: false,
      title: '',
      content: ''
    })
  }, []);

  // open dialog confirm delete 
  const handleOpenDialog = () => {
    if (usersDeleted && usersDeleted.length > 0) {
      setDialogOptions({
        open: true,
        title: 'Confirm Delete',
        content: 'Do you want to delete all selected item ?',
        onClose: () => handleCloseDialog(),
        onConfirm: () => deleteUsers(usersDeleted)
      })
      return;
    }
  }

  // add product delete 
  const handleAddDeleteUser = (id: string, isDeleting: boolean) => {
    // nếu đang được chọn thì cho vào mảng 
    if (isDeleting) {
      // xét nếu tồn tại thì không thêm còn không tồn tại thì thêm
      const isExisted = usersDeleted.findIndex(item => item.id === id);

      if (isExisted < 0) {
        setUsersDeleted(prev => {
          return [
            ...prev,
            {
              id: id,
              delete: 1
            }
          ]
        })
      }
      return;
    }

    // nếu đang không ở trạng thái isdeleting thì bỏ khỏi mảng
    setUsersDeleted(prev => prev.filter(item => item.id !== id))
  }

  return (
    <>
      <div className={classes.mainPage}>
        <div style={{
          overflow: 'auto',
          height: 'auto',
        }}>
          <div>
            <Typography
              className="title"
              component="h2"
              variant="h2">
              User List
            </Typography>
          </div>
          <UserListFilterForm
            roles={roles}
            filters={filters}
            onChangeFilter={handleChangeFilter}
          />
          {usersState && (
            <>
              <div>
                {/* Add product Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-start'
                }}>
                  <div className={classes.mainButton}>
                    <Button
                      onClick={() => {
                        dispatch(push(ROUTES.addUser))
                      }}>
                      Add User
                    </Button>
                  </div>
                </div>

                {/* Table */}
                <UserListTable
                  handleAddDeleteUser={handleAddDeleteUser}
                  onChangeFilter={handleChangeFilter}
                  users={usersState.usersState}
                  usersDeleted={usersDeleted}
                  filters={filters}
                  ref={tableRef}
                />
              </div>
              <CustomPagination
                filters={filters}
                onChangeFilter={handleChangeFilter}
                totalLengthProducts={+usersState.numberUsers}
                numberProductsPerPage={+filters.count}
                optionsLengthPerPage={[
                  '10',
                  '25',
                  '50',
                  '75',
                  '100'
                ]}
              />
            </>
          )}
        </div>
        <UtilComponent>
          <div >
            <Button
              sx={{
                backgroundColor: "#f0ad4e",
                color: '#fff'
              }}
              disabled={
                usersDeleted?.length === 0
              }
              onClick={handleOpenDialog}
            >
              Delete selected item
            </Button>
          </div>
        </UtilComponent >
        <ScrollBar tableRef={tableRef} />
      </div>
      <ConfirmDialog {...dialogOptions} />
      <SnackBarCustom
        open={snackbarOptions.open}
        message={snackbarOptions.message}
        type={snackbarOptions.type}
        duration={snackbarOptions.duration}
        onClose={onCloseSnackBar}
      />
    </>
  )
}

export default UsersPage