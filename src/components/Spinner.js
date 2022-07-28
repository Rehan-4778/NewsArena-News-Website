import React, { Component } from 'react'
import loader from './loader.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div style={{height:'60vh', display:'flex' , justifyContent:'center', alignItems:'center'}}>
        <img src={loader} alt="loading" />
      </div>
    )
  }
}
