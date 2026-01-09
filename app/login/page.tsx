import { login, signup } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-black">
            <Dumbbell className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold uppercase font-heading tracking-tighter">New Bodies Member</h1>
          <p className="text-muted-foreground">Enter your details to access your account</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form className="space-y-4 border p-6 rounded-lg bg-card">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="m.yates@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button formAction={login} className="w-full font-bold uppercase">Sign In</Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form className="space-y-4 border p-6 rounded-lg bg-card">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" required placeholder="Mike Yates" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button formAction={signup} className="w-full font-bold uppercase">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-sm">
          <Link href="/" className="underline hover:text-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}