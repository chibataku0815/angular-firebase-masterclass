export const COURSES: any = {
  1: {
    id: 1,
    titles: {
      description: 'Serverless Angular with Firebase Course',
      longDescription:
        'Serveless Angular with Firestore, Firebase Storage & Hosting, Firebase Cloud Functions & AngularFire',
    },
    iconUrl:
      'https://s3-us-west-1.amazonaws.com/angular-university/course-images/serverless-angular-small.png',
    lessonsCount: 10,
    categories: ['BEGINNER'],
    seqNo: 0,
    url: 'serverless-angular',
  },
};

export const LESSONS = {
  1: {
    id: 1,
    description:
      'Angular Tutorial For Beginners - Build Your First App - Hello World Step By Step',
    duration: '4:17',
    seqNo: 1,
    courseId: 5,
  },
};

export function findCourseById(courseId: number) {
  return COURSES[courseId];
}

export function findLessonsForCourse(courseId: number) {
  return Object.values(LESSONS).filter(
    (lesson) => lesson.courseId === courseId
  );
}
