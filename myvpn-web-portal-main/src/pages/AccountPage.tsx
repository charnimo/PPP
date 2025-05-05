
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Calendar, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {  Navigate } from "react-router-dom";

const AccountPage = () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Helmet>
        <title>My Account | MY_VPN</title>
      </Helmet>
      <div className="container mx-auto py-6 px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Account Information</CardTitle>
              </div>
              <CardDescription>Manage your personal details and subscription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Email</h3>
                  <p className="text-base">user@example.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Username</h3>
                  <p className="text-base">securevpnuser</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Subscription Plan</h3>
                <div className="flex items-center">
                  <p className="text-base font-medium mr-2">Premium Plan</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Your plan renews on October 15, 2023</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Device Limit</h3>
                  <p className="text-base">5 devices allowed (3 currently in use)</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Last Login</h3>
                  <p className="text-base">September 28, 2023 at 14:32</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">Edit Profile</Button>
              <Button variant="default">Change Password</Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Billing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Payment Method</h3>
                  <div className="flex items-center">
                    <div className="h-8 w-12 bg-muted rounded mr-2"></div>
                    <p className="text-sm">•••• 4582</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Expires 05/25</p>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  Manage Payment Methods
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle>Subscription</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Premium Plan</h3>
                  <p className="text-sm">$9.99 / month</p>
                  <p className="text-xs text-muted-foreground mt-1">Next billing: October 15, 2023</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Upgrade
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <CardTitle>Connected Devices</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="text-sm">MacBook Pro - Last used today</li>
                  <li className="text-sm">iPhone 13 - Last used yesterday</li>
                  <li className="text-sm">Windows PC - Last used 5 days ago</li>
                </ul>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Manage Devices
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
