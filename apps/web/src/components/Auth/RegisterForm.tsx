import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AuthField from './AuthField';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Parollar mos kelmadi");
      return;
    }

    setError('');
    alert('Register (test rejim)');
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join us and start shopping today"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="Full Name"
          value={form.name}
          onChange={(v) => handleChange('name', v)}
        />
        <AuthField
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => handleChange('email', v)}
        />
        <AuthField
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => handleChange('password', v)}
        />
        <AuthField
          label="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={(v) => handleChange('confirmPassword', v)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-neutral-900 text-white text-sm font-semibold py-3 hover:bg-neutral-800 transition-colors mt-2"
        >
          Create Account
        </button>
      </form>

      <p className="text-sm text-center text-neutral-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-neutral-900 font-semibold">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}