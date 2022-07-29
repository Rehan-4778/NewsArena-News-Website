import React from 'react'
import loader from './loader.gif'

const Spinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img style={{ width: '2rem', height: '2rem' }} src={loader} alt="loading" />
    </div>
  )

}

export default Spinner