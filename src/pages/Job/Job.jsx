import React, { useEffect, useState, lazy, Suspense } from "react";
// import ListJob from "../../components/Job/ListJob";
import NewJob from "../../components/Job/shared/NewJob";
import useAuth from "../../hooks/useAuth";
import useHeader from "../../hooks/useHeader";
import { axiosGet } from "../../helper/axiosHelper";
import { LinearProgress } from "@mui/material";
import PublishJob from "../../components/Job/shared/PublishJob";
const JobDetail = lazy(() => import("./detail/JobDetail"));
const ListJob = lazy(() => import("../../components/Job/ListJob"));

const Job = () => {
  const [open, setOpen] = useState(false);
  const [isNewJob, setIsNewJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const { token } = useAuth();
  const headers = useHeader(token);
  const [openPublish, setOpenPublish] = useState(false);
  const [jobPublish, setJobPublish] = useState({});

  /* Pages Job Detail  */
  const [redirectJobDetail, setRedirectJobDetail] = useState(false);
  const [jobDetail, setJobDetail] = useState({});
  /* End Pages */

  useEffect(() => {
    const getListJobs = async () => {
      try {
        const res = await axiosGet("/jobs", headers);
        setJobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getListJobs();
    setIsNewJob(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewJob]);

  if (redirectJobDetail) {
    return (
      <Suspense fallback={<LinearProgress />}>
        <JobDetail
          jobDetail={jobDetail}
          setJobDetail={setJobDetail}
          setRedirectJobDetail={setRedirectJobDetail}
          setIsNewJob={setIsNewJob}
        />
      </Suspense>
    );
  } else {
    return (
      <div className="min-h-full">
        {/* Sidebar */}
        {/* Main column */}
        <div className="lg:pl-64 flex flex-col">
          <main className="flex-1 z-0">
            {/* Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  Job Posting
                </h1>
              </div>
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create new job
              </button>
            </div>
            <Suspense fallback={<LinearProgress />}>
              <ListJob
                jobs={jobs}
                setIsNewJob={setIsNewJob}
                setOpenPublishJob={setOpenPublish}
                setJobPublish={setJobPublish}
                setRedirectJobDetail={setRedirectJobDetail}
                setJobDetail={setJobDetail}
              />
            </Suspense>
            <NewJob open={open} setOpen={setOpen} setIsNewJob={setIsNewJob} />
            <PublishJob
              open={openPublish}
              setOpen={setOpenPublish}
              setIsNewJob={setIsNewJob}
              jobPublish={jobPublish}
              setJobPublish={setJobPublish}
            />
          </main>
        </div>
      </div>
    );
  }
};

export default Job;
