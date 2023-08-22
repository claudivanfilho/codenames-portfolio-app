"use client";

import { FC, ReactNode, useState } from "react";
import { IntlProvider } from "react-intl";
import { LANGS } from "@/app/_config/constants";

import enMessages from "@/messages/en.json";
import ptMessages from "@/messages/pt.json";

const messages: { [key: string]: Record<string, string> } = {
  pt: ptMessages,
  en: enMessages,
};

export const IntlProviderLocal: FC<{ children: ReactNode; remoteLocale: string }> = ({
  children,
  remoteLocale,
}) => {
  const browserLanguage = LANGS.find((l) => new RegExp(`^${l}`).test(remoteLocale)) || "en";
  const [locale] = useState(browserLanguage);

  return (
    <IntlProvider locale={locale} messages={messages[locale] || messages.en}>
      {children}
    </IntlProvider>
  );
};
