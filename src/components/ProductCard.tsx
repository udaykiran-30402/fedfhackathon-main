import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

// Reusable product card component with hover effects
const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product.slug}`}>
        <div className="relative overflow-hidden bg-muted aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.originalPrice && (
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Sale
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Out of Stock</span>
            </div>
          )}
          
          {/* Quick action buttons on hover */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault();
                // Add to wishlist functionality
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${product.slug}`}>
          <div className="mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {product.category}
            </span>
            <h3 className="font-heading font-semibold text-lg mt-1 group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-primary">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {product.description}
          </p>
        </Link>

        <Button 
          className="w-full" 
          variant="default"
          disabled={!product.inStock}
          onClick={() => {
            // Add to cart functionality
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
