import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthLayout from './AuthLayout';
import AuthField from './AuthField';
import { useSignupRequestMutation, useSignupConfirmMutation } from '../../store/api';
import { setCredentials } from '../../store/authSlice';
import type { AppDispatch } from '../../store/index';

const BOT_USERNAME = 'ecommerce_verifybot'; 

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
  });
  const [code, setCode] = useState('');
  const [botLink, setBotLink] = useState<string | null>(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [signupRequest, { isLoading: isSending }] = useSignupRequestMutation();
  const [signupConfirm, { isLoading: isConfirming }] = useSignupConfirmMutation();

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleCodeChange = (value: string) => {
    // faqat raqam va aynan 4 ta belgi (backend 4 xonali kod generatsiya qiladi)
    const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
    setCode(digitsOnly);
  };

  const handleSendCode = async () => {
    setError('');

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Ismingiz va telefon raqamingizni kiriting');
      return;
    }

    try {
      const result = await signupRequest({
        phone: form.phone,
        fullname: form.name,
      }).unwrap();

      setBotLink(result.botLink);
      setCode('');
    } catch (err: any) {
      setError(err?.data?.message || "Server bilan bog'lanishda xatolik yuz berdi");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!botLink || code.length !== 4) return;

    try {
      const result = await signupConfirm({
        token: botLink.slice(-32),
        code,
      }).unwrap();
      

      dispatch(setCredentials({ token: result.token, user: result.user }));
      navigate('/');
    } catch (err: any) {
      setError(err?.data?.message || "Kod noto'g'ri yoki muddati o'tgan");
    }
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
          disabled={!!botLink}
        />
        <AuthField
          label="Phone number"
          value={form.phone}
          onChange={(v) => handleChange('phone', v)}
          disabled={!!botLink}
        />

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        {!botLink ? (
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
                href={botLink}
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

            <button
              type="submit"
              disabled={isConfirming || code.length !== 4}
              className="bg-neutral-900 text-white text-sm font-semibold py-3 hover:bg-neutral-800 transition-colors mt-2 disabled:opacity-50"
            >
              {isConfirming ? 'TEKSHIRILMOQDA...' : 'CONFIRM'}
            </button>

            <button
              type="button"
              onClick={handleSendCode}
              disabled={isSending}
              className="text-sm text-neutral-500 underline text-center disabled:opacity-50"
            >
              {isSending ? 'Yuborilmoqda...' : "Kodni qayta yuborish"}
            </button>
          </>
        )}
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