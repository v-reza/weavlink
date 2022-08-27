import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import HiringMain from "../../components/Hiring/Detail/HiringMain";
import DetailNavJob from "../../components/Hiring/Navbar/DetailNavJob";
import NavDetailJob from "../../components/Hiring/Navbar/NavDetailJob";
import { axiosGet } from "../../helper/axiosHelper";
import Notfound from "../Notfound/404";
import useGlobal from "../../hooks/useGlobal";
import LoadingComponents from "../../components/custom/LoadingComponents/LoadingComponents";
const HiringJobDetail = () => {
  const { id } = useParams();
  const [jobs, setJobs] = useState(null);
  const { selector, dispatch } = useGlobal();

  useEffect(() => {
    const getDetailJobs = async () => {
      try {
        dispatch({
          type: "GLOBAL_STATE",
          payload: {
            loadingComponents: true,
          },
        });
        const res = await axiosGet("/jobs/detailjob/" + id);
        dispatch({
          type: "GLOBAL_STATE",
          payload: {
            loadingComponents: false,
          },
        });
        setJobs(res.data);
      } catch (error) {
        dispatch({
          type: "GLOBAL_STATE",
          payload: {
            isError: true,
          },
        });
      }
    };
    getDetailJobs();
  }, [id]);

  const ExistJob = () => {
    return (
      <>
        <NavDetailJob />
        <DetailNavJob />
        <div className="min-h-full">
          <div className="py-10">
            <div className="max-w-4xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-6">
              {/* <Sidebar postedJobs={postedJobs} /> */}
              <main className="lg:col-span-8 xl:col-span-8">
                <HiringMain job={jobs} />
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
  return !selector?.isError ? (
    selector.loadingComponents ? (
      <LoadingComponents />
    ) : (
      <ExistJob />
    )
  ) : (
    <Notfound />
  );
};

export default HiringJobDetail;
