import React, { useEffect, useState } from "react";
import FormNewCompany from "../../components/MyCompany/FormNewCompany/FormNewCompany";
import ListMyCompany from "../../components/MyCompany/ListCompany/ListMyCompany";
import SidebarMyCompany from "../../components/MyCompany/Sidebar/SidebarMyCompany";
import { axiosGet } from "../../helper/axiosHelper";
import useAuth from "../../hooks/useAuth";
import useHeader from "../../hooks/useHeader";

const MyCompany = () => {
  const [open, setOpen] = useState(false);
  const [myCompany, setMyCompany] = useState([]);
  const [isNewCompany, setIsNewCompany] = useState(false);
  const [detailCompany, setDetailCompany] = useState(null);
  const [existsDetailCompany, setExistsDetailCompany] = useState(false);
  const { token } = useAuth();
  const headers = useHeader(token);
  useEffect(() => {
    const getMyCompany = async () => {
      try {
        const res = await axiosGet("/company/check/my-company", headers);
        setMyCompany(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyCompany();
    setIsNewCompany(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewCompany]);

  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="overflow-y-auto max-w-4xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-6">
            <SidebarMyCompany
              setOpen={setOpen}
              myCompany={myCompany}
              setDetailCompany={setDetailCompany}
            />
            <main className="lg:col-span-8 xl:col-span-8 md:col-span-6">
              <ListMyCompany detailCompany={detailCompany} />
              <FormNewCompany
                open={open}
                setOpen={setOpen}
                setIsNewCompany={setIsNewCompany}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCompany;
