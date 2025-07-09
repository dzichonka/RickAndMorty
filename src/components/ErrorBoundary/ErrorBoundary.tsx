import { Component, type ReactNode } from 'react';
import { ErrorPage } from '../../pages/ErrorPage/ErrorPage';

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(): State {
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
      return <ErrorPage onRefresh={this.handleRefresh} />;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
