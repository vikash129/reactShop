import React from 'react';
import { ThemeProvider, createMuiTheme, Typography } from '@material-ui/core'
import { blue, red } from '@material-ui/core/colors'

import { fade, makeStyles, AppBar, Toolbar, InputBase, Badge, IconButton, Button, MenuItem, Menu, Popover } from '@material-ui/core';

import { Link } from 'react-router-dom';

//icons
import { Search, AccountCircle, FavoriteBorderOutlined, Menu as MenuIcon, Mail, Notifications, More as MoreIcon, Create, UpdateOutlined, CancelOutlined } from '@material-ui/icons';
import logo from '../logo.png'


const theme = createMuiTheme({
  palette: {
    secondary: {
      main: red[500]
    },
    primary: {
      main: blue[100]
    }
  }
})

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
  header: {
    backgroundColor: blue[200],
    color: 'black',
    width: '100vw',
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
    margin: theme.spacing(2),
    paddingInline: theme.spacing(2)

  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '20px'
  },
  typography: {
    padding: theme.spacing(2)
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

}));



export function Header({ loginUser, removeCookie, cartList, setSearch ,search}) {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [cartAnchorEl, setCartAnchorEl] = React.useState(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const cartOpen = Boolean(cartAnchorEl);
  const cartId = cartOpen ? 'simple-popover' : undefined;

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
    e.preventDefault()
    setCartAnchorEl(e.currentTarget)
  }

  function handleLogOut(e) {
    e.preventDefault()

    removeCookie('loginUser')
    window.location.href = '/'

  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value)

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
          component={Link}
          to='/create'  >

          <Create />   <p> Create-Products</p>

        </IconButton>
      </MenuItem>



      <MenuItem  >
        <IconButton
          aria-label="edit products"
          component={Link}
          to='/edit'  >

          <UpdateOutlined />   <p> Edit Products</p>
        </IconButton>

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

      {/* profile */}
      <MenuItem onClick={handleProfileMenuOpen} className={classes.profile} >
        <p>Profile</p>

        <IconButton
          aria-label="account of  user"
          aria-haspopup="true"
          color='inherit'

        >
          <AccountCircle />
        </IconButton>
        <p> {loginUser?.username}</p>
      </MenuItem>


      {/* login logout button */}
      <MenuItem>
        {loginUser ?

          (<Button
            className={classes.link}
            size='large'
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

    </Menu>
  );




  return (
    <div className={classes.grow} >

      <AppBar position="static" className={classes.header}>

        <Toolbar >

          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="Menu"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
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
              onChange={handleSearch}
              value = {search}
            />

<IconButton onClick = {() => setSearch(null)}>
            <CancelOutlined />
          </IconButton>

          </div>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>

            <Button
              component={Link}
              variant='contained'
              className={classes.link}
              to='/create'

            >
              <Create /> Create-Products
            </Button>


            <Button
              to='/edit'
              variant='contained'
              component={Link}
              className={classes.link}

            >

              <UpdateOutlined />   Edit Products
            </Button>

            {/* fav item list */}
            <IconButton
              aria-describedby={cartId}
              aria-label="show 4 new mails"
              color="inherit"
              onClick={(e) => setCartAnchorEl(e.currentTarget)}
            >

              <Badge badgeContent={cartList.length} color="secondary" >

                <FavoriteBorderOutlined />
              </Badge>
            </IconButton>

            <Popover
              id={cartId}
              open={cartOpen}
              anchorEl={cartAnchorEl}
              onClose={() => { setCartAnchorEl(null) }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >

              <Typography className={classes.typography}>

                {loginUser
                  ? cartList.map((product, index) =>
                  (<div key={index} className='m-2'>
                    {index + 1} )   {product.product} - {product.price} Rs
                    <hr />
                  </div>))

                  : <> <b>Login to View Fav list </b>  </>}

              </Typography>
            </Popover>

            <IconButton
              aria-label="account of  user"
              aria-haspopup="true"
              color='inherit'
            >
              <div className={classes.profile}>
                <AccountCircle />
                {loginUser?.username}
              </div>

            </IconButton>


            {/* login logout */}
            <ThemeProvider theme={theme} >

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
            </ThemeProvider>


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

