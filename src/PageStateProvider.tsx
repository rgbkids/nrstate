"use client";

import React from "react";
import { useState } from "react";
import { PageStateContext } from "./PageStateContext";
import { getQueryStringByPageState } from "./PageStateURI";
import { useRouter } from "next/navigation";

import { setCookie } from "nookies";

function setCookieForState(key: string, value: string) {
  setCookie(null, key, value, {
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
}

export default function PageStateProvider<T>({
  children,
  current,
}: {
  children: React.ReactNode;
  current: T;
}) {
  const [pageState, _setPageState] = useState(current);
  const router = useRouter();

  function setPageState(nextPageState: T, path: string) {
    let newPageState = { ...pageState, ...nextPageState };
    _setPageState(newPageState);

    const pageStateString = getQueryStringByPageState(path, newPageState);
    setCookieForState(path, `${pageStateString}`);

    router.push(`${location.origin}${path}`);
  }

  return (
    <PageStateContext.Provider value={[pageState, setPageState]}>
      {children}
    </PageStateContext.Provider>
  );
}
