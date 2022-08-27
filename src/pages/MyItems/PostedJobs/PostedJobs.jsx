import React, { useEffect, useState } from "react";
import RightbarMobile from "../../../components/MyItems/Mobile/RightbarMobile";
import SidebarMobile from "../../../components/MyItems/Mobile/SidebarMobile";
import PostedJob from "../../../components/MyItems/PostedJobs/PostedJob";
import Rightbar from "../../../components/MyItems/Rightbar/Rightbar";
import Sidebar from "../../../components/MyItems/Sidebar/Sidebar";
import { axiosGet } from "../../../helper/axiosHelper";
import useAuth from "../../../hooks/useAuth";
import useHeader from "../../../hooks/useHeader";

const PostedJobs = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [myCompany, setMyCompany] = useState([]);
  const { token } = useAuth();
  const headers = useHeader(token);
  const [companyId, setCompanyId] = useState([]);

  useEffect(() => {
    const getMyCompany = async () => {
      const companies = [];
      const res = await axiosGet("/company/check/my-company", headers);
      setMyCompany(res.data);
      res.data.map((company) => {
        companies.push(company._id);
      });
      setCompanyId(companies);
    };
    getMyCompany();
  }, []);

  useEffect(() => {
    const getPostedJobs = async () => {
      companyId.map(async (id) => {
        await axiosGet("/jobs/checkMyJob/" + id).then((res) => {
          setPostedJobs((prevState) => [
            ...prevState.filter((company) => company._id !== res.data._id),
            res.data,
          ]);
        });
      });
    };
    getPostedJobs();
  }, [companyId]);
  console.log(postedJobs)
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-4xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-6">
            <Sidebar postedJobs={postedJobs} />
            <main className="lg:col-span-6 xl:col-span-6">
              {/* Is Mobile */}
              <RightbarMobile />
              <SidebarMobile postedJobs={postedJobs} />
              {/* End Is Mobile */}
              <PostedJob postedJobs={postedJobs} />
            </main>
            <aside className="hidden xl:block xl:col-span-4 lg:block lg:col-span-3">
              <div className="top-4 space-y-4">
                <Rightbar />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostedJobs;
