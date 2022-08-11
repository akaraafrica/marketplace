export function maskWallet(address: string) {
  console.log("address is ", address);
  if (!address || address.length < 8) return address || "";
  const first = address.slice(0, 4);
  const last = address.slice(address.length - 4);
  return `${first}*******${last}`;
}
