import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Calendar, RefreshCw, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Navigate, useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("auth_key");
    navigate("/login");
  };

  // Get current date for display purposes
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>My Account </title>
      </Helmet>
      <div className="container mx-auto py-6 px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Account</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
        
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
                  <p className="text-base">{userEmail || "No email available"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Username</h3>
                  <p className="text-base">{username || "No username available"}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Role</h3>
                <div className="flex items-center">
                  <p className="text-base font-medium mr-2 capitalize">{userRole || "User"}</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {userRole === "admin" ? "Administrator" : "Active"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Account created and verified</p>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Account Status</h3>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Account is active and verified</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Last Login</h3>
                  <p className="text-base">Today</p>
                  <p className="text-xs text-muted-foreground">Current session active</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">User ID</h3>
                <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {token ? `${token.substring(0, 20)}...` : "Not available"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Your unique identifier (token preview)</p>
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
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle>Quick Info</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Welcome</h3>
                  <p className="text-lg font-semibold">{username || "User"}!</p>
                  <p className="text-sm text-muted-foreground">{userEmail}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Role</h3>
                  <Badge variant="secondary" className="capitalize">
                    {userRole || "user"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <CardTitle>VPN Service</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Service Status</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">VPN service is available</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <CardTitle>Session Info</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Current Session</h3>
                    <p className="text-sm">Active since login</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Login Date</h3>
                    <p className="text-sm">{currentDate}</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4"
                  onClick={handleLogout}
                >
                  End Session
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
