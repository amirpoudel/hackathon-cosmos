import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import styled from '@emotion/styled';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// import { columnsFromBackend } from './board';
import { updateOrderAsync } from 'src/redux/orderSlice';

import TaskCard from './task_card';

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

function Column() {
  const dispatch = useDispatch();
  const [columns, setColumns] = useState(null);

  const orderList = useSelector((state) => state.order.orderList);

  useEffect(() => {
    const col = {
      [uuidv4()]: {
        title: 'pending',
        items: orderList,
      },
      [uuidv4()]: {
        title: 'cooking',
        items: [],
      },
      [uuidv4()]: {
        title: 'ready_to_serve',
        items: [],
      },
      [uuidv4()]: {
        title: 'served',
        items: [],
      },
    };
    setColumns(col);
  }, [orderList, setColumns]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      console.log('removed', removed);
      console.log('dest col', destColumn);
      const data = {
        orderId: removed._id,
        status: destColumn.title,
      };
      dispatch(updateOrderAsync(data));

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  if (!columns) return null;
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
      <Container>
        <TaskColumnStyles>
          {Object?.entries(columns)?.map(([columnId, column], index) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                  <Title>{column.title}</Title>
                  {column.items.map((item, mapIndex) => (
                    <TaskCard key={item?._id} item={item} index={mapIndex} />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          ))}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
}

export default Column;