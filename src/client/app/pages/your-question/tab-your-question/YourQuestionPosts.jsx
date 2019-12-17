import React from 'react';
import InfinitePostList from '../../../components/blog/infinite-post-list/InfinitePostList';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.category = 'YourQuestion';
    this.innerRef = React.createRef();
  }

  render() {
    return (
      <InfinitePostList
        {...this.props}
        ref={this.innerRef}
        category={this.category}
      />
    );
  }
}
