import { Send } from '@mui/icons-material';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';

const BroadCast = ({ isMobile, anchorEl, toggleOpenBroadCast, isBroadCastOpen, sendBroadCast }) => {
  const [showError, setShowError] = useState(false);
  const [broadCastMessage, setBroadCastMessage] = useState('');
  const [broadCastSeverity, setBroadCastSeverity] = useState('error');

  const validateBroadCast = () => {
    if (broadCastMessage.trim() !== '') {
      sendBroadCast({ message: broadCastMessage, severity: broadCastSeverity });
      setShowError(false);
      setBroadCastMessage('');
    } else {
      setShowError(true);
    }
  };

  return (
    <Menu
      open={isBroadCastOpen}
      onClose={toggleOpenBroadCast}
      anchorEl={anchorEl}
      MenuListProps={{ disablePadding: true }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left'
      }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent={'center'}
            width={'100%'}
            padding={2}
            sx={{
              backgroundColor: (theme) => theme.palette.secondaryButton.main,
              color: 'white'
            }}>
            <Typography variant="body1" fontWeight={'bold'}>
              Send a message to all our clients
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box padding={1}>
            <TextField
              label="Broadcast Message"
              error={showError}
              helperText={showError ? 'Do not leave empty!' : ''}
              fullWidth
              value={broadCastMessage}
              onChange={(event) => setBroadCastMessage(event.target.value)}></TextField>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box padding={1}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Severity</InputLabel>
              <Select
                label="Severity"
                value={broadCastSeverity}
                onChange={(event) => setBroadCastSeverity(event.target.value)}>
                <MenuItem value="error">Error</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="info">Info</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} padding={1}>
          <Box display={'flex'} justifyContent={'flex-end'}>
            <Tooltip title="Send BroadCast">
              <IconButton onClick={validateBroadCast} color="secondaryButton">
                <Send></Send>
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Menu>
  );
};

export default BroadCast;
