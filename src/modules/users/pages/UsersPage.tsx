import React, {
  useCallback,
  useRef,
  useState,
  useEffect
} from 'react'
import { Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { push, replace } from 'connected-react-router';
import qs from 'query-string'
import { useHistory } from 'react-router';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { useStyles } from '../../../styles/makeStyles'
import CustomPagination from '../../common/components/CustomPagination';
import { fetchThunk } from '../../common/redux/thunk';
import UserListFilterForm from '../component/UserListFilterForm';
import UtilComponent from '../../common/components/UtilComponent';
import UserListTable from '../component/UserListTable';
import ConfirmDialog, { DialogProps } from '../../common/components/ConfirmDialog';
import { ROUTES } from '../../../configs/routes';
import ScrollBar from '../../common/components/ScrollBar';
import { FilterUsersProps, DeleteUsersProps } from '../../../models/userlist';
import { GroupInputProps } from '../../../models/input';
import SnackBarCustom from '../../common/components/SnackBarCustom';
import { SnackBarProps } from '../../../models/snackbar';
import useFetchCommonData from '../../common/hooks/useFetchCommonData';
import useUsers from '../../common/hooks/useUsers';
import SpinnerLoading from '../../common/components/Loading/SpinnerLoading';

const UsersPage = () => {
  const classes = useStyles();
  const { location } = useHistory()
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [filters, setFilters] = useState<FilterUsersProps>(() => {
    const queryObject: any = qs.parse(location.search, { arrayFormat: 'bracket' });
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

  const { data: roles } = useFetchCommonData(API_PATHS.getRoles, {});

  const {
    data: usersState,
    total: numberUsers,
    isLoading,
    error,
    mutate,
  } = useUsers(API_PATHS.getUsersList, filters);

  const [usersDeleted, setUsersDeleted] = useState<DeleteUsersProps[]>([]);

  const [isDeletingAll, setIsDeletingAll] = useState(false)

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
  const onCloseSnackBar = useCallback(() => {
    setSnackbarOptions({
      message: '',
      open: false,
    })
  }, []);

  const flattenObject = (obj: {}) => {
    let formatedObject: GroupInputProps[] = [];

    for (const i in obj) {
      const tempArray: [] = obj[i as keyof {}];
      formatedObject = [...formatedObject, ...tempArray.map((item: any) => ({ value: item.id, name: item.name, group: i }))]
    }

    return formatedObject
  }

  // add filter values to filter state
  const handleChangeFilter = useCallback((newFilters: FilterUsersProps) => {
    const {
      date_range,
      types,
      memberships,
      ...others
    } = newFilters

    // string of others except date_range
    const othersQueryString = qs.stringify(others);

    // format để stringify array of object
    const arrayTypesQuery = types.map(item => qs.stringify(item));
    const typesQueryString = qs.stringify({ types: arrayTypesQuery }, { arrayFormat: 'bracket' });
    const arrayMembershipQuery = memberships.map(item => qs.stringify(item));
    const membershipQueryString = qs.stringify({ memberships: arrayMembershipQuery }, { arrayFormat: 'bracket' });

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

    setFilters(newFilters)

  }, [dispatch]);

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
        type: 'success',
        duration: 1000
      })

      setUsersDeleted([])
      setIsDeletingAll(false)
      mutate()

      return;
    }

    setSnackbarOptions({
      open: false,
      message: 'Your change is failed!',
      type: 'error'
    });

    setIsDeletingAll(false)
  }, [dispatch, mutate])

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

  const checkDeletingAll = useCallback(() => {
    if (usersState && usersState.length > 0) {
      // check nếu tất cả sản phẩm trong product đều ở trong productDeleted
      const hasAll = usersState.every(user => {

        const isInDeleteArr = usersDeleted?.find(item => +item.id === +user.profile_id)

        if (isInDeleteArr) {
          return true;
        }

        return false
      })

      if (hasAll) {
        setIsDeletingAll(true);
        return;
      }

      setIsDeletingAll(false);

      return;
    }

    setIsDeletingAll(false);
  }, [usersState, usersDeleted])

  useEffect(() => {
    if (usersDeleted) {
      checkDeletingAll()
    }
  }, [usersDeleted])


  useEffect(() => {
    if (!location.search) {
      setFilters({
        address: "",
        count: 25,
        country: "0",
        date_range: {
          selection: {
            startDate: undefined,
            endDate: undefined,
            key: ''
          }
        },
        date_type: "R",
        memberships: [],
        order_by: "DESC",
        page: 1,
        phone: "",
        search: "",
        sort: "last_login",
        state: "",
        status: '',
        types: [],
        tz: 7
      })
    }

    checkDeletingAll()
    // option 2 xóa user theo từng trang
    // setUsersDeleted([])
    window.scrollTo(0, 0);
  }, [location])

  if (isLoading) {
    return <SpinnerLoading />
  }

  return (
    <>
      <div className={classes.mainPage}>
        <div style={{
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
            roles={roles ? flattenObject(roles) : []}
            filters={filters}
            onChangeFilter={handleChangeFilter}
          />
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
            {error
              &&
              <Typography variant="h1" component='h1'>Sorry, fetching data is failed</Typography>}
            {/* Table */}
            {usersState && (
              <UserListTable
                isDeletingAll={isDeletingAll}
                handleAddDeleteUser={handleAddDeleteUser}
                onChangeFilter={handleChangeFilter}
                users={usersState}
                usersDeleted={usersDeleted}
                filters={filters}
                ref={tableRef}
              />
            )}
          </div>
          <CustomPagination
            filters={filters}
            onChangeFilter={handleChangeFilter}
            totalLengthProducts={numberUsers}
            numberProductsPerPage={+filters.count}
            optionsLengthPerPage={[
              '10',
              '25',
              '50',
              '75',
              '100'
            ]}
          />
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