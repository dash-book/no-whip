export const setCookie = (name: string, value: string) => {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};path=/;expires=${date}`;
};

export const removeCookie = (name: string) => {
  const expiredOldDate = "Thu, 01 Jan 1970 00:00:01 GMT";
  return (document.cookie = `${name}=;path=/;expires=${expiredOldDate}`);
};

export const getCookie = (name: string): string => {
  if (typeof window === "undefined") return "";
  const v =
    document && document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : "";
};
