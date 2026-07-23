const siteBasePath = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? "/www" : "";

export function publicAsset(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
