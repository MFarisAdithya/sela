export function isPublicRoute(pathname: string) {
  return pathname === "/" || pathname === "/onboarding" || ["/cara-kerja", "/fitur", "/harga", "/tentang", "/privasi", "/syarat", "/masuk", "/daftar", "/lupa-password", "/verifikasi-email", "/checkout", "/pembayaran"].some(prefix => pathname.startsWith(prefix));
}
