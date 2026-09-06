import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthLayout from "./AuthLayout";
import AuthField from "./AuthField";

import { useLoginMutation } from "../../store/api";
import { setCredentials } from "../../store/authSlice";
import type { AppDispatch } from "../../store/index";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone.trim() || !password.trim()) {
      setError("Telefon raqam va parolni kiriting");
      return;
    }

    try {
      const result = await login({ phone, password }).unwrap();

      dispatch(
        setCredentials({
          token: result.token,
          user: result.user,
        })
      );

      navigate("/");
    } catch (err: any) {
      setError(
        err?.data?.message || "Server bilan bog'lanishda xatolik yuz berdi"
      );
    }
  };

  return (
    <AuthLayout
      title="Admin panelga kirish"
      subtitle="Davom etish uchun hisobingizga kiring"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          label="Phone"
          type="text"
          value={phone}
          onChange={setPhone}
          placeholder="+998901234567"
        />

        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />

        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-neutral-900 text-white text-sm font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors mt-2 disabled:opacity-50"
        >
          {isLoading ? "KIRILMOQDA..." : "SIGN IN"}
        </button>
      </form>
    </AuthLayout>
  );
}
