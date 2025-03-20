import React, { useEffect } from "react";
import "../../../public/assets/css/home.css";
import "../../../public/assets/css/heroSection.css";
import "../../../public/assets/css/pricing.css";
import PageLayout from "../../Common/Page/PageLayout";
import Subscriptions from "./Subscriptions";
import { About } from "./About";
import Courses from "../Course/Courses";
import Survey from "./Survey";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <PageLayout>
      <main className="main">
        <Survey />
        <Courses />
        <About />
        <Subscriptions />
      </main>
    </PageLayout>
  );
}
