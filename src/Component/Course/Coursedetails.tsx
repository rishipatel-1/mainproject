import React, { useState, useRef } from 'react';
import { Course } from '../dashboard/DashboardComponent';
import './Coursedetails.css';
import { Card } from "react-bootstrap";

interface SubCategory {
  title: string;
  description: string;
  practical: string;
  image: File | null;
}

const Coursedetails: React.FC<{ course: Course; goBack: () => void }> = ({ course, goBack }) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCategoryTitle, setSubCategoryTitle] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [subCategoryPractical, setSubCategoryPractical] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSubCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSubCategory: SubCategory = {
      title: subCategoryTitle,
      description: subCategoryDescription,
      practical: subCategoryPractical,
      image: imageFile,
    };
    setSubCategories([...subCategories, newSubCategory]);
    setSubCategoryTitle('');
    setSubCategoryDescription('');
    setSubCategoryPractical('');
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the value of the file input
    }
  };

  return (
    <div className="container CourseContainer">
      <button className="back-button" onClick={goBack}>
        &larr; &nbsp;Back
      </button>

      <div className="course-details">
        <h2 className='fs-1 fw-bold'>{course.title}</h2>
        <p className="py-2">{course.description}</p>
        <form onSubmit={addSubCategory}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={subCategoryTitle}
              onChange={(e) => setSubCategoryTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              value={subCategoryDescription}
              onChange={(e) => setSubCategoryDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Practical</label>
            <input
              type="text"
              className="form-control"
              value={subCategoryPractical}
              onChange={(e) => setSubCategoryPractical(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              className="form-control"
              ref={fileInputRef}
              onChange={(e) => setImageFile(e.target.files && e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Add Subcategory
          </button>
        </form>
        <div className="subcategories">
          <h5>List Of Items</h5>
          {subCategories.map((subCategory, index) => (
            <Card key={index} className='mt-4'>
              <Card.Body className='p-4 w-auto'>
                <Card.Title className='title'>{subCategory.title}</Card.Title>
                <Card.Text>{subCategory.description}</Card.Text>
                <Card.Text>Practical: {subCategory.practical}</Card.Text>
                {subCategory.image && (
                  <img
                    src={URL.createObjectURL(subCategory.image)}
                    alt="Subcategory Image"
                    className="img-fluid mt-3"
                  />
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coursedetails;
