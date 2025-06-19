"use client";
import { useState, useEffect } from "react";
import Logo from "@/Components/Logo/Logo";
import ParticlesBackground from "@/Components/ParticlesBackground/ParticlesBackground";
import CustomButton from "@/ui-components/CustomButton/CustomButton";
import CustomInput from "@/ui-components/CustomInput/CustomInput";
import PasswordInput from "@/ui-components/PasswordInput/PasswordInput";
import axiosInstance from "@/utils/axiosInstance";
import { showToast } from "@/ui-components/Toast/Toast";
import redirectIfLoggedIn from "@/utils/redirectIfLogin";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("api/user/login", {
        email,
        password,
      });

      // Handle success
      const { access_token, user } = response.data;
      // Store token
      localStorage.setItem("token", access_token);
      showToast("Login Successfull.", "success");
      // Redirect user
      // window.location.href = "/admin/dashboard";
      router.push("/admin/dashboard");
    } catch (err) {
      // Handle error
      showToast(err?.response?.data?.msg || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 z-[1]">
        <ParticlesBackground />
      </div>
      <div className="grid grid-cols-12 z-[2] relative">
        <div className="col-span-12 md:col-span-12 flex justify-center items-center smd:px-6 px-0 h-dvh overflow-y-auto">
          <div className="md:w-[600px] w-full bg-black shadow-md p-6 rounded-3xl">
            <div className="flex justify-center">
              <Link href="/">
                <Logo />
              </Link>
            </div>

            <div className="md:pt-[50px] pt-5 text-white font-gilmer">
              <div className="text-center">
                <div className="leading-tight text-xl smd:text-3xl font-semibold">
                  Welcome
                </div>
              </div>
              <div className="text-center">
                <div className="text-darkGray leading-tight text-sm font-normal">
                  Please enter your details to access your account
                </div>
              </div>

              <div className="md:pt-[60px] pt-5 font-gilmer">
                <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
                  <div>
                    <div className="text-base font-medium leading-tight pb-1">
                      Email Address
                    </div>
                    <CustomInput
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="border-none"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <div className="text-base font-medium leading-tight pb-1">
                      Password
                    </div>
                    <PasswordInput
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="!border-none"
                      inputClassName="!border-none"
                    />
                  </div>

                  <CustomButton
                    type="submit"
                    onLoading={loading}
                    disabled={loading}
                  >
                    Login
                  </CustomButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default redirectIfLoggedIn(Login);
