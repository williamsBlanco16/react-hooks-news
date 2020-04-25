import React from "react";
import useAuth from '../Auth/useAuth'

const LinkList=(props)=> {
  const user = useAuth()
  console.log({user})
  return <div>linkList</div>
}

export default LinkList;
