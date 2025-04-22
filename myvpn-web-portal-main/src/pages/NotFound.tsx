
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <Shield className="h-16 w-16 text-primary/80" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! We couldn't find the page you're looking for.
        </p>
        <p className="text-gray-600 mb-8">
          The page might have been moved, deleted, or it might never have existed. 
          Let's get you back to safety.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
