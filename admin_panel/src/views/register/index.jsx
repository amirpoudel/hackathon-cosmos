import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { registerRestaurantAsync } from 'src/redux/authSlice';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const dispatch = useDispatch();
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantUserName, setRestaurantUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useTheme();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password did not match!', {
        position: 'top-right',
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }

    const data = {
      restaurantName,
      restaurantUserName,
      ownerName,
      ownerEmail,
      ownerPhoneNumber,
      password,
      confirmPassword,
    };

    dispatch(registerRestaurantAsync(data));
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <form onSubmit={handleRegister}>
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card
            sx={{
              p: 5,
              width: 1,
              maxWidth: 'md',
            }}
          >
            <Typography variant="h4">Sign in to Minimal</Typography>
            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              Already have an account?
              <Link to="/login" style={{ marginLeft: '8px' }}>
                Login
              </Link>
            </Typography>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Restaurant Info
              </Typography>
            </Divider>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="restaurantName"
                  label="Restaurant Name"
                  fullWidth
                  required
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <TextField
                  name="restaurantUserName"
                  label="Restaurant Username"
                  fullWidth
                  required
                  value={restaurantUserName}
                  onChange={(e) => setRestaurantUserName(e.target.value)}
                />
              </Grid>
            </Grid>{' '}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Owner Info
              </Typography>
            </Divider>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="ownerName"
                  label="Owner Name"
                  fullWidth
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />{' '}
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <TextField
                  name="ownerEmail"
                  label="Email address"
                  fullWidth
                  required
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                />{' '}
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <TextField
                  name="ownerPhoneNumber"
                  label="Phone Number"
                  fullWidth
                  required
                  value={ownerPhoneNumber}
                  onChange={(e) => setOwnerPhoneNumber(e.target.value)}
                />{' '}
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <TextField
                  name="password"
                  label="Password"
                  fullWidth
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />{' '}
              </Grid>{' '}
              <Grid item xs={12} md={6}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  fullWidth
                  required
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          <Iconify
                            icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack> */}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              sx={{ my: 3 }}
            >
              Register
            </LoadingButton>
          </Card>
        </Stack>
      </form>
    </Box>
  );
}
