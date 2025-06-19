"use client";
import AboutMission from "@/Components/AboutMission/AboutMission";
import Banner from "@/Components/Banner/Banner";
import CoreCapabilities from "@/Components/CoreCapabilities/CoreCapabilities";
import Counter from "@/Components/Counter/Counter";
import ImpactSection from "@/Components/ImpactSection/ImpactSection";
import Services from "@/Components/Services/Services";
import UserLayout from "./UserLayout";

export default function Home() {
  // States for each counter

  return (
    <UserLayout>
      <div className="flex flex-col gap-3 smd:gap-3 py-2 smd:py-3">
        <div>
          <Banner />
        </div>
        {/* -------- counter -------- */}
        <div>
          <Counter />
        </div>
        {/* --------------- About mIssion */}
        <div id="about" className="md:py-[38px]">
          <AboutMission />
        </div>
        {/* --------------- CoreCapabilities */}
        <div id="core-capabilities">
          <CoreCapabilities />
        </div>
        {/* ------------- Services ----- */}
        <div id="services" className="md:py-[38px]">
          <Services />
        </div>
        {/* ---------- */}
        <div className="md:pb-[38px]">
          <ImpactSection />
        </div>
      </div>
    </UserLayout>
  );
}
