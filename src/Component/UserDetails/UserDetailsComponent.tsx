import React, { useState } from 'react';
import { Card, ProgressBar, Form, Table } from 'react-bootstrap';

interface User {
  id: number;
  name: string;
  stack: string;
  courses: string[];
  tasksCompleted: number;
  totalTasks: number;
  submittedPracticals: string[];
  selectedCourse?: string;
}

const UserDetailsComponent = () => {
  const [selectedStack, setSelectedStack] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      stack: 'Stack A',
      courses: ['Course A', 'Course B'],
      tasksCompleted: 7,
      totalTasks: 10,
      submittedPracticals: ['Course A', 'Course B'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      stack: 'Stack A',
      courses: ['Course B', 'Course C'],
      tasksCompleted: 5,
      totalTasks: 10,
      submittedPracticals: ['Course C'],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      stack: 'Stack B',
      courses: ['Course A', 'Course C'],
      tasksCompleted: 3,
      totalTasks: 10,
      submittedPracticals: ['Course A', 'Course C'],
    },
  ]);

  const handleStackChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSelectedStack(event.target.value);
    setSelectedCourse('All');
  };

  const handleCourseChange = (event: React.ChangeEvent<any>, userId: number) => {
    const selectedValue = event.target.value;

    // Update the selected course for the specific user
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          selectedCourse: selectedValue,
        };
      }
      return user;
    });

    // Update the users array with the updated users
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) => {
    if (selectedStack === 'All' && selectedCourse === 'All') {
      return true;
    } else if (selectedStack === 'All') {
      return user.courses.includes(selectedCourse);
    } else if (selectedCourse === 'All') {
      return user.stack === selectedStack;
    } else {
      return user.stack === selectedStack && user.courses.includes(selectedCourse);
    }
  });

  return (
    <div className="container mt-3">
      <h3>User Details</h3>
      <Form>
        <Form.Group controlId="stackSelect">
          <Form.Label>Stack:</Form.Label>
          <Form.Control as="select" value={selectedStack} onChange={handleStackChange}>
            <option value="All">All</option>
            <option value="Stack A">Stack A</option>
            <option value="Stack B">Stack B</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="courseSelect">
          <Form.Label className='mt-3'>Course:</Form.Label>
          <Form.Control as="select" value={selectedCourse} onChange={(event) => setSelectedCourse(event.target.value)}>
            <option value="All">All</option>
            {users
              .flatMap((user) => user.courses)
              .filter((course, index, self) => self.indexOf(course) === index)
              .map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
      </Form>
<div className='tableDiv'>
      <Table striped bordered className='mt-4'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stack</th>
            <th>Course</th>
            <th>Status</th>
            {/* <th>Practical Completed</th>
            <th>Total Practical</th> */}
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.stack}</td>
                <td className='courseTable'>
                  <Form.Control
                    as="select"
                    value={user.selectedCourse || selectedCourse}
                    onChange={(event) => handleCourseChange(event, user.id)}
                  >
                    <option value="All">All</option>
                    {user.courses.map((course) => (
                      <option key={course} value={course} className="courseTable">
                        {course}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  <span style={{ marginRight: '5px', color: user.submittedPracticals.includes(user.selectedCourse || selectedCourse) ? 'green' : 'red' }}>
                    {user.submittedPracticals.includes(user.selectedCourse || selectedCourse) ? 'Submitted' : 'Not Submitted'}
                  </span>
                </td>
                {/* <td>{user.tasksCompleted}</td>
                <td>{user.totalTasks}</td> */}
                <td>
                  <ProgressBar now={(user.tasksCompleted / user.totalTasks) * 100} label={`${user.tasksCompleted}/${user.totalTasks}`} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
    
</div>
  );
};

export default UserDetailsComponent;
