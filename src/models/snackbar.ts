export interface SnackBarProps {
  message: string,
  type?: 'success' | 'info' | 'warning' | 'error',
  duration?: number,
  open: boolean,
}