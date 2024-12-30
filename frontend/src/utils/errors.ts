export function isApiError(error: unknown): error is { status: number } {
    return typeof error === 'object' && error !== null && 'status' in error;
  }