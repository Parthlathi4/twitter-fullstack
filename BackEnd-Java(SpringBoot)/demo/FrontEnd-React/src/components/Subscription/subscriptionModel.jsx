// src/components/RightPart/subscriptionModel.jsx
import React, { useState } from 'react';
import { Box, Button, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 3
};

const SubscriptionModel = () => {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState("Anually");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          borderRadius: "30px",
          textTransform: "none",
          fontWeight: "bold",
          paddingX: "20px",
          paddingY: "8px",
          fontSize: "14px",
        }}
        onClick={handleOpen}
      >
        Get Verified
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="subscription-modal"
        aria-describedby="subscription-options"
      >
        <Box sx={style}>
          {/* Close Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Blue Subscription</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Banner */}
          <div className="p-5 rounded-md flex items-center justify-between shadow-lg mb-6">
            <h1 className="text-lg font-semibold pr-5">Blue Subscribers – HELLO!!!</h1>
            <img
              className="w-16 h-16"
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
              alt="verified"
            />
          </div>

          {/* Plan Toggle */}
          <div className="flex justify-between border rounded-full px-5 py-3 mb-6">
            <div>
              <span
                onClick={() => setPlan("Anually")}
                className={`cursor-pointer ${plan === "Anually" ? "text-black" : "text-gray-600"}`}
              >
                Anually
              </span>
              <span className="text-green-500 text-sm ml-3">SAVE 12%</span>
            </div>
            <p
              onClick={() => setPlan("Monthly")}
              className={`cursor-pointer ${plan === "Monthly" ? "text-black" : "text-gray-600"}`}
            >
              Monthly
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <FiberManualRecordIcon sx={{ width: '7px', height: '7px' }} />
              <p className="text-sm">Prioritized rankings in conversation and search</p>
            </div>
            <div className="flex items-center space-x-3">
              <FiberManualRecordIcon sx={{ width: '7px', height: '7px' }} />
              <p className="text-sm">Edit Tweet feature</p>
            </div>
            <div className="flex items-center space-x-3">
              <FiberManualRecordIcon sx={{ width: '7px', height: '7px' }} />
              <p className="text-sm">Longer Tweets and custom app icons</p>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SubscriptionModel;
