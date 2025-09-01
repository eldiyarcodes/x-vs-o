import { left, right } from '@/shared/lib/either'
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import 'server-only'
import { SessionEntity, UserEntity, userToSession } from '../domain'

const secretKey = process.env.SESSION_SECRET
const encodeKey = new TextEncoder().encode(secretKey)

async function encrypt(payload: SessionEntity) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('7d')
		.sign(encodeKey)
}

async function decrypt(session: string | undefined = '') {
	try {
		const { payload } = await jwtVerify(session, encodeKey, {
			algorithms: ['HS256'],
		})
		return right(payload)
	} catch (err) {
		return left(err)
	}
}

async function addSession(user: UserEntity) {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 1000)

	const sessionData = userToSession(user, expiresAt.toISOString())
	const session = await encrypt(sessionData)
	const cookieStore = await cookies()

	cookieStore.set('session', session, {
		httpOnly: true,
		// secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/',
	})
}

async function deleteSession() {
	const cookieStore = await cookies()
	cookieStore.delete('session')
}

async function verifySession() {
	const cookie = (await cookies()).get('session')?.value
	const session = await decrypt(cookie)

	if (session.type === 'left') {
		redirect('/sign-in')
	}

	return { isAuth: true, session: session.value }
}

export const sessionService = { addSession, deleteSession, verifySession }
