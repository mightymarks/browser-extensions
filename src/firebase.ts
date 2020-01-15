import firebase from 'firebase/app'

const config = {
	apiKey: 'AIzaSyAXZXdj-eJcuRtS9_qTxI3eIzUUV5023Lc',
	authDomain: 'mightymarks.app',
	databaseURL: 'https://mighty-marks.firebaseio.com',
	projectId: 'mighty-marks',
	storageBucket: 'mighty-marks.appspot.com',
	messagingSenderId: '856402700504',
	appId: '1:856402700504:web:cae8ec27936c0142088fad',
	measurementId: 'G-PT9SZDFMST',
}

export const getFirebase = () => {
	if (!firebase.apps.length) {
		firebase.initializeApp(config)
	}
	return firebase
}

export { firebase }
