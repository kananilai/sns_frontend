import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyCZiRoie0Baad_ZHJzOqrWPpWWFJNjdF2w",
      authDomain: "snsapp-6f786.firebaseapp.com",
      projectId: "snsapp-6f786",
      storageBucket: "snsapp-6f786.appspot.com",
      messagingSenderId: "1055004171432",
      appId: "1:1055004171432:web:67082aa4e183d5a0b9f69d",
      measurementId: "G-T6XDJ8RQWJ"
    }
  )
}

export default firebase
