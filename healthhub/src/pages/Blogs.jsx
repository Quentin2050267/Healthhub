import React, { useState, useEffect } from 'react';
import CreateBlog from '../components/CreateBlog';
import SingleBlog from '../components/Blog';
import '../styles/Blogs.css';
import ModalAct from '../components/Modal';
import CommunityImage from '../assets/community.jpg';
import EventsImage from '../assets/events.jpg';
import EventOneImage from '../assets/event1.jpg';
import EventTwoImage from '../assets/event2.jpg';

const GRAPHQL_ENDpoint = process.env.REACT_APP_GRAPHQL_ENDpoint || 'http://localhost:3001/graphql';

/**
 * graphQLFetch function
 * Fetches data from the GraphQL endpoint.
 * @param {string} query - The GraphQL query string.
 * @param {object} variables - The variables for the GraphQL query.
 * @returns {object} - The fetched data.
 */
async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.exception.errors) {
        const details = error.extensions.exception.errors.join('\n');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

/**
 * BlogPage component
 * This component renders the blog page, including tabs for different blog categories,
 * a search bar, and a list of blogs. It also includes a form for creating new blogs.
 */
const BlogPage = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const [blogs, setBlogs] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [showCommunityChatModal, setShowCommunityChatModal] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [registeredEvent, setRegisteredEvent] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/elder-care-videos')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setVideos(data))
      .catch(error => {
        console.error('Error fetching videos:', error);
        setError(error.toString());
      });
  }, []);

  /**
   * handleTabClick function
   * Handles the click event on the tab buttons.
   * @param {object} e - The event object.
   */
  const handleTabClick = (e) => {
    const buttonValue = e.target.textContent.toLowerCase();
    if (activeTab !== buttonValue) {
      setActiveTab(buttonValue);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const query = `
        query {
          blogs {
            id
            title
            content
            author
            publication_date
            tag
          }
        }
      `;
      const data = await graphQLFetch(query);
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    };
    fetchBlogs();
  }, []);

  /**
   * handleCreateBlog function
   * Handles the creation of a new blog.
   * @param {object} newBlog - The new blog data.
   */
  const handleCreateBlog = async (newBlog) => {
    const mutation = `
      mutation ($input: BlogInput!) {
        createBlog(input: $input) {
          id
          title
          content
          author
          publication_date
          tag
        }
      }
    `;

    const newId = blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) + 1 : 1;

    const variables = {
      input: {
        id: newId,
        title: newBlog.title,
        content: newBlog.content,
        author: newBlog.author,
        publication_date: new Date().toISOString().split('T')[0],
        tag: newBlog.tag,
      },
    };

    const data = await graphQLFetch(mutation, variables);
    if (data && data.createBlog) {
      alert('Blog created successfully!');
      setBlogs([data.createBlog, ...blogs]);
    }
  };

  /**
   * handleSearch function
   * Handles the search functionality for blogs.
   */
  const handleSearch = async (e) => {
    const newKeyword = e.target.value;
    setSearchKeyword(newKeyword);
  
    const query = `
      query ($keyword: String!) {
        searchBlogs(keyword: $keyword) {
          id
          title
          content
          author
          publication_date
          tag
        }
      }
    `;
  
    const variables = { keyword: newKeyword };
    const data = await graphQLFetch(query, variables);
    if (data && data.searchBlogs) {
      setSearchResults(data.searchBlogs);
    }
  };

  /**
   * handleResetSearch function
   * Resets the search results and search keyword.
   */
  const handleResetSearch = () => {
    setSearchKeyword('');
    setSearchResults([]);
  };

  /**
   * handleJoinCommunityChat function
   * Opens the community chat modal.
   */
  const handleJoinCommunityChat = () => {
    setShowCommunityChatModal(true);
  };

  /**
   * handleViewEvents function
   * Opens the events modal.
   */
  const handleViewEvents = () => {
    setShowEventsModal(true);
  };

  /**
   * handleRegisterEvent function
   * Registers the user for a selected event.
   * @param {string} eventTitle - The title of the event to register for.
   */
  const handleRegisterEvent = (eventTitle) => {
    setRegisteredEvent(eventTitle);
    alert(`You have successfully registered for the event: ${eventTitle}`);
  };

  /**
   * handleCloseModal function
   * Closes the currently open modal.
   */
  const handleCloseModal = () => {
    setShowCommunityChatModal(false);
    setShowEventsModal(false);
  };
  /**
   * Groups the blogs by their tags.//for better view
   */
  const blogsGroupedByTags = blogs.reduce((groupedBlogs, blog) => {
    (groupedBlogs[blog.tag] = groupedBlogs[blog.tag] || []).push(blog);
    return groupedBlogs;
  }, {});

  const [messages, setMessages] = useState([
    { text: "Looking forward to the upcoming park walk!", user: "User123", time: "10:45 AM" },
    { text: "Anyone here joining the wellness webinar? Let's connect!", user: "ElderCareFan", time: "9:15 AM" },
    { text: "Can someone share their experience from last year's event?", user: "Caregiver99", time: "8:30 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  /**
   * handleSendMessage function
   * Handles sending a new message in the community chat.
   */
  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    const newMessageObj = {
      text: newMessage,
      user: "You",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    alert("Message sent successfully!");
    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  return (
    <div className="blogs-container mx-auto px-6 lg:px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Additional Features Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg col-span-3 mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900"> We Healthhub Community🏠</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Community Chat Card */}
          <div className="bg-gray-100 p-6 rounded-md hover:shadow-md transition-all">
            <img src={CommunityImage} alt="Community Chat" className="rounded-md mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Community Chat</h3>
            <p className="text-gray-700 mb-4">Engage with fellow elder care members! Participate in discussions, share experiences, and provide support.</p>
            <button onClick={handleJoinCommunityChat} className="bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#0056b3] transition-colors duration-300">Join Community Chat</button>
          </div>
          {/* Events Card */}
          <div className="bg-gray-100 p-6 rounded-md hover:shadow-md transition-all">
            <img src={EventsImage} alt="Upcoming Events" className="rounded-md mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Upcoming Activities & Events</h3>
            <p className="text-gray-700 mb-4">Join local eldercare events, group activities, and informational webinars. Stay connected and engaged!</p>
            <button onClick={handleViewEvents} className="bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#0056b3] transition-colors duration-300">View Events</button>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg lg:col-span-2 mt-8 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Blogs</h2>

          <div className="tabs-container mb-8">
            {['Top', 'Trending', 'Latest'].map((tab) => (
              <button
                key={tab}
                onClick={handleTabClick}
                className={`tab-item ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#0056b3] transition-colors duration-300">
            Create New Blog
          </button>
        </div>
        <div className="flex items-center mb-6">
          <input
            type="text"
            value={searchKeyword}
            onChange={handleSearch}
            placeholder="Search Blogs..."
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:border-gray-500"
          />
          <button onClick={handleSearch} className="bg-[#007bff] text-white ml-4 px-4 py-2 rounded-md hover:bg-[#0056b3] transition-colors duration-300">Search</button>
          <button onClick={handleResetSearch} className="bg-[#95a5a6] text-white ml-2 px-4 py-2 rounded-md hover:bg-[#6f797a] transition-colors duration-300">Reset</button>
        </div>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((blog) => <SingleBlog key={blog.id} blog={blog} />)
          ) : (
            blogsGroupedByTags[activeTab]?.map((blog) => <SingleBlog key={blog.id} blog={blog} />) || []
          )}
        </div>
      </div>

      {/* Elder Care Videos Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg lg:col-span-1 mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Elder Care Videos</h2>
        {error ? (
          <p className="text-red-500">Error fetching videos: {error}</p>
        ) : (
          <div className="video-scroll-container max-h-[50vh] overflow-y-auto">
            {videos.map(video => (
              <div key={video.id} className="bg-white shadow-md p-4 rounded-md mb-4 hover:shadow-lg">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mb-2 rounded-md">
                </iframe>
                <h4 className="text-lg font-semibold text-gray-800">{video.snippet.title}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Community Chat Modal */}
      {showCommunityChatModal && (
        <ModalAct onClose={handleCloseModal}>
          <div className="p-6 overflow-y-auto max-h-[60vh] mt-12">
            <h2 className="text-3xl font-bold mb-4">Community Chat</h2>
            <p className="text-gray-700 mb-6">
              Welcome to the community chat! Engage with other elder care members, share your experiences, and provide mutual support.
              Remember to be respectful and keep the discussions friendly.
            </p>

            {/* Message List */}
            <div className="bg-gray-100 p-4 rounded-md mb-6 shadow-md overflow-y-auto max-h-60" id="messageList">
              {messages.map((message, index) => (
                <p key={index} className="text-gray-600 mb-2 italic">
                  💬 "{message.text}" - {message.user}{" "}
                  <span className="text-sm text-gray-400">[{message.time}]</span>
                </p>
              ))}
            </div>

            {/* Input Section */}
            <textarea
              placeholder="Type your message..."
              className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:outline-none focus:border-gray-500"
              rows="4"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center">
              <button
                onClick={handleSendMessage}
                className="bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#0056b3] transition-all"
              >
                Send Message
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-[#95a5a6] text-white px-4 py-2 rounded-md hover:bg-[#6f797a] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </ModalAct>
      )}

      {/* Events Modal */}
      {showEventsModal && (
        <ModalAct onClose={handleCloseModal}>
          <div className="p-6 overflow-y-auto max-h-[60vh] mt-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Activities & Events</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
                <img src={EventOneImage} alt="Mental Wellness Webinar" className="rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">Webinar on Mental Wellness for Elders</h3>
                <p className="text-gray-700 mb-4">June 15, 2024 - Learn techniques to promote mental wellness and enhance the quality of life for elders.</p>
                <button onClick={() => handleRegisterEvent('Webinar on Mental Wellness for Elders')} className="bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#0056b3] transition-all">Register for this Event</button>
              </div>
              <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
                <img src={EventTwoImage} alt="Local Park Walk" className="rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">Local Park Walk & Talk</h3>
                <p className="text-gray-700 mb-4">July 2, 2024 - Join us for a relaxing walk in the local park. Enjoy nature and connect with fellow community members.</p>
                <button onClick={() => handleRegisterEvent('Local Park Walk & Talk')} className="bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#0056b3] transition-all">Register for this Event</button>
              </div>
              <div className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">Community Caregiver Support Meeting</h3>
                <p className="text-gray-700 mb-4">July 20, 2024 - Meet other caregivers, share your experiences, and find support among the community.</p>
                <button onClick={() => handleRegisterEvent('Community Caregiver Support Meeting')} className="bg-[#007bff] text-white px-4 py-2 rounded-md hover:bg-[#0056b3] transition-all">Register for this Event</button>
              </div>
            </div>
            <div className="flex justify-end items-center mt-6">
              <button onClick={handleCloseModal} className="bg-[#95a5a6] text-white px-4 py-2 rounded-md hover:bg-[#6f797a] transition-all">Close</button>
            </div>
          </div>
        </ModalAct>
      )}

      {showCreateForm && (
        <CreateBlog
          onSubmit={handleCreateBlog}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default BlogPage;