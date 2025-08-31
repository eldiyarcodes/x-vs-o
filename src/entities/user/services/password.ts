import { pbkdf2, randomBytes } from 'node:crypto'

export { pbkdf2, randomBytes } from 'node:crypto'

async function hashPassword(
	password: string,
	salt = randomBytes(16).toString('hex')
) {
	const hash = await new Promise<Buffer>((resolve, reject) =>
		pbkdf2(password, salt, 1000, 64, 'sha512', (error, value) =>
			error ? reject(error) : resolve(value)
		)
	)

	return {
		hash: hash.toString('hex'),
		salt,
	}
}

async function comparePassword({
	hash,
	salt,
	password,
}: {
	password: string
	hash: string
	salt: string
}) {
	return hash === (await hashPassword(password, salt)).hash
}

export const passwordService = { hashPassword, comparePassword }
