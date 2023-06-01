import React, { useState, useRef } from 'react';
import { Course } from '../dashboard/DashboardComponent';
import './Coursedetails.css';
import { Card, Button } from 'react-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

interface SubCategory {
  id: number;
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
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      subCategoryTitle: '',
      subCategoryDescription: '',
      subCategoryPractical: '',
    },
    validate: (values) => {
      const errors: Partial<typeof values> = {};
      if (!values.subCategoryTitle) {
        errors.subCategoryTitle = 'Title is required';
      }
      if (!values.subCategoryDescription) {
        errors.subCategoryDescription = 'Description is required';
      }
      if (!values.subCategoryPractical) {
        errors.subCategoryPractical = 'Practical is required';
      }
      return errors;
    },
    onSubmit: (values) => {
      const { subCategoryTitle, subCategoryDescription, subCategoryPractical } = values;

      if (editIndex !== null) {
        const updatedSubCategories = [...subCategories];
        const updatedSubCategory = {
          id: updatedSubCategories[editIndex].id,
          title: subCategoryTitle,
          description: subCategoryDescription,
          practical: subCategoryPractical,
          image: imageFile,
        };
        updatedSubCategories[editIndex] = updatedSubCategory;
        setSubCategories(updatedSubCategories);
        setEditIndex(null);
      } else {
        const newSubCategory = {
          id: Date.now(),
          title: subCategoryTitle,
          description: subCategoryDescription,
          practical: subCategoryPractical,
          image: imageFile,
        };
        setSubCategories([...subCategories, newSubCategory]);
      }

      setSubCategoryTitle('');
      setSubCategoryDescription('');
      setSubCategoryPractical('');
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
  });

  const handleEdit = (index: number) => {
    const subCategoryToEdit = subCategories[index];
    setSubCategoryTitle(subCategoryToEdit.title);
    setSubCategoryDescription(subCategoryToEdit.description);
    setSubCategoryPractical(subCategoryToEdit.practical);
    setImageFile(subCategoryToEdit.image);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
    setEditIndex(null);
  };

  return (
    <div className="container CourseContainer">
      <button className="back-btn" onClick={goBack}>
        &larr; &nbsp;Back
      </button>

      <div className="course-details">
        <h2 className="fs-1 fw-bold">{course.title}</h2>
        <p className="py-2">{course.description}</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label>Chapter Title</label>
            <input
              type="text"
              className="form-control"
              value={formik.values.subCategoryTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="subCategoryTitle"
            />
            {formik.touched.subCategoryTitle && formik.errors.subCategoryTitle && (
              <div className="error">{formik.errors.subCategoryTitle}</div>
            )}
          </div>
          <div className="form-group">
            <label>Chapter Description</label>
            <textarea
              className="form-control"
              value={formik.values.subCategoryDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="subCategoryDescription"
            ></textarea>
            {formik.touched.subCategoryDescription && formik.errors.subCategoryDescription && (
              <div className="error">{formik.errors.subCategoryDescription}</div>
            )}
          </div>
          <div className="form-group">
            <label>Practical</label>
            <input
              type="text"
              className="form-control"
              value={formik.values.subCategoryPractical}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="subCategoryPractical"
            />
            {formik.touched.subCategoryPractical && formik.errors.subCategoryPractical && (
              <div className="error">{formik.errors.subCategoryPractical}</div>
            )}
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
            Add Chapter
          </button>
        </form>
        <div className="subcategories">
          <h5>List Of Chapters</h5>
          {subCategories.map((subCategory, index) => (
            <Card key={index} className="mt-4">
              <Card.Body className="p-4 w-auto">
                <div className="d-flex justify-content-between">
                  <Card.Title className="title">{subCategory.title}</Card.Title>

                  <div className="card-header-icons">
                    <Button variant="link" onClick={() => handleEdit(index)}>
                      <BsPencil />
                    </Button>
                    <Button variant="link" onClick={() => handleDelete(index)}>
                      <BsTrash />
                    </Button>
                  </div>
                </div>
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
