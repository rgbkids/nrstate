export function getQueryStringByPageState<T>(key: string, pageState: T) {
  const queryString = `${key}=${encodeURIComponent(JSON.stringify(pageState))}`;

  return queryString;
}
