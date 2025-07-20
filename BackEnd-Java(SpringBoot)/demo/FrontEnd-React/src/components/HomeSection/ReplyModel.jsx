import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Avatar } from '@mui/material';
import { useTweetContext } from '../TweetContext';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const ReplyModel = ({ open, handleClose, tweet }) => {
  const { addComment } = useTweetContext();
  const [reply, setReply] = useState('');

  const handleReplySubmit = () => {
    if (!reply.trim() || !tweet?.id) return;

    addComment(tweet.id, reply); // ✅ pass text only
    setReply('');
    handleClose();
  };

  if (!tweet) return null;

  const { name, username, time, tweetText, tweetImage } = tweet;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>Reply to @{username}</Typography>
        <Box display="flex" gap={2} alignItems="flex-start">
          <Avatar />
          <Box>
            <Typography fontWeight="bold">{name}</Typography>
            <Typography color="text.secondary">@{username} • {time}</Typography>
            <Typography mt={1}>{tweetText}</Typography>
            {tweetImage && (
              <img
                src={tweetImage}
                alt="tweet"
                className="mt-2 rounded-xl max-h-[300px] border border-gray-200"
              />
            )}
          </Box>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="Tweet your reply"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          sx={{ mt: 3 }}
        />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={handleReplySubmit} variant="contained">Reply</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReplyModel;
