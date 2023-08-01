import React from "react";
import { useOutletContext } from "react-router-dom";
import BlogCard from "../Components/BlogCard";

const Blogs = () => {
	const { blogs, sortedBlogs } = useOutletContext();
	console.log(blogs);
	const { data } = blogs;
	return (
		<div>
			Blogs
			{blogs.success && (
				<div>
					{sortedBlogs.map((blog) => {
						return <BlogCard key={blog._id} blog={blog}/>;
					})}
				</div>
			)}
		</div>
	);
};

// Create a BlogCard component that shows title, author, date (which the blog was create), and content
// The BlogCard will be reused in this Blogs.js Page component.
export default Blogs;