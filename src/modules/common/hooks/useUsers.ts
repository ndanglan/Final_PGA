import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import useSWR from 'swr';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from "../redux/thunk";
import { FilterUsersProps, UserDataProps } from '../../../models/userlist';
import moment from 'moment';

export default function useUsers(
  url: string,
  payload: FilterUsersProps
) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const fetcher = async (
    urlFetcher: string,
    payloadFetcher?: any
  ) => {
    const json = await dispatch(
      fetchThunk(
        urlFetcher,
        payloadFetcher ? 'post' : 'get',
        payloadFetcher ? payloadFetcher : undefined
      )
    );

    if (json.success) {
      return json;
    }

    // throw error
    return;
  }

  const newPayload = {
    ...payload,
    date_range: payload.date_range.selection.key ? (
      [
        moment(payload.date_range.selection.startDate).format("YYYY-MM-DD"),
        moment(payload.date_range.selection.endDate).format("YYYY-MM-DD")
      ]
    ) : [],
    types: payload.types.length > 0
      ? payload.types.map(type => type.value)
      : [],
    memberships: payload.memberships.length > 0
      ? payload.memberships.map(membership => membership.value)
      : [],
    status: payload.status && payload.status !== '0' ? [payload.status] : [],
    country: payload.country === '0' ? '' : payload.country,
    page: payload.page.toString()
  }

  const {
    data,
    error,
    mutate
  } = useSWR(
    [url, newPayload],
    fetcher,
  );

  return {
    data: data?.data as UserDataProps[],
    total: data?.recordsTotal,
    filter: data?.recordsFiltered,
    error,
    mutate,
    isLoading: !data && !error
  }
}