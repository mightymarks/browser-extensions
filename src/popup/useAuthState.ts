import { useEffect, useState } from 'preact/hooks'
import { firebase, getFirebase } from '../firebase'

export const useAuthState: () => [
	User,
	boolean,
	firebase.auth.Error | undefined,
] = () => {
	const [user, setUser] = useState(undefined)
	const [error, setError] = useState(undefined)

	useEffect(
		() =>
			getFirebase()
				.auth()
				.onAuthStateChanged(setUser, setError),
		[],
	)

	return [user, typeof user === 'undefined', error]
}
