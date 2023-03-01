import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const qnaFirebaseConfig = {
  apiKey: "AIzaSyC1uw55DhjqQoyjxpQHugQl0SroAoiyMSc",
  authDomain: "compsoft-technologies.firebaseapp.com",
  projectId: "compsoft-technologies",
  storageBucket: "compsoft-technologies.appspot.com",
  messagingSenderId: "137039242268",
  appId: "1:137039242268:web:c26ea6e1cf48b28f3dabd9",
  measurementId: "G-FLQ8KXF81L"
}

let qna;
const Apps = getApps();
if(!Apps.length){
  qna = initializeApp(qnaFirebaseConfig);
}else{
  qna = Apps[0];
}

export const  qnaAuthenticator = getAuth(qna, {});
export const qnaDatabase = getFirestore(qna, {});
