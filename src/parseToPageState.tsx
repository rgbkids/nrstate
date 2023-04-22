import { cookies } from 'next/headers';

export function parseToPageState<T>(initialPageState: T, path: string): T {
  let key = path;
  // TODO: pathがなければ自動で自分自身

  const cookieStore = cookies();
  let value = cookieStore.get(key)?.value;
  value = value?.replace(`${key}=`, ""); // TODO:

  if (!value) {
    return initialPageState;
  }

  let jsonString = decodeURIComponent(value ?? '');

  const json = JSON.parse(jsonString);
  return json;
}
