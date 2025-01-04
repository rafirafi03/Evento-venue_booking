export function checkToken(role: string) {
    const cookies = document.cookie.split('; '); // Split cookies into key-value pairs
    const tokenName = role === 'user' ? 'userToken' : role === 'company' ? 'companyToken' : null;

    if (!tokenName) {
        console.error('Invalid role specified');
        return false;
    }

    for (const cookie of cookies) {
        const [key] = cookie.split('=');
        if (key === tokenName) {
            return true; // Token found
        }
    }

    return false; // Token not found
}

