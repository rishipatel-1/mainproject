import React, { useState } from 'react';
import CourseDetails from './Courses';
import './StudentCourse.css';

type Props = {};

const StudentCourse: React.FC<Props> = () => {
  const courses = [
    { id: 1, title: 'HTML & CSS', description: 'Fundamentals for everyone. This course is for everyone at Simform in the production unit. Including web developers, mobile developers, and QAs. It gives you an overview of basic fundamentals of the world of software application development. Ranging from protocols and APIs to Code management and security.' },
    { id: 2, title: 'Java Script', description: 'Fundamentals of Web Programming. This course is about learning web programming fundamentals from web server and hosting to session and browser storage.' },
    { id: 3, title: 'ReactJS', description: 'Learn ReactJS to build interactive web applications.' },
    { id: 4, title: 'Amazon Web Services - The Big Picture', description: 'Explore the big picture of Amazon Web Services and understand its key concepts and services.' },
    { id: 5, title: 'Microsoft Azure - The Big Picture', description: 'Get an overview of Microsoft Azure and learn about its core features and capabilities.' },
  ];
  
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course:any) => {
    setSelectedCourse(course);
  };

  const handleBackClick = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="course-container">
      {selectedCourse ? (
        <CourseDetails course={selectedCourse} onBack={handleBackClick} />
      ) : (
        <>
          <h2 className="course-title">Your Courses</h2>
          <div className="course-list">
            {courses.map((course) => (
              <div
                className="course-item"
                key={course.id}
                onClick={() => handleCourseClick(course)}
              >
                <h3 className="course-item-title">{course.title}</h3>
                <p className="course-item-description">{course.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentCourse;
