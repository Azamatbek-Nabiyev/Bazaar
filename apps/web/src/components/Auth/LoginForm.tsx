import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthLayout from './AuthLayout';
import AuthField from './AuthField';

import {
  useLoginRequestMutation,
  useLoginConfirmMutation,
} from '../../store/api';

import { setCredentials } from '../../store/authSlice';
import type { AppDispatch } from '../../store/index';

const BOT_USERNAME = 'ecommerce_verifybot';

export default function LoginForm() {
  const [form, setForm] = useState({
    phone: '',
  });

  const [code, setCode] = useState('');
  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [loginRequest, { isLoading: isSending }] =
    useLoginRequestMutation();

  const [loginConfirm, { isLoading: isConfirming }] =
    useLoginConfirmMutation();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCodeChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
    setCode(digitsOnly);
  };

  const handleSendCode = async () => {
    setError('');

    if (!form.phone.trim()) {
      setError('Telefon raqamingizni kiriting');
      return;
    }

    try {
      const result = await loginRequest({
        phone: form.phone,
      }).unwrap();

      setPendingToken(result.status);
      setCode('');
    } catch (err: any) {
      console.error('LOGIN REQUEST ERROR:', err);

      setError(
        err?.data?.message ||
          "Server bilan bog'lanishda xatolik yuz berdi"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!pendingToken || code.length !== 4) {
      return;
    }

    try {
      const result = await loginConfirm({
        phone: form.phone,
        code,
      }).unwrap();

      console.log('LOGIN CONFIRM RESULT:', result);

      dispatch(
        setCredentials({
          token: result.token,
          user: result.user,
        })
      );

      navigate('/');
    } catch (err: any) {
      console.error('LOGIN CONFIRM ERROR:', err);

      setError(
        err?.data?.message ||
          "Kod noto'g'ri yoki muddati o'tgan"
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your account"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="Phone"
          type="text"
          value={form.phone}
          onChange={(v) => handleChange('phone', v)}
          disabled={!!pendingToken}
        />

        {error && (
          <p className="text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {!pendingToken ? (
          <button
            type="button"
            onClick={handleSendCode}
            disabled={isSending}
            className="bg-neutral-900 text-white text-sm font-semibold py-3 hover:bg-neutral-800 transition-colors mt-2 disabled:opacity-50"
          >
            {isSending ? 'YUBORILMOQDA...' : 'SEND CODE'}
          </button>
        ) : (
          <>
            <p className="text-center text-sm">
              Telegram botdan tasdiqlash kodingizni oling:{' '}
              <a
                href={`https://t.me/${BOT_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-medium"
              >
                @{BOT_USERNAME}
              </a>
            </p>

            <AuthField
              label="Verification code"
              value={code}
              onChange={handleCodeChange}
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
            </div>

            <button
              type="submit"
              disabled={isConfirming || code.length !== 4}
              className="bg-neutral-900 text-white text-sm font-semibold py-3 hover:bg-neutral-800 transition-colors mt-2 disabled:opacity-50"
            >
              {isConfirming ? 'TEKSHIRILMOQDA...' : 'SIGN IN'}
            </button>

            <button
              type="button"
              onClick={handleSendCode}
              disabled={isSending}
              className="text-sm text-neutral-500 underline text-center disabled:opacity-50"
            >
              {isSending
                ? 'Yuborilmoqda...'
                : 'Kodni qayta yuborish'}
            </button>
          </>
        )}
      </form>

      <p className="text-sm text-center text-neutral-500 mt-6">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-neutral-900 font-semibold"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}