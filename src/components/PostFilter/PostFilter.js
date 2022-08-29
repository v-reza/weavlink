import React from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PostFilter = ({
  setOpenNewPost,
  recent,
  setRecent,
  mostLiked,
  setMostLiked,
  mostComments,
  setMostComments,
}) => {
  const tabs = [
    {
      id: 1,
      name: "Recent",
      href: "#",
      current: recent ? true : false,
    },
    {
      id: 2,
      name: "Most Liked",
      href: "#",
      current: mostLiked ? true : false,
    },
    {
      id: 3,
      name: "Most Comments",
      href: "#",
      current: mostComments ? true : false,
    },
  ];
  const tabClick = (tabId) => {
    if (tabId === 1 || tabId === "1") {
      setRecent(true);
      setMostLiked(false);
      setMostComments(false);
    } else if (tabId === 2 || tabId === "2") {
      setMostLiked(true);
      setRecent(false);
      setMostComments(false);
    } else if (tabId === 3 || tabId === "3") {
      setMostComments(true);
      setRecent(false);
      setMostLiked(false);
    }
  };
  return (
    <div className="px-4 sm:px-0 xs:px-0 mb-4 mt-4">
      <div className="sm:hidden">
        <label htmlFor="question-tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="question-tabs"
          className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          // defaultValue={tabs.find((tab) => tab.current).name}
          onChange={(e) => tabClick(e.target.value)}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.id}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="cursor-pointer relative z-0 rounded-lg shadow flex divide-x divide-slate-600"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <div
              key={tab.name}
              onClick={() => tabClick(tab.id)}
              aria-current={tab.current ? "page" : undefined}
              className={classNames(
                tab.current
                  ? "text-white"
                  : "text-slate-300 hover:text-slate-400",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden py-4 px-6 text-sm font-medium text-center focus:z-10 border bg-slate-900 border-slate-600 text-white "
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-indigo-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PostFilter;
