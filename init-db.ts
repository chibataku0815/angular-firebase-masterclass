import firebase from 'firebase/app';
import 'firebase/firestore';
import { USER } from './db-data';
require('dotenv').config();

const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

console.log(JSON.stringify(config));

const app = firebase.initializeApp(config);
const db = firebase.firestore();

main().then((r) => console.log('Done.'));

async function uploadData() {
  const users = await db.collection('user');
  for (const user of Object.values(USER)) {
    const newUser = removeId(user);
    await users.add(newUser);
  }
}

function removeId(data: any) {
  const newData: any = { ...data };
  delete newData.id;
  return newData;
}

async function main() {
  try {
    await uploadData();
    await app.delete();
  } catch (e) {
    console.log(e);
  }
}
