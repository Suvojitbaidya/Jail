'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { z } from 'zod';
import './Register.css';

const RegistrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Must include a lowercase letter')
    .regex(/[A-Z]/, 'Must include an uppercase letter')
    .regex(/[0-9]/, 'Must include a number')
    .regex(/[^a-zA-Z0-9]/, 'Must include a special character')
});

export default function RegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') ?? '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    try {
      RegistrationSchema.parse(formData);

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, ...formData }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Registration failed');

      router.push('/login');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrs: { [key: string]: string } = {};
        err.errors.forEach((e) => {
          if (e.path[0]) fieldErrs[e.path[0] as string] = e.message;
        });
        setFieldErrors(fieldErrs);
      } else {
        setError(err instanceof Error ? err.message : 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Complete Your Registration</h1>
        <p>Please fill in your details to activate your account</p>

        {error && <div className="alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FiUser />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            {fieldErrors.name && <small className="text-red-500">{fieldErrors.name}</small>}
          </div>

          <div className="form-group">
            <FiMail />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            {fieldErrors.email && <small className="text-red-500">{fieldErrors.email}</small>}
          </div>

          <div className="form-group position-relative">
            <FiLock />
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setPasswordStrength(checkPasswordStrength(e.target.value));
              }}
              required
              minLength={8}
            />
            <span
              className="password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <AiOutlineEyeInvisible className='pass-eye' /> : <AiOutlineEye className='pass-eye'/>}
            </span>
            <div
              className="password-strength"
              style={{
                background: `linear-gradient(to right, ${passwordStrength > 0 ? '#68d391' : '#e53e3e'} ${passwordStrength * 25}%, #e2e8f0 ${passwordStrength * 25}%)`
              }}
            />
            {fieldErrors.password && <small className="text-red-500">{fieldErrors.password}</small>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
}
