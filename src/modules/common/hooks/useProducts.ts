import { FilterProps, ProductsProps } from './../../../models/products';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import useSWR from 'swr';
import { Action } from 'typesafe-actions';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from "../redux/thunk";

export default function useProducts(
  url: string,
  payload?: FilterProps
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
    vendor: payload?.vendor?.id?.toString(),
    page: payload?.page.toString(),
    count: payload?.count.toString()
  }

  const { data, error, mutate } = useSWR(
    [url, newPayload],
    fetcher,
  );

  return {
    data: data?.data as ProductsProps[],
    total: data?.recordsTotal,
    filter: data?.recordsFiltered,
    error,
    mutate,
    isLoading: !data && !error
  }
}