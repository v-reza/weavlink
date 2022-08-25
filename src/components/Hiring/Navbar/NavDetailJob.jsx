import useFolder from "../../../hooks/useFolder";

export default function NavDetailJob() {
  const folder = useFolder();
  return (
    <div className="w-full mx-auto max-w-7xl px-8">
      <div className="px-6 py-8 dark:bg-slate-800">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex-shrink-0">
            <img className="h-14 w-14" src={folder + "/noCompany.png"} alt="" />
          </div>
          <div className="flex-1 min-w-0 px-0 lg:px-4 xl:px-4">
            <h2 className="text-lg font-bold leading-7 text-white sm:text-lg sm:truncate">
              Meta
            </h2>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="flex items-center text-sm text-gray-300">
                Testing IT • Kota Malang, East Java, Indonesia
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="flex items-center text-sm text-gray-300">
                Draft • Created 5 days ago
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              >
                Complete Draft
              </button>
            </span>
            <span className="xs:ml-3 sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              >
                Delete Draft
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
