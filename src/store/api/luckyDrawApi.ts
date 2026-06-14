import type {
  History,
  HistoryResponse,
  ImportUsersResponse,
  LoginRequest,
  LoginResponse,
  Participant,
  PrizesResponse,
  Reward,
  SelectWinnerResponse,
  Winner,
  WinnerType,
} from '../../types'
import { baseApi } from './baseApi'

export const luckyDrawApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getRewards: builder.query<Reward[], void>({
      query: () => '/rewards',
      providesTags: ['Reward'],
    }),
    getPrizes: builder.query<PrizesResponse, { prizeType: WinnerType }>({
      query: ({ prizeType }) => `/prize?prize-type=${prizeType}`,
      providesTags: ['Reward'],
    }),
    getWinners: builder.query<Winner[], void>({
      query: () => '/winners',
      providesTags: ['Winner'],
    }),
    getParticipants: builder.query<Participant[], void>({
      query: () => '/participants',
      providesTags: ['Participant'],
    }),
    getHisotry: builder.query<History[], { type: WinnerType }>({
      query: ({ type }) => `/history?type=${type}`,
      transformResponse: (response: HistoryResponse) => response.result ?? [],
      providesTags: ['Participant'],
    }),
    exportWinners: builder.query<Blob, { type: WinnerType }>({
      query: ({ type }) => ({
        url: `/history/export?type=${type}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
    importUsers: builder.mutation<ImportUsersResponse, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          url: '/uploadfile/import-users',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Participant', 'Reward'],
    }),
    selectWinner: builder.mutation<
      SelectWinnerResponse,
      { prize: string; prizeType: WinnerType }
    >({
      query: ({ prize, prizeType }) => ({
        url: `/select-winner?prize=${prize}&prize-type=${prizeType}`,
        method: 'POST',
      }),
      invalidatesTags: ['Winner', 'Reward', 'Participant'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetRewardsQuery,
  useGetPrizesQuery,
  useGetWinnersQuery,
  useGetParticipantsQuery,
  useGetHisotryQuery,
  useLazyGetHisotryQuery,
  useLazyExportWinnersQuery,
  useImportUsersMutation,
  useSelectWinnerMutation,
} = luckyDrawApi
