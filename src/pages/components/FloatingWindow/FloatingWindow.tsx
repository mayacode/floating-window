import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useResize from '../../hooks/useResize';

interface FloatingWindowProps {
  title: string;
  onClose: () => void;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({ title, onClose }) => {
  const { resizeElement, resizedHeight, setResizeElement } = useResize();

  console.log(resizeElement?.getClientRects())
  console.log(resizedHeight)

  return (
    <Draggable handle=".handle" cancel=".cancel">
      <div ref={setResizeElement} className="handle">
      <Paper
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 999,
            height: 'auto',
            width: '300px', // Set your initial width
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <div>{title}</div>
            <IconButton color="primary" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            some text here
          </div>
        </Paper>
      </div>
    </Draggable>
  );
};

export default FloatingWindow;
