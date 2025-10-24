"use client"
import Link from 'next/link';
import { HeaderData } from '../constants/data';
import { usePathname } from 'next/navigation';

const HeaderMenu = () => {
    const pathname= usePathname()
   
  return (
    <div className='hidden md:inline-flex w-1/3 item-center gap-7 text-sm capitalize font-normal text-lightColor '>
        {HeaderData?.map((item) => (
            <Link key={item?.title} href={item?.link} className={`hover:text-shop_light_green hoverEffect relative group  ${pathname === item?.link && "text-shop_light_green" }`} >
                {item?.title} <span className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-shop_light_green group-hover:w-1/2 hoverEffect group-hover:left-0 ${pathname === item?.link && "w-1/2" }`} />
                <span className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-shop_light_green group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathname === item?.link && "w-1/2" }`} />
            </Link>
        ))}
    </div>
  )
}

export default HeaderMenu;