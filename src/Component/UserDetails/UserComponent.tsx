import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import './User.css';

interface Student {
  id: number;
  name: string;
  stack: string;
}

const UserComponent: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Student>({
    id: 0,
    name: '',
    stack: '',
  });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    // Fetch students from API or any data source

    // Example code to generate random students
    const generateRandomStudent = (): Student => {
      const id = Math.floor(Math.random() * 9000) + 1000; // Generate random 4-digit ID
      const names = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis'];
      const stacks = ['React', 'DevOps', '.NET', 'Python'];
      const name = names[Math.floor(Math.random() * names.length)];
      const stack = stacks[Math.floor(Math.random() * stacks.length)];

      return { id, name, stack };
    };

    const updatedStudents = Array.from({ length: 10 }, () => generateRandomStudent());
    setStudents(updatedStudents);
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditModalOpen = (student: Student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const handleSaveStudent = () => {
    // Add your logic to save the new student
    // Update the state with the new student
    const id = Math.floor(Math.random() * 9000) + 1000; // Generate random 4-digit ID
    const updatedNewStudent = { ...newStudent, id };
    const updatedStudents = [...students, updatedNewStudent];
    setStudents(updatedStudents);
    setNewStudent({ id: 0, name: '', stack: '' });
    setIsModalOpen(false);
    scrollToLatestStudent();
  };

  const handleUpdateStudent = () => {
    // Add your logic to update the student
    // Update the state with the updated student

    // Example code to update the student in the list
    const updatedStudents = students.map((student) => {
      if (student.id === selectedStudent?.id) {
        return {
          ...student,
          name: selectedStudent.name,
          stack: selectedStudent.stack,
        };
      }
      return student;
    });
    setStudents(updatedStudents);
    setSelectedStudent(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteStudent = (id: number) => {
    // Add your logic to delete the student
    // Update the state by removing the student from the list
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedStudent((prevStudent) =>
      prevStudent ? { ...prevStudent, [name]: value } : null
    );
  };

  const scrollToLatestStudent = () => {
    if (tableRef.current) {
      tableRef.current.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container">
      <h3>Student Details</h3>
      <button onClick={handleModalOpen}>Add Student</button>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stack</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.stack}</td>
              <td>
                <BsPencil className="m-2" onClick={() => handleEditModalOpen(student)} />
                <BsTrash className="m-2" onClick={() => handleDeleteStudent(student.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={isModalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={newStudent.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="stack">Stack:</label>
            <input type="text" id="stack" name="stack" value={newStudent.stack} onChange={handleInputChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveStudent}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isEditModalOpen} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={selectedStudent?.name || ''}
              onChange={handleEditInputChange}
            />
          </div>
          <div>
            <label htmlFor="stack">Stack:</label>
            <input
              type="text"
              id="stack"
              name="stack"
              value={selectedStudent?.stack || ''}
              onChange={handleEditInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateStudent}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserComponent;
