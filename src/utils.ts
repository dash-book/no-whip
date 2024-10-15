export const setCookie = (name: string, value: string) => {
  const date = new Date();
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};path=/;expires=${date}`;
};

export const removeCookie = (name: string) => {
  const date = new Date();
  date.setTime(date.getTime() - 1);
  return (document.cookie = `${name}='';path=/;expires=${date}`);
};

export const getCookie = (name: string): string => {
  if (typeof window === "undefined") return "";
  const v =
    document && document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : "";
};
