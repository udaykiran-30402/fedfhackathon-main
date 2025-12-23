import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductBySlug, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

// Product detail page with images, reviews, and related products
const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || "");
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">Product Not Found</h1>
        <Link to="/shop">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  // Get related products from same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <span className="mx-2">/</span>
        <span className="capitalize">{product.category}</span>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      {/* Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images Gallery */}
        <div>
          {/* Main Image */}
          <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className="aspect-square bg-muted rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                  onClick={() => {
                    // Image switching will be handled by state later
                    const mainImage = document.querySelector('.aspect-square img') as HTMLImageElement;
                    if (mainImage) mainImage.src = image;
                  }}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          <div className="mb-4">
            <Badge variant="outline" className="mb-2 capitalize">
              {product.category}
            </Badge>
            <h1 className="font-heading text-4xl font-bold mb-2">
              {product.name}
            </h1>
            
            {/* Reviews */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= avgRating
                        ? "fill-accent text-accent"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <Badge className="bg-primary">
                    Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes.length > 1 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="text-lg font-semibold w-12 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              size="lg"
              className="flex-1"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </Button>
          </div>

          {/* Features */}
          <div className="space-y-3 border-t pt-6">
            <div className="flex items-center space-x-3 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <span>Free shipping on orders over ₹2,000</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <RefreshCw className="h-5 w-5 text-primary" />
              <span>Easy 15-day returns</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Shield className="h-5 w-5 text-primary" />
              <span>Authenticity guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
          <TabsTrigger value="care">Care</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="font-heading text-2xl font-semibold mb-4">Product Details</h3>
            <ul className="space-y-2">
              {product.details.map((detail, index) => (
                <li key={index} className="text-muted-foreground">{detail}</li>
              ))}
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Material:</span>
                <span className="ml-2 capitalize">{product.material}</span>
              </div>
              <div>
                <span className="font-semibold">Origin:</span>
                <span className="ml-2">{product.origin}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <h3 className="font-heading text-2xl font-semibold mb-6">Customer Reviews</h3>
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{review.user}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "fill-accent text-accent"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          )}
        </TabsContent>

        <TabsContent value="care" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="font-heading text-2xl font-semibold mb-4">Care Instructions</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Handle with care to preserve the handwoven texture</li>
              <li>Dry clean recommended for silk products</li>
              <li>Hand wash in cold water for cotton products</li>
              <li>Do not bleach or use harsh chemicals</li>
              <li>Iron on low to medium heat</li>
              <li>Store in a cool, dry place away from direct sunlight</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-heading text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
