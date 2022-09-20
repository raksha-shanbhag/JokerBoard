import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { DialogTitle, TextField } from '@mui/material';

export default function UpdatePopUp(props) {
  const [content, setContent] = useState();

  useEffect(() => {
    setContent(props.content);
  }, [props.content]);

  function handleChange(event) {
    const {value} = event.target;
    setContent(value);
  }

  function handleUpdate() {
    props.handleUpdate(content)
  }

  function handleClose() {
    setContent("");
    props.handleClose()
  }

  return (
    <div className='PopUp'>
      <Dialog
        open={props.open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        maxWidth= 'sm'
      >
        <DialogTitle>{ props.title }</DialogTitle>
        <DialogContent  dividers={true} >
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
            width='auto'
          >
            <TextField
              className = ""
              name="content"
              onChange={handleChange}
              defaultValue={content}
              label="Content"
              multiline
              rows={4}
              style = {{width: '550px'}}
            />  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
