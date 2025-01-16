import React from 'react'
import LinkTab from '../../links/LinkTab'
import { useLocation } from 'react-router-dom';
import LinkLists from './LinkLists';

function SideBar() {
  return (
    <>
      <div className='flex flex-col justify-start py-4 px-2 gap-4 bg-zinc-900 h-screen w-1/3 text-stone-200 md:w-72 sticky top-0'>
        <LinkLists path='/sellers/products' title='Your Products' />
        <LinkLists path='/sellers/neworder' title="New User's Posts" />
        <LinkLists path='/sellers/newuserposts' title="New Order" />
        <LinkLists path='/sellers/acceptedorder' title='Accepted Orders' />
        <LinkLists path='/sellers/upload' title='Upload New One' />
        {/* <LinkLists path='' title='Delete All' /> */}
      </div>
    </>
  )
}

export default SideBar