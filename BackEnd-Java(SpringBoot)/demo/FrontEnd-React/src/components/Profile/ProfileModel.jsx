import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#ffffff',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline: 'none',
  borderRadius: 4,
  zIndex: 2000,
};

export default function ProfileModel({ open = false, onClose, user, profileImage, coverImage, onSave }) {
  const [previewProfileImage, setPreviewProfileImage] = React.useState(profileImage);
  const [previewCoverImage, setPreviewCoverImage] = React.useState(coverImage);
  const [profileImgFile, setProfileImgFile] = React.useState(null);
  const [coverImgFile, setCoverImgFile] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      fullName: user.name,
      website: user.website,
      location: user.location,
      bio: user.bio,
    },
    onSubmit: (values) => {
      const updatedUser = {
        ...user,
        name: values.fullName,
        website: values.website,
        location: values.location,
        bio: values.bio,
      };

      onSave(updatedUser, previewProfileImage, previewCoverImage);
      onClose();
    },
  });

  const handleImageChange = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === 'image') {
        setPreviewProfileImage(reader.result);
        setProfileImgFile(file);
      } else if (name === 'backgroundImage') {
        setPreviewCoverImage(reader.result);
        setCoverImgFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
              <p>Edit Profile</p>
            </div>
            <Button type="submit">Save</Button>
          </div>

          <div className="overflow-y-scroll overflow-x-hidden h-[80vh]">
            {/* Cover Image */}
            <div className="w-full">
              <div className="relative">
                <img
                  className="w-full h-[12rem] object-cover object-center"
                  src={previewCoverImage}
                  alt="Cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  name="backgroundImage"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
              <div className="relative">
                <Avatar
                  sx={{
                    width: '10rem',
                    height: '10rem',
                    border: '4px solid white',
                  }}
                  src={previewProfileImage}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  name="image"
                />
              </div>
            </div>

            {/* Fields */}
            <div className="space-y-3 -mt-14">
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                id="bio"
                name="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                id="website"
                name="website"
                label="Website"
                value={formik.values.website}
                onChange={formik.handleChange}
              />

              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
              />

              <div className="my-3">
                <p className="text-lg">BirthDate . Edit</p>
                <p className="text-2xl">April-04-2004</p>
              </div>
              <p className="py-3 text-lg">Edit Professional Profile</p>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
