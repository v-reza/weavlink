import classNames from "classnames";
export const coverPicture =
  "https://static-exp1.licdn.com/sc/h/lortj0v1h4bx9wlwbdx6zs3f";

export const ctx = classNames;

export function replaceFormatDate(date) {
  return date
    .replace("ago", "")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("seconds", "s")
    .replace("second", "s")
    .replace("days", "d")
    .replace("day", "d");
}
