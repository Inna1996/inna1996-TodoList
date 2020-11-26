import React from 'react';
import cl from './DeleteButton.module.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const DeleteButton = ({ onClickDelete, id }) => {
  return (
    <IconButton aria-label="Delete" className={cl['buttondelete']}
      onClick={() => { onClickDelete(id) }}>
      <DeleteIcon />
    </IconButton>

  );
};

export default DeleteButton;

