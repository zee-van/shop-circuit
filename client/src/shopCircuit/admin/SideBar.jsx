import React, { useState } from 'react'
import LinkTabs from './LinkTabs'

function SideBar() {
  return (
    <>
      <div className='flex flex-col justify-start py-4 px-2 gap-4 bg-zinc-900 h-screen w-1/3 text-stone-200 md:w-72 sticky top-0'>
        <LinkTabs path='/admin/viewallproducts' title='View Products' />
        <LinkTabs path='/admin/viewsellers' title='View Sellers' />
        <LinkTabs path='/admin/viewnewsellers' title='View New Sellers' />
        <LinkTabs path='/admin/viewuserposts' title="View User's Posts" />
        {/* <LinkTabs path='' title='Delete All Products' /> */}
        {/* <LinkTabs path='' title='Delete All Sellers' /> */}
      </div>
    </>
  )
}

export default SideBar