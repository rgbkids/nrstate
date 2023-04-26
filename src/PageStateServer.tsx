import { cookies, headers } from 'next/headers';

export function currentPageState<T>(
  initialPageState: T,
  path: string,
  clearAuto?: boolean,
): T {
  const headersList = headers();

  if (clearAuto !== false) {
    if (!headersList.get('referer')?.includes(path)) {
      return initialPageState;
    }
  }

  const cookieStore = cookies();
  const value = cookieStore.get(path)?.value;

  if (!value) {
    return initialPageState;
  }

  const jsonString = decodeURIComponent(value ?? '');
  const json = JSON.parse(jsonString);
  return json;
}

export function getPageState<T>(
  initialPageState: T,
  path: string,
  clearAuto?: boolean,
): T {
  return currentPageState<T>(initialPageState, path, clearAuto);
}
