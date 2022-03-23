import { detailsProductProps } from './../../../models/products';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import useSWR from 'swr';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from "../redux/thunk";

export default function useProductDetail(
  id?: string
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

  const {
    data,
    error,
    mutate,
  } = useSWR(
    id ? [API_PATHS.getProductDetail, { id: id }] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      refreshWhenHidden: true,
      refreshWhenOffline: true,
    }
  );

  return {
    data: data?.data as detailsProductProps,
    error,
    mutate,
    isLoading: !data && !error
  }
}