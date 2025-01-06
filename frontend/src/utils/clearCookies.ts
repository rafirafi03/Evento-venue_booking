export function clearCookies(role: string) {
    console.log(role)
    document.cookie = `userToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
    document.cookie = `${role}RefreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
}