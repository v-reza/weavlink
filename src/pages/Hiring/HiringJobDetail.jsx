import React from "react";
import HiringMain from "../../components/Hiring/Detail/HiringMain";
import DetailNavJob from "../../components/Hiring/Navbar/DetailNavJob";
import NavDetailJob from "../../components/Hiring/Navbar/NavDetailJob";

const HiringJobDetail = () => {
  return (
    <>
      <NavDetailJob />
      <DetailNavJob />
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-4xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-6">
            {/* <Sidebar postedJobs={postedJobs} /> */}
            <main className="lg:col-span-8 xl:col-span-8">
              <HiringMain />
            </main>
            <aside className="hidden xl:block xl:col-span-4 lg:block lg:col-span-3">
              <div className="top-4 space-y-4">{/* <Rightbar /> */}</div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default HiringJobDetail;
