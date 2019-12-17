import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import t from '../../../languages';


const grid = 2;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? '#f5f5f5' : '#fff',
  padding: grid,
  width: 250
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? '#fff' : '#fff',
  boxShadow: isDragging ? '0 0 5px rgba(0,0,0,.2)' : '',
  ...draggableStyle
});

export default class extends React.PureComponent {
  constructor(props) {
    super(props, t('pages.admin.title.dashboard'));
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  static reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  static move(source, destination, droppableSource, droppableDestination) {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    return [sourceClone, destClone];
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const { items, parent, onChange } = this.props;
    if (source.droppableId === destination.droppableId) {
      const newItems = this.constructor.reorder(
        items,
        result.source.index,
        result.destination.index
      );
      // let state = { items };
      // if (source.droppableId === 'droppable2') {
      //   state = { selected: items };
      // }
      if (typeof onChange === 'function') {
        onChange(
          newItems,
          parent
        );
      }
    } else {
      const targetItem = parent.parent.items.find(item => item.id === destination.droppableId);
      const results = this.constructor.move(
        items,
        targetItem.items,
        source,
        destination
      );
      if (typeof onChange === 'function') {
        onChange(
          results[0],
          parent
        );
        onChange(
          results[1],
          targetItem
        );
      }
    }
  }

  renderDropable() {
    const { items = [], parent } = this.props;

    return (
      <Droppable droppableId={parent.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {(items || []).filter(item => item.id).map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided1, snapshot1) => (
                  <div
                    ref={provided1.innerRef}
                    {...provided1.draggableProps}
                    {...provided1.dragHandleProps}
                    style={getItemStyle(
                      snapshot1.isDragging,
                      provided1.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  render() {
    const {
      items, parent, onChange, noWrap, ...restProps
    } = this.props;
    return (
      noWrap ? (
        this.renderDropable()
      ) : (
        <DragDropContext onDragEnd={this.onDragEnd} {...restProps}>
          {this.renderDropable()}
        </DragDropContext>
      )
    );
  }
}
