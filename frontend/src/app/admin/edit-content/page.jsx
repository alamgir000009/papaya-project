"use client";
import AdminLayout from "../AdminLayout";
import EditBannerContent from "@/Components/EditPageContent/EditBannerContent";
import EditAboutContent from "@/Components/EditPageContent/EditAboutContent";
import EditCoreCapabilities from "@/Components/EditPageContent/EditCoreCapabilities";
import EditServicesContent from "@/Components/EditPageContent/EditServicesContent";
import EditImpactLogos from "@/Components/EditPageContent/EditImpactLogos";
import withAuth from "@/utils/withAuth";

const page = () => {
  return (
    <AdminLayout>
      <div className="container">
        <div className="flex flex-col gap-4">
          {/* ----------- Banner Content ---------- */}
          <EditBannerContent />
          {/* -----------About Section --------- */}
          <EditAboutContent />
          {/* -----------About Section --------- */}
          <EditCoreCapabilities />
          {/* -----------About Section --------- */}
          <EditServicesContent />
          {/* ----------------- */}
          <EditImpactLogos />
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(page);
