'use client';

import { parseCookies } from 'nookies';

export function parseToPageStateClient<T>(initialPageState: T, path: string): T {
  let key = path;
  // TODO: pathがなければ自動で自分自身
  // if (!key) {
  //   key = location.pathname;
  // }

  const cookies = parseCookies();

  let value = cookies[path];
  value = value?.replace(`${key}=`, ''); // TODO: もっとスマートに

  if (!value) {
    return initialPageState;
  }

  let jsonString = decodeURIComponent(value ?? '');

  const json = JSON.parse(jsonString);
  return json;
}
