import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthLayout from './AuthLayout';
import AuthField from './AuthField';

export default function ForgotPasswordForm() {
  const { t } = useTranslation('auth');

  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthLayout title={t('forgotPassword.checkPhoneTitle')}>
        <p className="text-sm text-neutral-500 text-center leading-relaxed">
          {t('forgotPassword.resetLinkSentTo')}{' '}
          <span className="font-medium text-neutral-900">{phone}</span>.
          {' '}{t('forgotPassword.checkInbox')}
        </p>
        <Link
          to="/login"
          className="block text-center text-sm text-neutral-900 font-semibold mt-6"
        >
          {t('forgotPassword.backToSignIn')}
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={t('forgotPassword.title')}
      subtitle={t('forgotPassword.subtitle')}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label={t('forgotPassword.phoneLabel')}
          type="text"
          value={phone}
          onChange={setPhone}
        />

        <button
          type="submit"
          className="bg-neutral-900 text-white text-sm font-semibold py-3 hover:bg-neutral-800 transition-colors mt-2"
        >
          {t('forgotPassword.sendResetLinkButton')}
        </button>
      </form>

      <p className="text-sm text-center text-neutral-500 mt-6">
        {t('forgotPassword.rememberedPassword')}{' '}
        <Link to="/login" className="text-neutral-900 font-semibold">
          {t('forgotPassword.signInLink')}
        </Link>
      </p>
    </AuthLayout>
  );
}