import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DragableTree from '../dragable-tree/DragableTree';
import './MultiDragableTree.scss';


export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  handleItemChange(items, parent) {
    const newItems = [...this.props.items];
    const branch = newItems.find(item => item.id === parent.id);
    branch.items = items;
    if (this.props.onChange) {
      this.props.onChange(newItems);
    }
  }

  getItemById(id) {
    const { root } = this.props;
    return root.items.find(child => child.id === id);
  }

  getItemsById(id) {
    const targetItem = this.getItemById(id);
    return targetItem
      ? targetItem.items
      : [];
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const newItems = DragableTree.reorder(
        this.getItemsById(source.droppableId),
        source.index,
        destination.index
      );
      // let state = { items };
      // if (source.droppableId === 'droppable2') {
      //   state = { selected: items };
      // }
      this.handleItemChange(
        newItems,
        this.getItemById(source.droppableId)
      );
    } else {
      const srcItem = this.getItemById(source.droppableId);
      const destItem = this.getItemById(destination.droppableId);
      const results = DragableTree.move(
        srcItem.items,
        destItem.items,
        source,
        destination
      );
      this.handleItemChange(
        results[0],
        srcItem
      );
      this.handleItemChange(
        results[1],
        destItem
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderItemGroup(item, props) {
    return (
      <div key={item.id} className="multi-dragable-tree__tree m-3">
        <div>{item.content}</div>
        <DragableTree
          parent={item}
          items={item.items}
          onChange={this.handleItemChange}
          noWrap
          {...props}
        />
      </div>
    );
  }

  render() {
    const { items = [], onChange, ...restProps } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd} {...restProps}>
        <div className="multi-dragable-tree d-flex flex-wrap">
          {(items || []).filter(item => item.id).map(item => (
            item.items.length > 0
              ? this.renderItemGroup(item, restProps)
              : null
          ))}
        </div>
      </DragDropContext>
    );
  }
}
