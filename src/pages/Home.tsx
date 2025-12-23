import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import heroImage from "@/assets/hero-handloom.jpg";
import artisanImage from "@/assets/artisan-story.jpg";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const { toast } = useToast();

  // 🔔 Show notification when the page loads
  useEffect(() => {
    toast({
      title: "Welcome to Hastkala!",
      description: "Discover our beautiful handloom collections.",
    });
  }, []);

  // 🔔 Trigger toast when “Shop Collection” button is clicked
  const handleShopClick = () => {
    toast({
      title: "Redirecting to Shop",
      description: "Explore our latest handloom creations!",
    });
  };

  // 🔔 Trigger toast when “View All Products” button is clicked
  const handleViewAllClick = () => {
    toast({
      title: "Showing all products",
      description: "Browse through our full collection.",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${heroImage})`,
          }}
        />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in">
            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Threads of
              <span className="block text-accent">Tradition</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Discover the timeless beauty of handloom textiles. Each piece tells a story of heritage, craftsmanship, and sustainable fashion.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={handleShopClick} // 👈 Notification added
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <a href="#story">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                >
                  Our Story
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="bg-primary/10 p-4 rounded-full">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Authentic Handloom</h3>
                <p className="text-muted-foreground">100% handwoven by skilled artisans</p>
              </div>
            </div>

            <div
              className="flex items-center space-x-4 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Quality Assured</h3>
                <p className="text-muted-foreground">Premium materials, lasting beauty</p>
              </div>
            </div>

            <div
              className="flex items-center space-x-4 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Global Shipping</h3>
                <p className="text-muted-foreground">Delivering heritage worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked treasures from our master weavers. Each piece is a work of art.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button size="lg" variant="outline" onClick={handleViewAllClick}>
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-secondary">
        {/* ... your category code stays unchanged ... */}
      </section>

      {/* Artisan Story */}
      <section id="story" className="py-16">
        {/* ... your artisan story code stays unchanged ... */}
      </section>
    </div>
  );
};

export default Home;
