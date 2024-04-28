import React from 'react'

const Iconbutton = ({icon, text=''}) => {
  return (
    <div className="flex-start create-posts-menu">
    {icon}
    <p className="base-semibold">{text}</p>
    </div>
  )
}

export default Iconbutton