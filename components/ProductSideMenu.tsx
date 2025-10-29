"use client";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import { useMemo } from "react";
import toast from "react-hot-toast";

const ProductSideMenu = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  
  // Utilise useMemo pour calculer derived state
  const existingProduct = useMemo(() => {
    return favoriteProduct?.find((item) => item?._id === product?._id) || null;
  }, [product?._id, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed from favorites!"
            : "Product added to favorites!"
        );
      });
    }
  };

  return (
    <div
      className={cn("absolute top-2 right-2 hover:cursor-pointer", className)}
    >
      <div
        onClick={handleFavorite}
        className={`p-2.5 rounded-full hover:bg-shop-dark-green/80 hover:text-white hoverEffect transition-colors ${
          existingProduct 
            ? "bg-shop-dark-green/80 text-white" 
            : "bg-lightColor/10"
        }`}
      >
        <Heart size={15} />
      </div>
    </div>
  );
};

export default ProductSideMenu;