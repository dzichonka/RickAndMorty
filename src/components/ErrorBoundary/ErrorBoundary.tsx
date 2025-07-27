import { Component, type ReactNode } from 'react';
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage';
import { MemoryRouter } from 'react-router-dom';

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: ErrorBoundaryState = {
    hasError: false,
  };
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
