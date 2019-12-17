import React from 'react';
import LeafLoading from '../utils/loadings/LeafLoading';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <LeafLoading overlaping text="Trang đã cập nhập phiên bản mới!" timeout={5} />
      );
    }
    return this.props.children;
  }
}
