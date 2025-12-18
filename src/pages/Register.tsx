"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import Header from "../layout/Header"
import Logo from "@/components/Logo";
import { Link, useNavigate } from "react-router"
import { APIRequest } from "@/services/apiServices"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
interface RegisterResponse {
    status: boolean;
    error?: { message?: string };
    data?: {
        id: string;
        email: string;
    };
}

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);

        // Add your login logic here
        // console.log("[v0] Login attempt with:", { email, password })
        try {
            const newUser = await APIRequest.getPostService<RegisterResponse>("/auth/register", { email, password });
            if (newUser.status) {
                // console.log("User registered successfully:", newUser);
                navigate("/");
                toast.success("User registered successfully, Please login now.");

            } else {
                toast.error(newUser?.error?.message || "User registration failed. Please try again.");
            }
            setIsLoading(false);

        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 ">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center flex justify-center">
                        <Logo />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-start">Register Account Here</h3>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email - ID <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter Your Email - ID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 border-black"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    Enter Your Password <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-12 pr-10 border-black"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Already have an account?{" "}
                                    <Link to="/" className="text-primary font-medium hover:underline">
                                        Login
                                    </Link>
                                </p>
                                <Button type="submit" disabled={!email || !password || password.length < 8 || isLoading} className="w-1/2 h-12 bg-black text-white hover:bg-black/90 font-medium" >
                                    Register {isLoading && <Spinner />}
                                </Button>

                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
