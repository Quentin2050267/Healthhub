import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blogs.css';

/**
 * SingleBlog component
 * This component renders a single blog card with a title, content, author, and publication date.
 * The card is clickable and navigates to the detailed blog page.
 * @param {object} blog - The blog object containing id, title, content, author, and publication date.
 */
const SingleBlog = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}/`} state={{ blogProp: blog }} className="block">
      <div className="blog-card">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-content">{blog.content}</p>
        <div className="blog-info">
          <span className="blog-author">{blog.author}</span>
          <span className="blog-date">{blog.publication_date}</span>
        </div>
      </div>
    </Link>
  );
};

export default SingleBlog;