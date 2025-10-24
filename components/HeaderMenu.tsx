import React from 'react'
import Link from 'next/link';
import { HeaderData } from '../constants/data';

const HeaderMenu = () => {
  return (
    <div className='hidden md:inline-flex w-1/3 item-center gap-7 text-sm capitalize font-normal text-lightColor '>
        {HeaderData?.map((item) => (
            <Link key={item?.title} href={item?.link} className={`hover:text-shop_light_green hoverEffect relative group`} >
                {item?.title} <span className='absolute left-0 -bottom-1 w-full h-0.5 bg-shop_light_green scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out' />
            </Link>
        ))}
    </div>
  )
}

export default HeaderMenu