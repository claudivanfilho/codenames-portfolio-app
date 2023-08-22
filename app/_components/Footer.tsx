"use client";

import { useIntl } from "react-intl";

export default function Footer() {
  const { formatMessage: t } = useIntl();
  return (
    <footer className="static w-full py-2 text-sm text-center border-t sm:py-4 sm:text-base bg-opacity-95 bg-base-200 border-t-foreground/5">
      <p>
        &copy; {new Date().getFullYear()} {t({ id: "created-by" })}.
      </p>
    </footer>
  );
}
