import { cookies } from "next/headers";
import { DEFAULT_LANG, LANGS } from "../_config/constants";

export const getLocale = () => {
  const acceptLanguage = cookies().get("lang")?.value || DEFAULT_LANG;
  const browserLanguage =
    LANGS.find((l) => new RegExp(`^${l}`).test(acceptLanguage)) || DEFAULT_LANG;
  return browserLanguage;
};
