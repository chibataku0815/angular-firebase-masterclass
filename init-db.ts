import * as firebase from "firebase";
import { COURSES, findLessonsForCourse } from "./db-data";
require("dotenv").config();

const config = {
  apiKey: "AIzaSyDAdoefqX5OqjkD3BkW25ZAL6XYZMo4Vz8",
  authDomain: "fir-course-17549.firebaseapp.com",
  databaseURL: "https://fir-course-17549.firebaseio.com",
  projectId: "fir-course-17549",
  storageBucket: "fir-course-17549.appspot.com",
  messagingSenderId: "170806523820",
  appId: "1:170806523820:web:a3181632d54d076a0bec09",
};

console.log(JSON.stringify(config));

const app = firebase.initializeApp(config);
const db = firebase.firestore();

main().then((r) => console.log("Done."));

async function uploadData() {
  const courses = await db.collection("courses");
  for (let course of Object.values(COURSES)) {
    const newCourse = removeId(course);
    const courseRef = await courses.add(newCourse);
    const lessons = await courseRef.collection("lessons");
    const courseLessons = findLessonsForCourse(course["id"]);
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
