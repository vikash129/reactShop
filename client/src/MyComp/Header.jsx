import React from 'react';

import { fade, makeStyles, AppBar, Toolbar, InputBase, Badge, IconButton, Button, MenuItem, Menu } from '@material-ui/core';

import { Link } from 'react-router-dom';

//icons
import { Search, AccountCircle, FavoriteBorderOutlined, Menu as MenuIcon, Mail, Notifications, More as MoreIcon, Create, UpdateOutlined } from '@material-ui/icons';
import logo from '../logo.png'


const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 60,
    maxHeight: 60,
    borderRadius: 20,
    marginRight: theme.spacing(2),

  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: 'green'
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
    textDecoration: 'none',
    color: 'inherit',
    margin: theme.spacing(2)

  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '20px'
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

}));


export function Header({ loginUser, removeCookie, cartList }) {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const showCartList = (e) => {
    console.log(cartList)
  }

  function handleLogOut(e) {
    e.preventDefault()

    removeCookie('loginUser')
    window.location.href = '/'

  }

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      aria-controls={mobileMenuId}
      aria-haspopup="true"
      onClick={handleMobileMenuOpen}
    >

      <MenuItem >

        <IconButton
          aria-label="create products"
          component={Link}  to='/create'  >

          <Create />   <p> Create-Products</p>

        </IconButton>
      </MenuItem>



      <MenuItem  >
        <IconButton
          aria-label="edit products"
          component={Link}  to='/edit'  >

          <UpdateOutlined />   <p> Edit Products</p>
        </IconButton>

      </MenuItem>


      {/* login logout button */}
      <MenuItem>
        {loginUser ?

          (<Button
            className={classes.link}
            color='secondary'
            variant='contained'
            onClick={(e) => { handleLogOut(e) }}
          >
            <p> LogOut</p>
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
              <p>  LogIn</p>

            </Button>
          )
        }
      </MenuItem>



      <MenuItem>
        <IconButton
          aria-label="show 4 new mails"
          color="inherit"
          onClick={showCartList} >

          <Badge badgeContent={cartList.length} color="secondary" >

            <FavoriteBorderOutlined />
          </Badge>
        </IconButton>
        <p>FavList</p>
      </MenuItem>



      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Mail />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>


      <MenuItem onClick={handleProfileMenuOpen} className={classes.profile} >
        <IconButton
          aria-label="account of  user"
          aria-haspopup="true"
          color='inherit'

        >
          <AccountCircle />

        </IconButton>

        {loginUser?.username}
        <p>Profile</p>
      </MenuItem>

    </Menu>
  );




  return (
    <div className={classes.grow}>

      <AppBar position="static">

        <Toolbar >

          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="Menu"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            // onClick={handleMobileMenuOpen}
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            color="inherit"
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
          >
            <MenuIcon />
          </IconButton>


          <IconButton
            className={classes.title}
            variant='outlined'
            component={Link}
            to='/'
          >

            <img src={logo} alt='Eshop' className={classes.logo} />

            React EcommShop
          </IconButton>

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

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>

            <Button
              component={Link}
              variant='contained'
              className={classes.link}
              to='/create'

            >
             <Create/> Create-Products
            </Button>


            <Button
              to='/edit'
              variant='contained'
              component={Link}
              className={classes.link}

            >

           <UpdateOutlined/>   Edit Products
            </Button>

            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              onClick={showCartList} >

              <Badge badgeContent={cartList.length} color="secondary" >

                <FavoriteBorderOutlined />
              </Badge>
            </IconButton>


            <div className={classes.profile}  >
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

          </div>



          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

        </Toolbar>

      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

