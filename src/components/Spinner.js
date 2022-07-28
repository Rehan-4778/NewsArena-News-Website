import React, { Component } from 'react'
import loader from './loader.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div style={{display:'flex' , justifyContent:'center', alignItems:'center'}}>
        <img style={{width: '2rem', height:'2rem'}} src={loader} alt="loading" />
      </div>
    )
  }
}
