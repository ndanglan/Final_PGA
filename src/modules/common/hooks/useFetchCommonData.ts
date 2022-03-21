import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import useSWR from 'swr';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from "../redux/thunk";

export default function useFetchCommonData(url: string, payload?: {}) {
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
      return json.data;
    }

    // throw error
    return;
  }

  const { data, error } = useSWR([url, payload], fetcher);

  return {
    data,
    error,
    isLoading: !data && !error
  }
} 