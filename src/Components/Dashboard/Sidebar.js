import React from 'react';
import { BsSpeedometer2, BsHouse, BsNewspaper, BsDatabase, BsGraphUp } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <div className="bg-white sidebar p-2">
        <div>
            <i className='bi bi-bootstrap-fill my-2 fs-4'></i>
            <span className='Brand-name fs-4'>Portal Berita</span> <br></br>
            <span className='Brand-name fs-5'>Karanganyar</span>
        </div>
        <hr className='text-drak'/>
        <div className='list-group list-group-flush'>
            <a className='list-group-item py-2 '>
                <BsSpeedometer2 className='fs-4 me-2' />
                <span className='fs-5'>Dashboard</span>
            </a>
            <a className='list-group-item py-2 '>
                <BsHouse className='fs-5 me-2' />
                <span className='fs-5'>Beranda</span>
            </a>
            <a className='list-group-item py-2 '>
                <BsNewspaper className='fs-5 me-2' />
                <span className='fs-5'>Berita</span>
            </a>
            <a className='list-group-item py-2 '>
                <BsDatabase className='fs-5 me-2' />
                <span className='fs-5'>Sumber</span>
            </a>
            <a className='list-group-item py-2 '>
                <BsGraphUp className='fs-5 me-2' />
                <span className='fs-5'>Hasil Analisis</span>
            </a>
            <a className='list-group-item py-2 '>

            </a>
        </div>
    </div>
  );
}

export default Sidebar;
