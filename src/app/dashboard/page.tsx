"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const DashboardPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (!user) {
        router.push("/auth");
      }
    }
  }, [router]);

  return (
    <div style={{ color: "#fff", textAlign: "center", marginTop: "5rem" }}>
      <h1>Welcome to the Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
