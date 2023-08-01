import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BlogForm from "./Components/BlogForm";
import Blogs from "./Pages/Blogs";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditForm from "./Components/EditForm";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Blogs />,
			},
			{
				path: "blog-form",
				element: <BlogForm />,
			},
			{
				path:"edit/:id",
				element:<EditForm/>
			}
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();