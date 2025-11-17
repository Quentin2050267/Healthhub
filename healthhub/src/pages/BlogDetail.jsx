import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/BlogsDetail.css';

/**
 * BlogDetail component
 * This component renders the detailed view of a single blog post.
 */
const BlogDetail = () => {
  const location = useLocation();
  const [blog] = useState(location.state.blogProp);

  /**
   * getAvatarLetter function
   * Returns the first letter of the author's name in uppercase.
   */
  const getAvatarLetter = (author) => {
    return author.charAt(0).toUpperCase();
  };

  return (
    <div className="blog-detail-container">
      <div className="blog-detail">
        {/* Blog Header */}
        <div className="blog-header">
          <h1>{blog.title}</h1>
          <p className="publication-date">{blog.publication_date}</p>
        </div>

        {/* Blog Content */}
        <div className="blog-content">
          {/* Author Section */}
          <div className="author-section">
            <div className="author-avatar">
              <span className="avatar-letter">{getAvatarLetter(blog.author)}</span>
            </div>
            <div className="author-info">
              <p>{blog.author}</p>
              <p>Author</p>
            </div>
          </div>

          {/* Blog Text */}
          <div
            className="blog-text"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Footer */}
        <footer>
          &copy; 2024 Health Hub. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default BlogDetail;
