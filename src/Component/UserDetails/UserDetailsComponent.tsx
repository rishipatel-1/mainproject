import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

const UserDetailsComponent = () => {
  // Assuming you have an array of user details
  const users = [
    { id: 1, name: 'John Doe', tasksCompleted: 7, totalTasks: 10 },
    { id: 2, name: 'Jane Smith', tasksCompleted: 5, totalTasks: 10 },
    { id: 3, name: 'Mike Johnson', tasksCompleted: 3, totalTasks: 10 },
    { id: 1, name: 'John Doe', tasksCompleted: 7, totalTasks: 10 },
    { id: 2, name: 'Jane Smith', tasksCompleted: 5, totalTasks: 10 },
    { id: 3, name: 'Mike Johnson', tasksCompleted: 3, totalTasks: 10 },
    { id: 1, name: 'John Doe', tasksCompleted: 7, totalTasks: 10 },
    { id: 2, name: 'Jane Smith', tasksCompleted: 5, totalTasks: 10 },
    { id: 3, name: 'Mike Johnson', tasksCompleted: 3, totalTasks: 10 },
  ];

  return (
    <div className="container mt-3">
      <h3>User Details</h3>
      <div className="row">
        {users.map(user => (
          <div className="col-lg-4 col-md-6" key={user.id}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <strong>Tasks Completed:</strong> {user.tasksCompleted}/{user.totalTasks}
                </Card.Text>
                <ProgressBar now={(user.tasksCompleted / user.totalTasks) * 100} label={`${user.tasksCompleted}/${user.totalTasks}`} />
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetailsComponent;
