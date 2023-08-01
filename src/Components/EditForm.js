import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';

const EditForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const url = process.env.REACT_APP_URL_ENDPOINT;
  const { id } = useParams();
  const { blogs, setShouldRefresh } = useOutletContext();
  const navigate = useNavigate();
  const allblogs = blogs.data;

  useEffect(() => {
    if (allblogs) {
      const foundBlog = allblogs.find((blog) => blog._id === id);
      if (foundBlog) {
        setTitle(foundBlog.title);
        setContent(foundBlog.content);
      }
    }
  }, [id, blogs]);






  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setShouldRefresh(true);
    const body = {
      title,
      content,
    };
    const response = await fetch(`${url}/blogs/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const updatedBlog = await response.json();
    setShouldRefresh(false);
    navigate('/');
    console.log(updatedBlog);
  };

  const handleonDelete = async () => {
    setShouldRefresh(true);
    const response = await fetch(`${url}/blogs/delete/${id}`, {
      method: 'DELETE',
    });
    const deletedBlog = await response.json();
    console.log(deletedBlog);
    setShouldRefresh(false);
    navigate('/');
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="title"> Title: </label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="content"> Content: </label>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button>Edit</button>
      </form>
      <button onClick={handleonDelete}>Delete</button>
      <button onClick={() => navigate('/')}> Cancel</button>
    </div>
  );
};

export default EditForm;
