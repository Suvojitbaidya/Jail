// Login Page - app/login/page.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/services/auth.service";
import { toast } from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});
type LoginSchema = z.infer<typeof loginSchema>;
export default function LoginPage() {
  const { setUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data.email, data.password);
      console.log(res);
      document.cookie = `token=${res.token}; path=/`;
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user); // update auth context
      router.push("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Login failed.";
      toast.error(message);
    }
  };

  return (
    <section className="register_login_main">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{ width: 350 }}>
          <span className="login_screen_logo mb-1">
            <img src="images/main-logo.png" alt="" />
          </span>
          <h3 className="text-center">Welcome back!</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""
                  }`}
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          </form>
          {/* <div className="text-center mt-3">
            Don't have an account? <a href="register.html">Register here</a>
          </div> */}
        </div>
      </div>
    </section>
  );
}
