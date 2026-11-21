const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

export function appPath(path: string): string {
  const relativePath = path.replace(/^\/+/, '')
  return `${basePath}/${relativePath}`
}

export function isAppRoute(pathname: string, route: string): boolean {
  const appPathname = basePath && pathname.startsWith(`${basePath}/`)
    ? pathname.slice(basePath.length)
    : pathname

  return appPathname.replace(/\/+$/, '') === `/${route.replace(/^\/+/, '')}`
}
