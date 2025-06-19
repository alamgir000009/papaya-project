import Spinner from "@/ui-components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login if no token is found
        router.replace("/admin/login");
      } else {
        // Set authentication state
        setIsAuthenticated(true);
      }
    }, [router]);

    // Show a loading screen or skeleton while checking authentication
    if (!isAuthenticated) {
      return (
        <div
          className="flex justify-center items-center h-dvh w-full bg-secondary"
          style={{
            backgroundImage: "url(/images/grid.svg)",
            backgroundPosition: "right",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="bg-black rounded-3xl p-10">
            <Spinner />
          </div>
        </div>
      );
    }

    // Render the protected component once authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
