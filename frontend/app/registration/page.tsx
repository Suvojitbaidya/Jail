// Login Page - app/login/page.tsx
"use client"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
    const { setUser } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        // Dummy login
        localStorage.setItem("token", "dummy-token")
        document.cookie = `token=dummy-token; path=/` // <-- Set cookie
        setUser({ name: "John Doe", role: 'admin' })
        console.log(
            "login"
        )
        router.push("/dashboard")
    }

    return (
        <></>   
    )
}