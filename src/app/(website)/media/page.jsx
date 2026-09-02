import React from "react";
import MediaGallery from "@/components/media/MediaGallery";
import PartnerBrands from '@/components/layout/PartnerBrands';

export const metadata = {
  title: "Media Gallery | Looks Salon",
  description: "Awards, press coverage and collaborations featuring Looks Salon.",
};

const Page = () => {
  return (
  <> 
  <MediaGallery />;
  <PartnerBrands/>
  </>
  )
};

export default Page;
