import React from 'react';
import LeafLoading from '../loadings/LeafLoading';


export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  update() {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.props.reload) {
      return (
        <LeafLoading overlaping text="Trang đã cập nhập phiên bản mới..." timeout={5} />
      );
    }
    if (this.state.hasError) {
      return (
        <LeafLoading overlaping text="Trang đã cập nhập phiên bản mới!" timeout={5} />
      );
    }
    return this.props.children;
  }
}
