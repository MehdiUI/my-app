"use client";
import { productType } from "@/constants/data";
import Link from "next/link";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {

 return (
    <div className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-3 text-xs sm:text-sm font-semibold">
        {productType?.map((item) => (
          <button
            onClick={() => onTabSelect(item?.title)}
            key={item?.title}
            className={`border border-shop-light-green/30 px-3 py-1.5 sm:px-4 sm:py-1.5 md:px-6 md:py-2 rounded-full whitespace-nowrap
               hover:bg-shop-light-green hover:border-shop-light-green hover:text-white hoverEffect
               ${selectedTab === item?.title ? "bg-shop-light-green text-white border-shop-light-green" :
                "bg-shop-light-green/10"}`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link
        href={"/shop"}
        className="border border-darkColor px-4 py-1 rounded-full hover:bg-shop-light-green
         hover:text-white hover:border-shop-light-green hoverEffect whitespace-nowrap text-xs sm:text-sm w-fit self-end"
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabBar;