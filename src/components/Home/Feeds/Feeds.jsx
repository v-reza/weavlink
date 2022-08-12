import React from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Feeds = ({
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
      onClick: () => setRecent(!recent),
      // onclick: setRecent(!recent),
    },
    {
      id: 2,
      name: "Most Liked",
      href: "#",
      current: mostLiked ? true : false,
      // onclick: setMostLiked(!mostLiked),
    },
    {
      id: 3,
      name: "Most Comments",
      href: "#",
      current: mostComments ? true : false,
      // onclick: setMostComments(!mostComments),
    },
  ];
  const tabClick = (tabId) => {
    // console.log(tabId === "1")
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
    <div className="px-4 sm:px-0 xs:px-0">
      <div
        onClick={() => setOpenNewPost(true)}
        className="cursor-pointer mb-3 w-full inline-flex text-center justify-center items-center px-4 py-2 border border-transparent text-sm font-medium text-end rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
      >
        <span className="text-center">New Post</span>
      </div>
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
          className="cursor-pointer relative z-0 rounded-lg shadow flex divide-x divide-gray-200 dark:divide-slate-600"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <div
              key={tab.name}
              onClick={() => tabClick(tab.id)}
              aria-current={tab.current ? "page" : undefined}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 border dark:bg-slate-900 dark:border-slate-600 dark:text-white "
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-rose-500" : "bg-transparent",
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

export default Feeds;
