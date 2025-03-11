// import 'server-only';
"use server";
import { cookies } from 'next/headers'

/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */

export async function createSession(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies()

    const sessionData = JSON.stringify({
        userId: userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
    })

    cookieStore.set('session', sessionData, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week expiration in seconds
        sameSite: 'lax',
        path: '/',
    })
}

export async function getSession() {
    const cookieStore = await cookies()

    return cookieStore.get('session');
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}
