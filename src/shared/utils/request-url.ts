export function requestUrl(path: string) {
  if (typeof window !== "undefined") {
    return path;
  }

  const port = process.env.PORT ?? "3000";
  return new URL(path, `http://127.0.0.1:${port}`).href;
}
