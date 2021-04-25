import firebase from 'firebase/app';
import 'firebase/firestore';
import { COURSES, findLessonsForCourse } from './db-data';
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
  const courses = await db.collection('courses');
  for (const course of Object.values(COURSES)) {
    const newCourse = removeId(course);
    const courseRef = await courses.add(newCourse);
    const lessons = await courseRef.collection('lessons');
    const courseLessons = findLessonsForCourse(course['id']);
    for (const lesson of courseLessons) {
      const newLesson = removeId(lesson);
      await lessons.add(newLesson);
    }
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
