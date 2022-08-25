import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NestedJobDescription from "../../../../../components/JobPosting/Nested/FormDescription/Job/NestedJobDescription";
import DetailCompanyRightbar from "../../../../../components/JobPosting/Nested/FormDescription/Righbar/DetailCompanyRightbar";
import NestedInformationCompany from "../../../../../components/JobPosting/Nested/FormDescription/Righbar/NestedInformationCompany";
import { axiosGet } from "../../../../../helper/axiosHelper";
import Notfound from "./../../../../../pages/Notfound/404";

export default function NestedJob() {
  const [jobId, setJobId] = useSearchParams();
  const paramsJobId = jobId.get("jobId");
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    const getJobsById = async () => {
      await axiosGet("/jobs/detailjob/" + paramsJobId).then((res) => {
        setJobs(res.data);
      });
    };
    getJobsById();
  }, [paramsJobId]);

  const ExistJobId = () => {
    return (
      <>
        <div className="min-h-full">
          <div className="py-10">
            <div className="max-w-4xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-6 ">
              <main className="lg:col-span-8 xl:col-span-8">
                <NestedJobDescription />
              </main>
              <aside className="xl:block col-span-4 xl:mt-0 lg:mt-0 mt-8">
                <div className="top-4 space-y-4">
                  <DetailCompanyRightbar />
                  <NestedInformationCompany />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </>
    );
  };
  return jobs ? <ExistJobId /> : <Notfound />;
}
