import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import AuthField from './AuthField';

export default function ForgotPasswordForm() {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthLayout title="Check Your Phone number">
        <p className="text-sm text-neutral-500 text-center leading-relaxed">
          We've sent a password reset link to{' '}
          <span className="font-medium text-neutral-900">{phone}</span>.
          Please check your inbox.
        </p>
        <Link
          to="/login"
          className="block text-center text-sm text-neutral-900 font-semibold mt-6"
        >
          Back to Sign In
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="Phone"
          type="text"
          value={phone}
          onChange={setPhone}
        />

        <button
          type="submit"
          className="bg-neutral-900 text-white text-sm font-semibold py-3 hover:bg-neutral-800 transition-colors mt-2"
        >
          Send Reset Link
        </button>
      </form>

      <p className="text-sm text-center text-neutral-500 mt-6">
        Remembered your password?{' '}
        <Link to="/login" className="text-neutral-900 font-semibold">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}