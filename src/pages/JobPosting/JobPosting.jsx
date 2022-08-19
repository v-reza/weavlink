import FormJobPosting from "./FormJobPosting";

export default function JobPosting() {
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-1 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="dark:text-white text-3xl font-medium">
              Find a great hire, fast
            </h2>
            <span className="dark:text-slate-400 text-grey-500">
              Rated #1 in increasing quality of hire
            </span>
            {/* Form Job */}
            <FormJobPosting />
          </div>
        </div>
      </div>
    </>
  );
}
