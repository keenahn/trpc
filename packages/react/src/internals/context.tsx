import { TRPCClient, TRPCClientError, TRPCRequestOptions } from '@trpc/client';
import type {
  AnyRouter,
  inferHandlerInput,
  inferProcedureInput,
  inferProcedureOutput,
} from '@trpc/server';
import { createContext } from 'react';
import {
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  InfiniteData,
  QueryClient,
} from 'react-query';

interface TRPCFetchQueryOptions<TInput, TError, TOutput>
  extends FetchQueryOptions<TInput, TError, TOutput>,
    TRPCRequestOptions {}

interface TRPCFetchInfiniteQueryOptions<TInput, TError, TOutput>
  extends FetchInfiniteQueryOptions<TInput, TError, TOutput>,
    TRPCRequestOptions {}

export type TRPCContextState<TRouter extends AnyRouter> = {
  queryClient: QueryClient;
  client: TRPCClient<TRouter>;
  isPrepass: boolean;

  /**
   * @link https://react-query.tanstack.com/guides/prefetching
   */
  fetchQuery: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TProcedure extends TRouter['_def']['queries'][TPath],
    TOutput extends inferProcedureOutput<TProcedure>,
    TInput extends inferProcedureInput<TProcedure>,
  >(
    pathAndInput: [path: TPath, ...args: inferHandlerInput<TProcedure>],
    opts?: TRPCFetchQueryOptions<TInput, TRPCClientError<TRouter>, TOutput>,
  ) => Promise<TOutput>;
  /**
   * @link https://react-query.tanstack.com/guides/prefetching
   */
  fetchInfiniteQuery: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TProcedure extends TRouter['_def']['queries'][TPath],
    TOutput extends inferProcedureOutput<TProcedure>,
    TInput extends inferProcedureInput<TProcedure>,
  >(
    pathAndInput: [path: TPath, ...args: inferHandlerInput<TProcedure>],
    opts?: TRPCFetchInfiniteQueryOptions<
      TInput,
      TRPCClientError<TRouter>,
      TOutput
    >,
  ) => Promise<InfiniteData<TOutput>>;
  /**
   * @link https://react-query.tanstack.com/guides/prefetching
   */
  prefetchQuery: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TProcedure extends TRouter['_def']['queries'][TPath],
    TOutput extends inferProcedureOutput<TProcedure>,
    TInput extends inferProcedureInput<TProcedure>,
  >(
    pathAndInput: [path: TPath, ...args: inferHandlerInput<TProcedure>],
    opts?: TRPCFetchQueryOptions<TInput, TRPCClientError<TRouter>, TOutput>,
  ) => Promise<void>;

  /**
   * @link https://react-query.tanstack.com/guides/prefetching
   */
  prefetchInfiniteQuery: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TProcedure extends TRouter['_def']['queries'][TPath],
    TOutput extends inferProcedureOutput<TProcedure>,
    TInput extends inferProcedureInput<TProcedure>,
  >(
    pathAndInput: [path: TPath, ...args: inferHandlerInput<TProcedure>],
    opts?: TRPCFetchInfiniteQueryOptions<
      TInput,
      TRPCClientError<TRouter>,
      TOutput
    >,
  ) => Promise<void>;

  /**
   * @deprecated use `invalidateQueries`
   */
  invalidateQuery: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TInput extends inferProcedureInput<TRouter['_def']['queries'][TPath]>,
  >(
    pathAndInput: [TPath, TInput?],
  ) => Promise<void>;
  /**
   * @link https://react-query.tanstack.com/guides/query-invalidation
   */
  invalidateQueries: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TInput extends inferProcedureInput<TRouter['_def']['queries'][TPath]>,
  >(
    pathAndInput: [TPath, TInput?] | TPath,
  ) => Promise<void>;
  /**
   * @link https://react-query.tanstack.com/guides/query-cancellation
   */
  cancelQuery: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TInput extends inferProcedureInput<TRouter['_def']['queries'][TPath]>,
  >(
    pathAndInput: [TPath, TInput?],
  ) => Promise<void>;
  /**
   * @link https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydata
   */
  setQueryData: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TInput extends inferProcedureInput<TRouter['_def']['queries'][TPath]>,
    TOutput extends inferProcedureOutput<TRouter['_def']['queries'][TPath]>,
  >(
    pathAndInput: [TPath, TInput?],
    output: TOutput,
  ) => void;
  /**
   * @link https://react-query.tanstack.com/reference/QueryClient#queryclientgetquerydata
   */
  getQueryData: <
    TPath extends keyof TRouter['_def']['queries'] & string,
    TInput extends inferProcedureInput<TRouter['_def']['queries'][TPath]>,
    TOutput extends inferProcedureOutput<TRouter['_def']['queries'][TPath]>,
  >(
    pathAndInput: [TPath, TInput?],
  ) => TOutput | undefined;
};

export const TRPCContext = createContext(null as any);
