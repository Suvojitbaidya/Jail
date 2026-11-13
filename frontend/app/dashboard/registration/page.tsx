// app/auth/register/page.tsx
"use client"
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import './Registration.css';
import Image from 'next/image';
import mainLogo from '../../../public/images/main-logo.png'; 
export default function RegistrationPage() {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const searchParams = useSearchParams();

    // useEffect(() => {
    //     // Get token from URL query parameters
    //     const tokenParam = searchParams.get('token');
    //     if (tokenParam) {
    //         setToken(tokenParam);
    //         // In a real app, you would verify the token with your backend
    //         // and get the associated email
    //     }
    // }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            // In a real app, you would call your API to complete registration
            // const response = await fetch('/api/complete-registration', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({ token, email, password }),
            // });

            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess(true);
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="registration-container">
                <h2>Registration Complete!</h2>
                <p>Your account has been successfully activated. You can now log in.</p>
                <a href="/auth/login" className="login-link">
                    Go to Login Page
                </a>
            </div>
        );
    }

    return (
        <div className="registration-container">
            <span className='text-center w-100 d-block mb-3'><Image src={mainLogo} alt="Main Logo" width={100} height={100} /></span>
            <h2>Complete Your Registration</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                        minLength={8}
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Processing...' : 'Complete Registration'}
                </button>
            </form>
        </div>
    );
}