import React from 'react';

type CourseDetailsProps = {
  course: {
    id: number;
    title: string;
    description: string;
  };
  onBack: () => void;
};

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onBack }) => {
  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default CourseDetails;
