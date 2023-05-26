import React from 'react';

const UserComponent = () => {
  const students = [
    { id: 1, name: 'John Doe', age: 20, grade: 'A' },
    { id: 2, name: 'Jane Smith', age: 22, grade: 'B' },
    { id: 3, name: 'Alex Johnson', age: 21, grade: 'A+' },
    { id: 4, name: 'Emily Brown', age: 19, grade: 'B-' },
  ];

  return (
    <div className="container">
      <h3>Student Details</h3>
      <div className="row">
        {students.map((student) => (
          <div key={student.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{student.name}</h5>
                <p className="card-text">
                  Age: {student.age} | Grade: {student.grade}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserComponent;
