function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Steps({ step }) {
  return (
    <div>
      <div aria-hidden="true">
        <div className="bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
          <div
            className="h-2 bg-indigo-600 rounded-full"
            style={{
              width:
                step === 1
                  ? "0%"
                  : step === 2
                  ? "50.5%"
                  : step === 3
                  ? "100%"
                  : "0%",
            }}
          />
        </div>
        <span className="xs:block md:hidden xl:hidden sm:hidden dark:text-white">
          {step === 1 ? "0%" : step === 2 ? "50%" : "100%"}
        </span>
        <div className="hidden sm:grid grid-cols-3 text-sm font-medium text-gray-500 mt-2">
          <div
            className={classNames(
              step === 1 ? "text-indigo-600" : "",
              "text-left"
            )}
          >
            Contact Info
          </div>
          <div
            className={classNames(
              step === 2 ? "text-indigo-600" : "",
              "text-center"
            )}
          >
            Resume
          </div>
          <div className={classNames(
              step === 3 ? "text-indigo-600" : "",
              "text-right"
            )}>Preview</div>
        </div>
      </div>
    </div>
  );
}
