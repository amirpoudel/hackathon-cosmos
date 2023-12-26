import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Typography, Box, Divider } from '@mui/material';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
// import CustomAvatar from '../TableComponents/CustomAvatar'
// import { ReactComponent as RedArrow } from '../../assets/icons/High.svg'
// import { ReactComponent as YellowArrow } from '../../assets/icons/Medium.svg'
// import { ReactComponent as BlueArrow } from '../../assets/icons/Low.svg'
import { getTime } from 'src/utils/get_datetime';

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  /* background: ${({ isDragging }) => (isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white')}; */
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
  /* .priority{ */
  /* margin-right: 12px; */
  /* align-self: center;
    svg{
      width: 12px !important;
      height: 12px !important;
      margin-right: 12px; */
  /* margin-top: 2px; */
  /* } */
  /* } */
`;

function TaskCard({ item, index }) {
  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <TaskInformation>
            <Typography variant="subtitle2">Table Number : {item?.tableNumber}</Typography>
            <div className="secondary-details">
              <p>{getTime(item?.createdAt)}</p>
            </div>

            <Typography variant="subtitle2">Order Note : {item?.orderNote}</Typography>
            <Typography variant="subtitle2">Amount : Rs {item?.totalAmount}</Typography>
            <Box>
              <Typography variant="subtitle2" sx={{ color: 'black' }}>
                Order Info
              </Typography>
              <Divider />
              {item?.orderItems?.map((orderItem, mapIndex) => (
                <Box key={mapIndex}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="subtitle2">{orderItem?.itemName} : </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'green' }}>
                      {orderItem?.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}{' '}
            </Box>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;

// <span className="priority">
// {item.Priority === 'High' ? (<RedArrow />) : item.Priority === 'Medium' ? (<YellowArrow />) : (<BlueArrow />)}
// </span>
// <div><CustomAvatar name={item.Assignee} isTable={false} size={16} /></div>

TaskCard.propTypes = {
  item: PropTypes.any,
  index: PropTypes.number,
};
