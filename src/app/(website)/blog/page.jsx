import BlogSection from "@/components/blog/BlogSection";
import React from "react";
import BookAppointment from "@/components/layout/BookAppointment";
import PartnerBrands from "@/components/layout/PartnerBrands";

const page = () => {
  return (
    <>
      <BlogSection />
      <BookAppointment/>
        <PartnerBrands/>
    </>
  );
};

export default page;
