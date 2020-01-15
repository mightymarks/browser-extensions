import firebase from 'firebase'

const USER_INPUT_REQUIRED = '?'

export const highlightAuthStateToUser = (user: firebase.User) => {
	browser.browserAction.setBadgeText({
		text: user ? '' : USER_INPUT_REQUIRED,
	})
}
