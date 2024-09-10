import React from 'react'

//content btw tags to give children
export default function Message({variant,children}) {
  return (
    //dynamic class
    <div className={`alert alert-${variant}`}>
      {children}
    </div>
  )
}
