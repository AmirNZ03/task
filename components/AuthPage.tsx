"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../src/app/auth/auth.module.scss";
import Button from "@/app/Button";
import Input from "@/app/Input";
import { z } from "zod";

const schema = z.object({
  phone: z.string().regex(/^09\d{9}$/, "phone number is not valid"),
});

const AuthPage: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (): Promise<void> => {
    setError("");
    const result = schema.safeParse({ phone });

    if (!result.success) {
      setError("phone number is not valid");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data.results[0]));
      router.push("/dashboard");
    } catch (err) {
      setError("مشکلی پیش آمده.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.form}>
        <p className={styles["login-title"]}>login form</p>
        <Input
          type="tel"
          placeholder="phone number"
          value={phone}
          id="inputlogin"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          className={`${styles.inputlogin} ${error ? styles.error : ""}`}
        />
        {error && <p className={styles.errorText}>{error}</p>}
        <Button
          onClick={handleLogin}
          disabled={loading}
          className={styles["btn-login"]}
        >
          {loading ? "logging..." : "login"}
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
