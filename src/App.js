import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from './Components/NavBar';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState({});
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [sortDate, setSortDate] = useState('latest');
  const [sortedBlogs, setSortedBlogs] = useState([])

  const url = process.env.REACT_APP_URL_ENDPOINT;

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`${url}/blogs/all-blogs`);
      const data = await response.json();
      console.log(data);
      setBlogs(data);
    };
    getData();
  }, [url, shouldRefresh]);

  useEffect(() => {
	if (blogs.success) {
		const arrayCopy = [...blogs.data];
		if (sortDate === "latest") {
			const sortBlogs = arrayCopy.sort((a, b) => {
				return new Date(b.createAt) - new Date(a.createAt);
			});
			setSortedBlogs(sortBlogs);
		} else {
			const sortBlogs = arrayCopy.sort((a, b) => {
				return new Date(a.createAt) - new Date(b.createAt);
			});
			setSortedBlogs(sortBlogs);
		}
	}
}, [blogs, sortDate]);

  const handleNewBlog = async (blog) => {
    //blog can be anything you want to pass in as a parameter
    const response = await fetch(`${url}/blogs/new-blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });
    console.log(response);
    const data = await response.json();
    setShouldRefresh(false);
    console.log('data', data);
  };

  return (
    <div className="App">
      <NavBar />
      <h1>Blogs</h1>
      <select value={sortDate} onChange={(e) => setSortDate(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="earlist">Earlist</option>
      </select>
      <Outlet context={{ blogs, setBlogs, handleNewBlog, setShouldRefresh, sortedBlogs }} />
    </div>
  );
}

export default App;
