import React from 'react'
import './breadcrumb.scss'

const BreadCrumb = ({root,path}) => {
  return (
    <section className="breadcrumb" style={{
        paddingBottom : '10px'
    }}>
        <p> <span>{root} </span> {path}</p>
    </section>
  )
}

export default BreadCrumb