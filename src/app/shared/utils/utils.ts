export function getIdFromUrl(url:string): number {
  const urlSpliter = url.split('/');
  return Number(urlSpliter[urlSpliter.length - 2]);
} 