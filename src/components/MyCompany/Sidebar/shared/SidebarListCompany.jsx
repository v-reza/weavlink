import useFolder from "../../../../hooks/useFolder";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarListCompany({ setDetailCompany, company }) {
  const folder = useFolder();
  return (
    <div
      onClick={() => setDetailCompany(company)}
      className="cursor-pointer bg-transparent border border-1 shadow-md dark:shadow-slate-700/75 dark:border-slate-600 px-4 py-5 sm:px-6 rounded-md "
    >
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={
              company?.companyLogo
                ? company?.companyLogo
                : folder + "/noCompany.png"
            }
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-gray-900">
            <p className="cursor-pointer hover:underline dark:text-slate-300 ">
              {company?.companyName}
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <div className="dark:text-slate-400 truncate">{company?.companyAddress}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
