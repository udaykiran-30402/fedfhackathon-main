import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/ProductCard";
import { products, Product } from "@/data/products";

// Shop page with product grid and filters
const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Initialize selected categories from URL parameter
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  const categories = ["sarees", "kurtas", "accessories"];
  const materials = ["silk", "cotton"];

  // Apply filters whenever selections change
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Material filter
    if (selectedMaterials.length > 0) {
      result = result.filter(p => selectedMaterials.includes(p.material));
    }

    // Price filter
    if (priceRange === "under-2000") {
      result = result.filter(p => p.price < 2000);
    } else if (priceRange === "2000-5000") {
      result = result.filter(p => p.price >= 2000 && p.price <= 5000);
    } else if (priceRange === "above-5000") {
      result = result.filter(p => p.price > 5000);
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [selectedCategories, selectedMaterials, priceRange, sortBy]);

  // Handle category checkbox
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    
    // Update URL parameter
    if (newCategories.length === 1) {
      setSearchParams({ category: newCategories[0] });
    } else if (newCategories.length === 0) {
      setSearchParams({});
    }
  };

  // Handle material checkbox
  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  // Filter sidebar component
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={category} className="capitalize cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Material</h3>
        <div className="space-y-2">
          {materials.map(material => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => toggleMaterial(material)}
              />
              <Label htmlFor={material} className="capitalize cursor-pointer">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="font-heading font-semibold mb-3">Price Range</h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="All prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All prices</SelectItem>
            <SelectItem value="under-2000">Under ₹2,000</SelectItem>
            <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
            <SelectItem value="above-5000">Above ₹5,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategories([]);
          setSelectedMaterials([]);
          setPriceRange("all");
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          Shop Handloom Collection
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover our curated collection of authentic handloom textiles
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20 bg-card p-6 rounded-lg border">
            <h2 className="font-heading font-bold text-xl mb-6">Filters</h2>
            <FilterContent />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filters & Sort */}
          <div className="flex items-center justify-between mb-6">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products found matching your filters.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedMaterials([]);
                  setPriceRange("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
