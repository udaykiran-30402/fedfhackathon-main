import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Cart page with items list and checkout button
const Cart = () => {
  // Mock cart items - will be managed by context/state later
  const [cartItems, setCartItems] = useState<any[]>([]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="font-heading text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/shop">
            <Button size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div key={index}>
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link to={`/product/${item.slug}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground capitalize">
                          {item.category} • {item.size || "One Size"}
                        </p>
                        <p className="font-semibold text-primary mt-1">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                // Decrease quantity
                              }}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                // Increase quantity
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              // Remove item
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {subtotal < 2000 && (
                  <p className="text-sm text-muted-foreground">
                    Add ₹{(2000 - subtotal).toLocaleString('en-IN')} more for free shipping
                  </p>
                )}
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <Button className="w-full mb-4" size="lg">
                Proceed to Checkout
              </Button>

              <Link to="/shop">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
