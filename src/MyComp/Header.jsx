import React from 'react';

import { fade, makeStyles, AppBar, Toolbar, InputBase, Badge, IconButton, Button, ButtonGroup } from '@material-ui/core';

import { Link } from 'react-router-dom';

//icons
import { Search, AccountCircle, FavoriteBorderOutlined, Menu as MenuIcon } from '@material-ui/icons';
import logo from '../logo.png'


const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 60,
    maxHeight : 60,
    borderRadius : 20 , 
    marginRight: theme.spacing(2),

  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'secondary'

  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  link: {
    textDecoration: 'inherit',
    color: 'danger',
    margin: theme.spacing(2)

  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '20px'
  }

}));


export function Header({ loginUser, removeCookie  , cartList  }) {

  const classes = useStyles();


  const showCartList = (e) => {
    console.log(cartList)
  }

  function handleLogOut(e) {
    e.preventDefault()

    removeCookie('loginUser')

    window.location.href = '/'

  }



  return (
    <div className={classes.grow}>

      <AppBar position="static">

        <Toolbar >
        
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>

          <img src= {logo} alt ='Eshop' className = {classes.logo} />

          <Button
            className={classes.title}
            variant='contained'
            component={Link}
            to='/'
          >

            React EcommShop
          </Button>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <ButtonGroup className='d-flex mx-2'>

            <Button
              component={Link}
              variant='contained'
              className={classes.link}
              to='/create'

            >
              Create-Products
            </Button>


            <Button
              to='/edit'
              variant='contained'
              component={Link}
              className={classes.link}

            >

              Edit Products
            </Button>


          </ButtonGroup>



          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            onClick={showCartList} >

            <Badge badgeContent={cartList.length} color="secondary" >

              <FavoriteBorderOutlined />
            </Badge>
          </IconButton>


          <div
            className={classes.profile}
          >
            <IconButton
              aria-label="account of  user"
              aria-haspopup="true"
              color='inherit'

            >
              <AccountCircle />

            </IconButton>

            {loginUser?.username}
          </div>


          {loginUser ?

            (<Button
              className={classes.link}
              color='secondary'
              variant='contained'
              onClick={(e) => { handleLogOut(e) }}
            >
              LogOut
            </Button>)
            :
            (
              <Button
                className={classes.link}
                color='primary'
                component={Link}
                variant='contained'
                to='/login'
              >
                LogIn
              </Button>
            )

          }



        </Toolbar>
      </AppBar>

    </div>
  );
}
