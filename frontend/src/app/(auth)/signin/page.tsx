"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PulseLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

type FormFields = {
  email: string;
  password: string;
};

function SignInPage() {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast.error(error);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { email, password } = data;
    const toastId = toast.loading(
      "Connecting to the server... Render server might be spinning up from inactivity, which could take up to 50 seconds, only for the initial request. Thank you for your patience.",
      {
        duration: 80000,
        style: {
          background: "rgba(255, 255, 255, 0.6)",
          backdropFilter: "blur(15px)",
          color: "#000000",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
          borderLeft: "4px solid #FFD700",
          padding: "12px 16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          fontSize: "16px",
          fontWeight: "600",
          width: "400px",
          maxWidth: "90vw",
        },
        className: "hover:pause",
      }
    );

    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      toast.dismiss(toastId);

      if (response?.error) {
        setError(true);
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Signed in successfully!");
        router.push(response?.url || "/dashboard");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-6xl shadow-2xl">
        {/* Left Panel: Form */}
        <div className="w-full lg:w-1/2 bg-white p-8 sm:p-12">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 font-jost">
              Sign In
            </h1>
            <p className="text-gray-500 mt-2">
              Welcome back! Please sign in to your account.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-customeRed focus:ring-0"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:outline-none focus:border-customeRed focus:ring-0 pr-12"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 mt-1">{errors.password.message}</p>
            )}

            {error && (
              <p className="text-red-500 text-center">
                Invalid credentials. Please try again.
              </p>
            )}
            <div>
              <button
                disabled={isSubmitting}
                className="w-full bg-customeRed text-white font-bold py-4 px-6 hover:bg-red-700 transition-all duration-300"
                type="submit"
              >
                {isSubmitting ? (
                  <PulseLoader size={10} color="#fff" />
                ) : (
                  "SIGN IN"
                )}
              </button>
            </div>
            <div className="text-center text-sm text-gray-500">
              <p>
                For demo purposes, use{" "}
                <span className="font-semibold text-gray-600">
                  admin@gmail.com
                </span>{" "}
                and password{" "}
                <span className="font-semibold text-gray-600">password123</span>{" "}
                to view the admin pages .
              </p>
            </div>
            <div className="text-center">
              <Link
                href="/contact"
                className="text-sm text-gray-500 hover:text-customeRed hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        {/* Right Panel: Image */}
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/banner1.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Abe Garage Logo"
              className="w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
