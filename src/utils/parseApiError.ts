import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type ApiErrorBody = {
  code?: string
  message?: string
}

export type PopUpError = {
  code: string
  message: string
}

export function parseApiError(error: unknown): PopUpError {
  if (!navigator.onLine) {
    return {
      code: 'No Internet',
      message: 'Please check your internet connection and try again.',
    }
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    const fetchError = error as FetchBaseQueryError

    if (fetchError.status === 'FETCH_ERROR') {
      return {
        code: 'No Internet',
        message: 'Please check your internet connection and try again.',
      }
    }

    if (typeof fetchError.data === 'object' && fetchError.data !== null) {
      const data = fetchError.data as ApiErrorBody
      return {
        code: data.code ?? String(fetchError.status),
        message: data.message ?? 'Something went wrong. Please try again.',
      }
    }

    return {
      code: String(fetchError.status),
      message: 'Something went wrong. Please try again.',
    }
  }

  return {
    code: 'Error',
    message: 'Something went wrong. Please try again.',
  }
}
