import React from 'react'
import Navbar from './Navigasi'

const Beranda = ({ Toggle }) => {
  return (
    <div>
      <Navbar Toggle={Toggle} />
      <div className='container-fluid'>
        <div className='row g-3 my-2'>
          <div className='col-md-3'>
            <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
              <div>
                <h3 className='fs-2'>230</h3>
                <p className='fs-5'>News</p>
              </div>
              <i className='@@ p-3 fs-1' onClick={Toggle}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Beranda;
