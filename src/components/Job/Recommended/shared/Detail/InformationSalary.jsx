export default function InformationSalary() {
  return (
    <div className="bg-white mt-2 px-4 py-5 sm:px-6 dark:bg-transparent rounded-md border dark:border-slate-600">
      <div className="flex space-x-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            <span className="dark:text-white">Pay range unavailable</span>
          </p>
          <p className="text-sm text-gray-500">
            <span>Salary information is not available at the moment.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
