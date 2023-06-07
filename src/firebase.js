import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCmNoGG2OSjN22J5TcMyD7thdmHPwP7eZs',
	authDomain: 'chat-e152b.firebaseapp.com',
	projectId: 'chat-e152b',
	storageBucket: 'chat-e152b.appspot.com',
	messagingSenderId: '10755266003',
	appId: '1:10755266003:web:b6d7212513bfeaf82d0b26',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
