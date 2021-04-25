import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { makeStyles, lighten } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'components'
import { useRouter } from 'next/router';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import menuItems from './menuItems'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '320px'
  },
  image: {
    width: '200px',
    margin: '.5rem auto 0'
  },
  listItem: {
    '&:hover': {
      background: lighten(theme.palette.primary.main, 0.9)
    }
  },
  listItemActive: {
    background: lighten(theme.palette.primary.main, 0.9)
  }
}))

export const Sidebar = () => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const [open, setOpen] = useState(false)
  const user = useSelector((state) => state.application.user);

  const handleDrawer = useCallback(() => {
    setOpen(!open)
  }, [open])

  const onClick = useCallback((item) => () => {
    if (isMobile) setOpen(!open)
    return item.onClick ? item.onClick({ dispatch }) : undefined
  }, [open])

  return (
    <SwipeableDrawer
      anchor="left"
      open={isMobile ? open : true}
      variant={isMobile ? undefined : 'permanent'}
      onOpen={handleDrawer}
      onClose={handleDrawer}
      classes={{ paper: classes.paper }}
      PaperProps={{ elevation: 0 }}
    >
      <img src="/autoservice-logo.png" alt="" className={classes.image}/>
      <Divider/>
      <List className={classes.list} disablePadding>
        {menuItems.map(item => {
          if (item.condition && item.condition(user) === false) return false

          return (
            <ListItem
              button
              divider
              onClick={onClick(item)}
              classes={{
                root: classNames(classes.listItem, { [classes.listItemActive]: item.href === router.pathname })
              }}
              key={item.label}
              component={item.href ? Link : undefined}
              href={item.href}
            >
              <ListItemIcon>
                <item.icon color="primary"/>
              </ListItemIcon>
              <ListItemText
                primary={item.label}
              />
            </ListItem>
          )
        })}
      </List>
    </SwipeableDrawer>
  );
};
