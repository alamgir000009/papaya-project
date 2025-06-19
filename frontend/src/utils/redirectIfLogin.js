"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/ui-components/Spinner/Spinner";

const redirectIfLoggedIn = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true); // State to handle loading

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        // Redirect to dashboard if the user is already logged in
        router.replace("/admin/dashboard");
      } else {
        // If no token, stop loading
        setIsChecking(false);
      }
    }, [router]);

    // Show loading indicator while checking authentication
    if (isChecking) {
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

    // Render the wrapped component if the user is not logged in
    return <WrappedComponent {...props} />;
  };
};

export default redirectIfLoggedIn;
