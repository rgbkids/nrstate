import { revalidateTag } from 'next/cache';
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

export function getPageLocation(path: string) {
  try {
    const cookieStore = cookies();
    const value = cookieStore.get(path)?.value;
    const jsonString = decodeURIComponent(value ?? '');
    const json = JSON.parse(jsonString);
    const params = new URLSearchParams(json);
    return params.toString();
  } catch (error) {
    return '';
  }
}

export function getPageState<T>(
  initialPageState: T,
  path: string,
  clearAuto?: boolean,
): T {
  return currentPageState<T>(initialPageState, path, clearAuto);
}

export function parseQueryStringByPageState<T>(pageState: T) {
  const queryString = `${encodeURIComponent(JSON.stringify(pageState))}`;
  return queryString;
}

function setCookieForPageState(key: string, value: string) {
  /* @ts-ignore */
  cookies().set({
    name: key,
    value: value,
    httpOnly: true,
    path: '/',
  });
}

export function experimental_setPageState<T>(
  nextPageState: T,
  path: string,
  revalidate?: () => void,
) {
  const newPageState = { ...nextPageState };
  const pageStateString = parseQueryStringByPageState(newPageState);
  setCookieForPageState(path, `${pageStateString}`);

  if (revalidate) {
    revalidate();
  } else {
    revalidateTag(pageStateString);
  }
}
