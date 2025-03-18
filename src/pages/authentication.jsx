import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/authContext';
import { Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Authentication() {

  const [username,setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [name,setName] = React.useState('');
  const [error,setError] =React.useState('');
  const [messages,setMessages] = React.useState('');
  const [formState,setFormState] =React.useState(0);
  const [open,setOpen] = React.useState();

  const navigate =useNavigate();
  
  const {handleLogin,handleRegister} = React.useContext(AuthContext)



  const handleAuth = async ()=>{
    setError('');
    console.log("srv")
    try{

      if(formState===0){
        const response=await handleLogin(username,password);
        console.log(response)
        setMessages(response);
        setUsername('')
        setPassword('')
        setOpen(true);        
        
      }

      if(formState===1){
        const response=await handleRegister(name,username,password);
        console.log(response);
        setMessages(response);
        setName('')
        setUsername('')
        setPassword('')
        setOpen(true);

      }
    }catch(err){
      let message = err.response ? err.response.data.message : err.message;
      setError(message);
      console.log(err)
    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://api.unsplash.com/photos/?client_id=sZ1qS_a_KAyyipwqK2cHGX948ckqNoeQFMdE9bwE9SU)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <div>
              <Button variant={formState===0?"contained":""} onClick={()=>{setFormState(0)}}>
                Sign in
              </Button>
              <Button variant={formState===1?"contained":""} onClick={()=>{setFormState(1)}}>
                Sign up
              </Button>
            </div>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box  noValidate  sx={{ mt: 1 }}>
              {formState===1? 
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="fullname"
                  label="Fullname"
                  name="fullname"
                  autoComplete="fullname"
                  autoFocus
                  onChange={(e)=>{setName(`${e.target.value}`)}}
                /> :<></>
              }
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e)=>{setUsername(e.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>{setPassword(e.target.value)}}
              />
              <p style={{color:"red"}}>{error}</p>
              <Button
                type="submit"
                fullWidth
                
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e)=>{
                  e.preventDefault();
                  handleAuth();
                }}
              >
                {formState===0? "Login": "Register"}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  message={messages}
                />
    </ThemeProvider>
  );
}