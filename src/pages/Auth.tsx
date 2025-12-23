import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Validation
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// SCHEMAS
const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  captcha: z.string(),
});

const SignupSchema = z
  .object({
    fullName: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    captcha: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // CAPTCHA
  const randomNum = () => Math.floor(Math.random() * 10) + 1;
  const [num1, setNum1] = useState(randomNum());
  const [num2, setNum2] = useState(randomNum());

  const refreshCaptcha = () => {
    setNum1(randomNum());
    setNum2(randomNum());
  };

  const verifyCaptcha = (value) => parseInt(value) === num1 + num2;

  // React Hook Form
  const loginForm = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const signupForm = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const handleLogin = (data) => {
    if (!verifyCaptcha(data.captcha)) {
      toast({ title: "Captcha incorrect", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast({ title: "Login successful", description: "Welcome back!" });
      setIsLoading(false);
      refreshCaptcha();
      navigate("/");
    }, 1000);
  };

  const handleSignup = (data) => {
    if (!verifyCaptcha(data.captcha)) {
      toast({ title: "Captcha incorrect", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast({ title: "Account created successfully!" });
      setIsLoading(false);
      refreshCaptcha();
      signupForm.reset();
    }, 1000);
  };

  const CaptchaBox = ({ register, error }) => (
    <div className="space-y-2">
      <Label>Captcha</Label>
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-md bg-muted font-bold text-lg">
          {num1} + {num2} =
        </div>

        <Input
          type="number"
          placeholder="?"
          className="w-24"
          {...register("captcha")}
        />

        <Button type="button" variant="outline" onClick={refreshCaptcha}>
          Refresh
        </Button>
      </div>
      {error && <p className="text-red-600 text-sm">{error.message}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="font-heading text-3xl font-bold text-primary mb-2">
              Hastkala
            </h1>
          </Link>
          <p className="text-muted-foreground">
            Join our community of handloom enthusiasts
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* LOGIN */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Enter your credentials</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="email"
                        className="pl-10"
                        {...loginForm.register("email")}
                      />
                    </div>
                    {loginForm.formState.errors.email && (
                      <p className="text-red-600 text-sm">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        className="pl-10"
                        {...loginForm.register("password")}
                      />
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-red-600 text-sm">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <CaptchaBox
                    register={loginForm.register}
                    error={loginForm.formState.errors.captcha}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SIGNUP */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Start your handloom journey</CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        className="pl-10"
                        {...signupForm.register("fullName")}
                      />
                    </div>
                    {signupForm.formState.errors.fullName && (
                      <p className="text-red-600 text-sm">
                        {signupForm.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" {...signupForm.register("email")} />
                    {signupForm.formState.errors.email && (
                      <p className="text-red-600 text-sm">
                        {signupForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      {...signupForm.register("password")}
                    />
                    {signupForm.formState.errors.password && (
                      <p className="text-red-600 text-sm">
                        {signupForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm */}
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      {...signupForm.register("confirmPassword")}
                    />
                    {signupForm.formState.errors.confirmPassword && (
                      <p className="text-red-600 text-sm">
                        {signupForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <CaptchaBox
                    register={signupForm.register}
                    error={signupForm.formState.errors.captcha}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
