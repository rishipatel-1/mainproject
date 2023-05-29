import React, { useState } from 'react';
import { Course } from '../dashboard/DashboardComponent';
import './Coursedetails.css';

interface SubCategory {
  title: string;
  description: string;
  practical: string;
}

const Coursedetails: React.FC<{ course: Course; goBack: () => void }> = ({ course, goBack }) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCategoryTitle, setSubCategoryTitle] = useState('');
  const [subCategoryDescription, setSubCategoryDescription] = useState('');
  const [subCategoryPractical, setSubCategoryPractical] = useState('');

  const addSubCategory = (e:any) => {
    e.preventDefault();
    const newSubCategory: SubCategory = {
      title: subCategoryTitle,
      description: subCategoryDescription,
      practical: subCategoryPractical,
    };
    setSubCategories([...subCategories, newSubCategory]);
    setSubCategoryTitle('');
    setSubCategoryDescription('');
    setSubCategoryPractical('');
  };

  return (
    <div className="container CourseContainer">
      <div className="course-details">
        <h4>{course.title}</h4>
        <p>{course.description}</p>
        <div className="subcategories">
          <h5>List Of Items</h5>
          {subCategories.map((subCategory, index) => (
            <div key={index}>
              <h6>{subCategory.title}</h6>
              <p>{subCategory.description}</p>
              <p>Practical: {subCategory.practical}</p>
            </div>
          ))}
        </div>

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
          <button type="submit" className="btn btn-primary mt-3">
            Add Subcategory
          </button>
        </form>

        <button className="back-button" onClick={goBack}>
          &larr; Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Coursedetails;
