import { LinearProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDetail from "../../components/Job/Recommended/shared/Detail/JobDetail";
import FormApply from "../../components/Job/Recommended/shared/FormApply/FormApply";
import SidebarRecommended from "../../components/Job/Recommended/shared/Sidebar/SidebarRecommended";
import { axiosGet } from "../../helper/axiosHelper";

export default function JobRecommended() {
  /* Set Title */
  useEffect(() => {
    document.title = "Jobs | Velkey";
  }, []);
  const { id } = useParams();
  const [jobs, setJobs] = useState({});
  const [listJobs, setListJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobApply, setJobApply] = useState({});

  useEffect(() => {
    const getDetailJobs = async () => {
      try {
        const res = await axiosGet("/jobs/detailjob/" + id);
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetailJobs();
  }, [id]);

  useEffect(() => {
    const getListJobs = async () => {
      try {
        const res = await axiosGet("/jobs/listjobs");
        setListJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListJobs();
  }, []);

  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-4xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 grid grid-cols-12 lg:gap-6 sm:gap-4 xs:gap-2">
            <SidebarRecommended listJobs={listJobs} />
            <main className="col-span-8">
              <Suspense fallback={<LinearProgress />}>
                <JobDetail
                  jobs={jobs}
                  setOpen={setOpen}
                  setJobApply={setJobApply}
                />
              </Suspense>
              <FormApply open={open} setOpen={setOpen} />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
