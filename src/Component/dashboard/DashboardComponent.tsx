import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Coursedetails from "../../Component/Course/Coursedetails"
import './DashboardComponent.css';

export interface Course {
  title: string;
  description: string;
}

 export interface SubCategory {
  title: string;
  practical: boolean;
}

const CourseDetails: React.FC<{ course: Course; goBack: () => void }> = ({ course, goBack }) => (
  <div className="course-details">
    <h4>{course.title}</h4>
    <p>{course.description}</p>
    <div className="subcategories">
      <h5>Subcategories</h5>
      {/* Render subcategories and practicals here */}
    </div>
    <button className="back-button" onClick={goBack}>
      &larr; Back to Dashboard
    </button>
  </div>
);

const DashboardComponent: React.FC = () => {
  const studentData = [
    { label: 'Total Students', data: 100 },
  ];

  const courseData = [
    { label: 'Total Courses', data: 20 },
  ];

  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const addCourse = () => {
    const newCourse: Course = { title, description };
    setCourses([...courses, newCourse]);
    setTitle('');
    setDescription('');
  };

  const handleArrowClick = (course: Course) => {
    setSelectedCourse(course);
    setShowDetails(true);
  };

  const handleGoBack = () => {
    setShowDetails(false);
    setSelectedCourse(null);
  };

  return (
    <>
      {!showDetails ? (
        <div className="container DashboardContainer">
          <h3>Dashboard</h3>

          <div className="row mt-4">
            <div className="col-md-6">
              <BarChart width={400} height={300} data={studentData}>
                <Bar dataKey="data" fill="rgba(54, 162, 235, 0.6)" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </div>
            <div className="col-md-6">
              <BarChart width={400} height={300} data={courseData}>
                <Bar dataKey="data" fill="rgba(75, 192, 192, 0.6)" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">Add Task</div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className='text-center'>
                    <button type="button" className="btn btn-primary mt-3 adddbtn" onClick={addCourse}>
                      Add Task
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="container courseContainer mt-4 rounded-4">
            <div className="row mt-4">
              <div className="text-center">
                <h2 className='fw-bold'>Courses</h2>
              </div>
              {courses.map((course, index) => (
                <div className="col-md-4 mt-3" key={index}>
                  <div className="card mt-3">
                    <div className="card-header text-center">{course.title}</div>
                    <div className="card-body Description">
                      <p className="card-text">{course.description}</p>
                      <div className='float-end '>
                      <button className="arrow-button" onClick={() => handleArrowClick(course)}>
                        &rarr;
                      </button>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Coursedetails course={selectedCourse!} goBack={handleGoBack} />
      )}
    </>
  );
};

export default DashboardComponent;
