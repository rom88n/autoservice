// base
import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover, &:focus': {
      color: 'inherit',
      textDecoration: 'none'
    }
  }
})

const CustomLink = (props) => {
  const { className, activeClassName, href, hrefAs, children, style, currentRef, onClick } = props;
  const router = useRouter();
  const classes = useStyles();

  return (
    <NextLink href={href} as={hrefAs} passHref>
      <a
        className={classNames(classes.root, className, router.pathname === href && activeClassName)}
        onClick={onClick}
        style={style}
        ref={currentRef}
      >
        {children}
      </a>
    </NextLink>
  );
};

CustomLink.propTypes = {
  href: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  className: PropTypes.string,
  currentRef: PropTypes.any,
  activeClassName: PropTypes.string,
  hrefAs: PropTypes.string,
  style: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any
};

export const Link = React.forwardRef((props, ref) => <CustomLink {...props} currentRef={ref}/>)
