export function randStr(len: any, chars = "abc123") {
  let s = "";
  while (len--) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
