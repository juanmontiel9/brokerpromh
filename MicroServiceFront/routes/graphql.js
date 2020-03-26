const express = require('express');
const router = express.Router();
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");
const {courses} = require("../data/courses.json");
const objschema = buildSchema(`
  type Query {
    course(id:Int!): Course
    courses(topic:String): [Course]
  }

  type Course {
    id:Int
    title:String
    author:String
    topic:String
    url:String
  }`);

let getCourse = (args) => {
  let id = args.id;
  return courses.filter(course => {return course.id == id;})[0];
};

let getCourses = (args) => {
  let topic = args.topic;
  return courses.filter(courses => {return courses.topic == topic;});
};

const root = {
  course: getCourse,
  courses: getCourses
};
/* GET contact listing. */
router.get('/',express_graphql({
  schema: objschema,
  rootValue: root,
  graphiql: true
}));

module.exports = router;
