import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AuthField from './AuthField';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Login (test rejim)');
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-neutral-600 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-neutral-900"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-neutral-900 font-medium">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="bg-neutral-900 text-white text-sm font-semibold py-3 hover:bg-neutral-800 transition-colors mt-2"
        >
          Sign In
        </button>
      </form>

      <p className="text-sm text-center text-neutral-500 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-neutral-900 font-semibold">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}