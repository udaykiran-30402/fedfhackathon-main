import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Wishlist page - placeholder for future implementation
const Wishlist = () => {
  const wishlistItems: any[] = [];

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="font-heading text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Save your favorite items here for later.
          </p>
          <Link to="/shop">
            <Button size="lg">
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-4xl font-bold mb-8">My Wishlist</h1>
      {/* Wishlist items will be displayed here */}
    </div>
  );
};

export default Wishlist;
