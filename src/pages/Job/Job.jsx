import Sidebar from "../../components/Job/Sidebar/Sidebar";
import Post from "../../components/Job/Post/Post";
import Follow from "../../components/Home/Rightbar/Follow";
import Trending from "../../components/Home/Rightbar/Trending";
import { useEffect, useState } from "react";
import Filter from "../../components/Job/Filter/Filter";
import MobileSidebar from "../../components/Job/Sidebar/MobileSidebar";
import { axiosGet } from "../../helper/axiosHelper";

export default function Job() {
  /* Set Title */
  useEffect(() => {
    document.title = "Jobs | Velkey";
  }, []);
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    const getListJobs = async () => {
      try {
        const res = await axiosGet("/jobs/listjobs")
        setJobs(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getListJobs()
  }, [])

  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-4xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Sidebar */}
            <Sidebar />
            <main className="lg:col-span-9 xl:col-span-6">
              <Filter />
              {/* Mobile Sidebar */}
              <MobileSidebar />
              <Post jobs={jobs}/>
            </main>
            <aside className="hidden xl:block xl:col-span-4">
              <div className="top-4 space-y-4">
                <Follow />
                <Trending />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}