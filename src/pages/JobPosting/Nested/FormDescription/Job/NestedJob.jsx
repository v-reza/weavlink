import { useSearchParams } from "react-router-dom";
import NestedJobDescription from "../../../../../components/JobPosting/Nested/FormDescription/Job/NestedJobDescription";
import DetailCompanyRightbar from "../../../../../components/JobPosting/Nested/FormDescription/Righbar/DetailCompanyRightbar";
import NestedInformationCompany from "../../../../../components/JobPosting/Nested/FormDescription/Righbar/NestedInformationCompany";

export default function NestedJob() {
  const [jobId, setJobId] = useSearchParams();
  const paramsJobId = jobId.get("jobId");

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
}
