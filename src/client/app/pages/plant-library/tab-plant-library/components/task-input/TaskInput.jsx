import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  Box,
  Card,
  FormControl, InputLabel, MenuItem, Select, TextField
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  action: {
    marginTop: '10px',
    width: 150
  }
}));

export default function TaskInput({ task, onChange }) {
  const classes = useStyles();

  const handleChange = React.useCallback((event) => {
    const { target: { name, value } } = event;
    onChange(value, name, task);
  }, [task, onChange]);

  return (
    <Box mb={2}>
      <Card>
        <Box p={1}>
          <form className={classes.container} noValidate>
            <TextField
              label="Cứ mỗi (1d 1h 1m 1s)"
              margin="dense"
              type="text"
              name="every"
              variant="outlined"
              value={task.every}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Hành Động</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="action"
                value={task.action}
                onChange={handleChange}
                label="Hành Động"
                margin="dense"
                className={classes.action}
              >
                <MenuItem value="">
                  <em>- - - - - - - -</em>
                </MenuItem>
                <MenuItem value="bump">Tưới Nước</MenuItem>
                <MenuItem value="light">Bật Đèn</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Trong (1d 1h 1m 1s)"
              margin="dense"
              variant="outlined"
              type="text"
              name="duration"
              value={task.duration}
            />
            <TextField
              label="Từ thời điểm"
              type="datetime-local"
              name="beginTime"
              value={task.beginTime}
              defaultValue={moment().format('YYYY-MM-DDThh:mm')}
              onChange={handleChange}
              className={classes.textField}
              margin="dense"
              InputLabelProps={{
                shrink: true
              }}
            />
          </form>
        </Box>
      </Card>
    </Box>
  );
}
