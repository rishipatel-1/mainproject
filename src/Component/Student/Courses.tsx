import React, { useState } from 'react';
import "./Student.css"

type Chapter = {
  id: number;
  title: string;
  practical: string;
};

type CourseDetailsProps = {
  course: {
    id: number;
    title: string;
    description: string;
    chapters: Chapter[];
  };
  onBack: () => void;
};

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onBack }) => {
  const [practicalSubmissions, setPracticalSubmissions] = useState<string[]>([]);

  const handlePracticalSubmit = (chapterId: number, submission: string) => {
    const updatedSubmissions = [...practicalSubmissions];
    updatedSubmissions[chapterId - 1] = submission;
    setPracticalSubmissions(updatedSubmissions);
  };

  return (
    <div className="course-details">
      <h2 className="course-title">{course.title}</h2>
      <p className="course-description">{course.description}</p>
      
      {course.chapters.map((chapter) => (
        <div className="chapter" key={chapter.id}>
          <h3 className="chapter-title">{chapter.title}</h3>
          <p className="chapter-practical">{chapter.practical}</p>
          <input
            className="practical-input"
            type="file"
            placeholder="Enter your practical submission"
            value={practicalSubmissions[chapter.id - 1] || ''}
            onChange={(e) => handlePracticalSubmit(chapter.id, e.target.value)}
          />
        </div>
      ))}
      <button className="back-button" onClick={onBack}>Back</button>
      
    </div>
  );
};

export default CourseDetails;
