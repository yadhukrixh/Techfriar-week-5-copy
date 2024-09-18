"use client"
import styles from "./page.module.css";
import LandingPage from "./LandingPage/LandingPage";
import { handleGoogleCallback } from "@/utils/userUtils";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    handleGoogleCallback();
  },[])
  return (
    <main className={styles.main}>
      <LandingPage />
    </main>
  );
}
