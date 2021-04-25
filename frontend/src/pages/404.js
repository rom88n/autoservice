// base
import React, { useEffect } from 'react'
import Router from 'next/router'

const Error = () => {
  useEffect(() => {
    Router.push('/dashboard')
  });

  return (<div/>)
}

export default Error
