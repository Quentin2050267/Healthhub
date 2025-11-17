# Important Links

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/eD9oPTLm)


<!-- ## Preliminary Website Introduction & Frontend Design

The preliminary website introduction and frontend design can be viewed in the following documents:

- [Step 1 Design (PPTX)](step1design.pptx)
- [Design Figma (PDF)](DesignFigma.pdf) -->

# HealthHub: A website caring for the elder

<p align="left">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white" alt="GraphQL"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
</p>

## Overview

Our website is designed to assist elderly individuals in managing their healthcare needs with ease and efficiency. It provides a user-friendly platform where seniors can do lots of things including but not limited to managing their past disease history, making hospital appointments, reading interesting blogs and videos, and leveraging cutting-edge natural language processing (NLP) technology to make things easier.

## Contents

- [General](#general)
- [Implementation](#implementation)
- [Misc Software Engineering Aspect](#misc-software-engineering-aspect)
- [Novel Features](#novel-features)
- [Contributors](#contributors)
- [Presentation](#presentation)

## General

### Problem Statement

The aging population issue is becoming increasingly severe and widespread. For example, in Shanghai, by the end of 2023, the number of registered residents aged 60 and above reached **5.68 million**, accounting for **37.4%** of the total population. Consequently, addressing **digital aging** has become increasingly urgent. Unfortunately, elderly people are frequently neglected, facing barriers in accessing the healthcare resources they need, while the healthcare needs of the elderly are often complex, requiring **easy access to medical information and services**. The challenge lies in providing a **user-friendly platform** that integrates various functionalities to assist them, ensuring they receive the support and attention they deserve. The challenges involved in solving this problem include ensuring **accessibility** for elderly individuals with limited technological proficiency, integrating **multiple healthcare services** into one cohesive platform, providing **personalized healthcare recommendations** using advanced technologies like **Natural Language Processing (NLP)** and **data analytics**, protecting **sensitive medical information** and ensuring compliance with healthcare regulations, and designing a system that can **scale** to accommodate a growing number of users and increasing amounts of data.

### Solution Overview

**HealthHub** addresses these issues by offering a cohesive platform where elderly users can search for hospitals, make appointments, and access online consultations, use **NLP for simplified interactions**, manage **medical records**, and get involved in the **community**. This solution aims to reduce the complexity and improve accessibility to healthcare services.

Also, we verified the **long-term relevance and innovation in elderly healthcare solutions**. Firstly, the problem of providing **accessible and comprehensive healthcare services** to the elderly will remain relevant for the foreseeable future. As the global population ages, the demand for **efficient and user-friendly healthcare solutions** will continue to grow. By focusing on **scalability**, **open-source contributions**, and modern technologies like **Node.js**, **MongoDB**, and **GraphQL**, this project aims to stay useful and relevant in the next **2, 5, and even 10 years**. Continuous improvement through **regular updates** and **user feedback** will ensure ongoing enhancement. 

Nevertheless, we plan to **integrate AI** more deeply to handle more tasks and improve functionality. Managing and analyzing **healthcare data** will provide valuable insights, helping improve healthcare services. Future plans include implementing an **administrator system** to manage users, appointments, and content more effectively, as well as allowing users to **update their profiles**, including personal information and preferences.

### Competition Analysis

#### Similar Products

1. **LinkOlder**: A comprehensive platform providing services such as finding nursing homes, offering online courses for seniors, health management, and home-based care. It focuses on delivering a seamless cloud-based elderly care experience.
2. **National Elderly Health Education Service Platform**: This platform offers tailored health guidance and management services for institutions and elderly individuals. It emphasizes training and certifying elderly health instructors, promoting health education, and providing resources on nutrition, exercise, mental health, and disease prevention.
3. **Shanghai Elderly Care Service Platform**: Hosted by the Shanghai Civil Affairs Bureau, this platform provides information about elderly care services, including nursing homes and home-based elderly care. However, it does not provide detailed information about hospitals.

The above platforms primarily focus on elderly care services, especially those centered around nursing homes and related facilities. While these services are undoubtedly important, with the development of technology and increasing internet accessibility, more elderly individuals are turning to online platforms. Our goal is to empower them to independently search for disease-related information, access medical consultation channels, and connect with peers for better community interaction.

#### Differentiation

The detailed differentiations are as follows:

1. **Targeted User Base and Use Cases**: HealthHub is specifically designed to meet the healthcare needs of the elderly, focusing particularly on addressing their needs for disease-related information and medical care. The platform’s features and user interface are carefully tailored to ensure accessibility and ease of use for elderly individuals.
2. **Specialized Chatbot**: Utilizing advanced Natural Language Processing (NLP) technology, HealthHub features a chatbot trained on 32 research papers from the National Health Commission (NHC) covering elderly diseases such as Alzheimer's Disease, Dementia, Parkinson's Disease, and Cardiovascular Diseases. This specialized training ensures users receive accurate, relevant, and easy-to-understand information, empowering them to better manage their health conditions.
3. **Comprehensive One-Stop Service**: HealthHub provides an integrated platform that offers a wide range of functionalities, including:
    - **Disease Information**: Access to detailed resources and guides for understanding various health conditions.
    - **Hospital Appointment Scheduling**: Seamless booking of healthcare appointments.
    - **Online Consultations**: Virtual consultations with medical professionals.
    - **Medication and Treatment Management**: Digital records of prescriptions and treatment plans post-appointment.
    - **Community Engagement**: A dedicated space for the elderly to share experiences, find information about caregiving activities, and offer mutual support.

Overall, **HealthHub** aims to deliver a holistic solution that addresses the diverse and multifaceted healthcare needs of the elderly, setting itself apart from competitors in the market.

### Legal Aspects

This project is intended to be open-source. By making the source code available to the public, we encourage collaboration and contributions from the community. Contributors are welcome to fork the repository, submit pull requests, and report issues. Please ensure that any contributions adhere to the project's coding standards and guidelines.

### Attribution

This project uses Express, Apollo Server Express, MongoDB, Bcrypt, Nodemailer, Axios, Selenium WebDriver, BeautifulSoup4, TQDM, and all the other third-party APIs.

## Implementation

### System Architecture

Firstly, the major components of our website is shown in the diagram, and we will go deeper into both font-end and back-end architecture in the following part.

![*diagram of major components*](https://github.com/user-attachments/assets/5eb92c7c-8655-409b-a2f1-5a206b720320)

### Front-end Architecture

- **Framework**: React
    - The front-end of the application is built based on React, a popular JavaScript library for building user interfaces. React allows for the creation of reusable components, making the development process more efficient and the codebase easier to maintain.
- **Chatbot**: ChatUI
    - The application uses ChatUI, a component library developed by Alibaba, to build the user interface for the chatbot. ChatUI provides a set of customizable components that make it easy to create a conversational interface.
- **Icons**: Font Awesome, React Icons
    - The application uses Font Awesome and React Icons libraries to provide a wide range of icons. These icons enhance the visual appeal and usability of the application by providing intuitive visual cues for various actions and features.
- **Style**: Tailwind CSS
    - Tailwind CSS is used for partially styling the application. It is a utility-first CSS framework that allows for rapid UI development with a consistent design system.

### Back-end Architecture

- **Server**: Node.js
    - The back-end server is built using Node.js, a JavaScript runtime that allows for the development of scalable and high-performance applications. Node.js is well-suited for handling asynchronous operations and real-time data processing.
- **Framework**: Express
    - Express is used as the web framework for Node.js, providing a robust set of features for building web and mobile applications. It simplifies the process of setting up routes, handling requests, and managing middleware.
- **GraphQL**: Apollo Server
    - The application uses Apollo Server to implement GraphQL, providing a flexible and efficient way to query and manipulate data. GraphQL allows clients to request exactly the data they need, reducing over-fetching and improving performance.
- **Third-party APIs**:
    - **Custom ChatBOT API**: The application integrates Chatgpt services using Custom ChatBOT API from *Rapid*, which is a website having a collection of APIs. This allows for advanced text processing capabilities, such as chatbot interactions.
    - **Google Maps API**: Our application integrates the *Google Maps API* to display hospital locations, enabling users to find nearby healthcare facilities. This is achieved by utilizing the Places API's Nearby Search feature, which allows searching for places within a specified area.
    - **Google Authentication**: We implement *Google Authentication* to allow users to log in using their Google accounts. This is facilitated through Google's OAuth 2.0 protocol, which manages the authentication and authorization process.
    - **Tencent Cloud**: The application leverages Tencent Cloud's APIs to build an online consultation platform. Both doctors and users can register on the platform, and upon successful registration, their IDs are matched to initiate video consultations. Through high-quality video streams, they can engage in real-time medical consultations.
   - **YouTube API**: The application utilizes the YouTube API to recommend healthcare-related videos to users, particularly seniors, to enhance their understanding and engagement with health topics.  
   - **China Internet Association's Elderly-Friendly Toolbar**: We use it to provide accessible reading services and also customize the toolbar to better suit our English-language context.  
- **HTTP Client**: Axios
    - Axios is used for making HTTP requests to external APIs and services. It provides a simple and easy-to-use interface for sending asynchronous requests and handling responses.

### Data Architecture

- **Data Source**: Web Scraping with Python and open source dataset NHC
data sources contain formatted text, unformatted text, numerical values, images, geographical location information for disease info, hospital info, department info,etc.
- **Database**: MongoDB Atlas
    - MongoDB Atlas is used as the database for storing application data. It is a cloud-based NoSQL database that provides flexibility in data modeling and scalability. MongoDB is well-suited for handling large volumes of data and complex queries.


### Installation and Setup

1. Clone the repository:
    
    ```bash
    git clone <https://github.com/IT5007-2410/course-project-group-1.git>
    
    ```
    
2. Go to the project root directory:
    
    ```bash
    cd course-project-group-1/healthhub
    
    ```
    
3. From the root directory of the project, install dependencies:
    
    ```bash
    npm install
    
    ```
    
4. Start the project:
    
    ```bash
    npm start
    
    ```
    

*Important Note: To experience the full functionality of the application, please start the application **outside** of the campus network, as MongoDB Atlas seems to block the school's IP.*

### Setup Scripts

This project includes several setup scripts to automate various tasks such as database seeding, data translation, and web scraping. These scripts help streamline the setup process and ensure that the necessary data is available for the application to function correctly.

### Database Seeding

The database seeding scripts populate the MongoDB database with initial data for hospitals, blogs, and records. These scripts are located in the `scripts` directory.

- **blogs.js**: Seeds the `blogs` collection with predefined blog data.
    
    ```bash
    node crawl/blogs.js
    
    ```
    
- **records.js**: Seeds the `records` collection with predefined record data.
    
    ```bash
    node crawl/records.js
    
    ```
    

### Web Scraping

The web scraping script scrapes hospital data from a specified website and inserts it into the database.

- [**crawl.py**](http://crawl.py/): Scrapes hospital data and inserts it into the `hos` and `img` collections.
    
    ```bash
    python crawl/crawl.py
    
    ```
    
- **hos_data_process.ipynb**: Excute the notebook code to preprocess the data.

### Data Translation

The data translation script translates hospital data from Chinese to English and inserts the translated data into the database.

- [**translate-py.py**](http://translate-py.py/): Translates hospital data and inserts it into the `hospital_en` collection.
    
    ```bash
    python crawl/translate-py.py
    
    ```
    

*Note: The setup scripts can be excuted only if you have Python environment and have access to the cloud-based Mongodb database. Usually you don't have to excude these codes since we have already processed the data and put it into cloud database.*

<!-- ## Running the Project
*[Provide details on how to start the front-end and back-end servers.]* -->

### Configuration

Set up .env file in the root directory with necessary environment variables such as API keys and database URIs.

### Usage Guide

To provide a better understanding of the application's functionality, here are some visuals showcasing the main user flows and features:

- **Home Page**: Displays a welcoming message and a navigation to the services provided.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/c9b8e8b2-00da-4df0-a494-344296993214">

- **Login Page**: Allows users to log in using their email and password or via Google authentication.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/d362fdd1-cc6e-46a0-a782-037fe2b835e3">

- **Signup Page**: Enables new users to create an account by providing their personal information and verifying their email.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/9dcba2c1-bf98-4dca-9493-46b6f08ff580">

- **Hospital Page**: Allows users to search for hospitals and view details about each hospital.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/0eb55073-e4d9-47fd-a0a6-d79c5bc2b6fa">

- **Hospital Detail Page**: Provides detailed information about a specific hospital, including its services and contact information.
   - detailed info part
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/1f898bb0-3f2c-4c5b-a6ff-687d20201d64">

   - appointment part
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/edc2fd2c-2f14-428e-9b2a-45b87cf5c2e6">

   - online consultant part
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/82327c83-76e4-4eec-a04f-3bd5de1bb0d3">

- **Record Page**: Allows users to manage their electronic medical records, including viewing, adding, and updating their health information.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/12b3b904-6eef-4d8d-9adf-68448b85b9a8">

- **Community Page**: Users can write down what they want and register the community events and also search for blogs and watch videos to keep updated with the latest healthcare information.
   - community chats part
    <img width="1470" alt="image" src="https://github.com/user-attachments/assets/d389bc7f-f7d4-4b5a-bb18-dbdfd3cd127c">
    
   - activities part
     <img width="1470" alt="image" src="https://github.com/user-attachments/assets/f4d18b7b-3138-4ada-a135-138bbd6c71d0">

   - blogs & video part
    <img width="1470" alt="image" src="https://github.com/user-attachments/assets/a647103b-0a0b-4040-9e28-1e709bd62df0">
    
- **Blog Detail Page**: Provides detailed information about a specific blog post.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/2b9bc76e-f707-409f-bf62-4749b2f35bb0">

- **About Page**: Offers information about the application, its mission, and the team behind it.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/4f98f4cc-056c-4323-8459-5481d5703a75">

- **Chatbot**: Provides an interactive chatbot for users to get instant assistance and information about healthcare services.
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/20726fa0-604d-4b77-8b27-30ced533888e">

- **Reading Assistance**: Provide accessible reading services for elderly users, allowing them to zoom in and out, tap-to-read, continuous reading, and change the web theme colors.
- <img width="1470" alt="image" src="https://github.com/user-attachments/assets/c5517e70-ac44-4aa9-a4d7-b096cad3aa7b">

### Navigation

The application is designed with a user-friendly navigation structure to ensure easy access to all features:

- **Home**: The landing page that provides an overview of the application and its services.
- **Login**: A page where existing users can log in to their accounts.
- **Signup**: A page for new users to create an account.
- **Record**: A page for managing electronic medical records, allowing users to view, add, and update their health information.
- **Hospitals**: A page where users can search for hospitals and view details about each hospital.
- **Hospital Detail**: A detailed view of a specific hospital, including its services and contact information. Services include appointment scheduling and video consultations.
- **Community**: A page where users can write down what they want, register for community events, search for blogs, and watch videos to keep updated with the latest healthcare information.
- **Blog Detail**: A detailed view of a specific blog post.
- **About**: A page that provides information about the application and its mission.
- **Verify Email**: A page where users can verify their email address after signing up.


## Misc Software Engineering Aspect

### Form Validation and Usability

- **Real-time Validation**: Input fields are validated in real-time to provide immediate feedback to users. For example, email fields check for valid email formats, and password fields ensure that passwords meet the required criteria.
- **Error Messages**: Clear and concise error messages are displayed to guide users in correcting their inputs. These messages are positioned near the relevant input fields for better visibility.
- **Required Fields**: Mandatory fields are clearly marked with an asterisk (*) to indicate that they must be filled out before submitting the form.
- **Password Visibility Toggle**: Password fields include a toggle option to show or hide the password, allowing users to verify their input easily.
- **Confirmation Messages**: Upon successful form submission, users receive confirmation messages to inform them that their data has been processed correctly.
- **Accessibility**: The forms are designed to be accessible, with clear labeling and focus management to support users with disabilities.

### Documentation and Code Structure

### Key Modules

- **server**: Contains the core server-side code for the application. It includes the following key files and their functionalities:
    - **db.js**: Manages MongoDB connection and retrieval.
    - **server.js**: Sets up Express and Apollo GraphQL servers, defines API endpoints and resolvers.
    - **api.js**: This file defines the API routes for the application. It uses Express to set up various endpoints that handle different functionalities.
    - **schema.graphql**: This file defines the GraphQL schema for the application. It includes type definitions, queries, and mutations that outline the structure of the data and the operations that can be performed on it.
    - **controllers**: Handles various functionalities like user authentication, appointment management, and email verification.
        - **loginController.js**: Manages user login.
        - **signupController.js**: Handles user signup and email verification.
        - **verifyEmailController.js**: Verifies emails and inserts new users.
        - **appointmentController.js**: Manages appointments.
        - **botController.js**: Interacts with the chatbot API.
- **crawl**: This directory contains data processing scripts and scripts for inserting data into the database.
    - **translate-py.py**: This script translates hospital data and inserts it into the database. It processes the data to ensure it is correctly formatted and then stores it in the appropriate collections.
    - **blogs.js**: This script seeds the `blogs` collection with predefined blog data. It ensures that the initial set of blog posts is available in the database for users to read.
    - **records.js**: This script seeds the `records` collection with predefined record data. It populates the database with initial medical records to facilitate testing and development.
- **public**: This directory contains static files that are served directly by the web server.
    - **index.html**: The main HTML file that serves as the entry point for the React application. It includes the root `<div>` where the React components are rendered.
    - **.svg & .ico**: These files include various icons and images used throughout the application, such as the favicon and logo.
    - **canyou**: This directory contains the resources and assets for the Accessibility Toolbar. The Accessibility Toolbar provides various accessibility features to enhance the user experience, especially for elder users with disabilities.
- **src**: This directory contains the source code for the front-end of the application. The key subdirectories and files include:
    - **assets**: Contains static assets such as images used in the application.
    - **components**: Contains reusable React components that are used throughout the application. These components help in building the user interface in a modular and maintainable way.
    - **contexts**: Contains context providers for managing global state and providing context to various parts of the application. Mainly include:
        - **AuthContext.js**: Manages authentication state, including user login, logout, and state persistence.
    - **pages**: Contains the main page components for the application. Each file in this directory represents a different page or view in the application, such as the home page, login page, signup page, etc. The specific functionalities of each file are detailed in the code comments.
    - **styles**: Contains CSS files for styling the application.
    - **App.js**: The root component of the application. It sets up the main structure of the application and includes the routing logic.
    - **index.js**: The entry point for the React application. It renders the root component (`App.js`) into the DOM and sets up the React application.

### Modularization

The code is organized into reusable components:

- **Controllers**: Handle specific functionalities like authentication and appointments.
- **Database Module**: Centralizes database connection logic.
- **Scripts**: Standalone scripts for data processing tasks.
- **Libraries**: Common dependencies are clearly defined and imported.

### Code Originality
In developing our project, we referenced the [Nacto-Care](https://github.com/Nactore-Org/Nacto-Care) repository and its implementation, which can be viewed on their website at [nacto-care.vercel.app](https://nacto-care.vercel.app/).

While we utilized Nacto-Care's frontend framework as a foundation, the majority of the content and features were designed and developed independently, tailored specifically to our project's unique **user targets** and **use cases**. We made substantial customizations and enhancements to the original framework, ensuring it aligns with the specific needs and requirements of our application.

Leveraging the foundational code from Nacto-Care allowed us to accelerate the development process. However, it is important to note that our project stands on its own with significant original contributions and improvements.


## Novel Features

### Front-end Features

1. **Animations**: The front-end includes smooth animations to enhance the user experience. These animations are implemented using CSS and JavaScript libraries, providing visual feedback and improving the overall aesthetics of the application.For example, all clickable elements across the application have transition effects to ensure a smoother and more responsive user experience.
2. **Routing**: React Router is used for client-side routing, allowing for seamless navigation between different pages and components. This improves the user experience by providing a single-page application feel. We use `createBrowserRouter` and `createRoutesFromElements` methods to define the application's routes. Each route maps to a specific component, such as Home, Login, Signup, Hospitals, Community, etc. We also use the `PrivateRoute` component to protect certain routes, ensuring that only authenticated users can access these pages. Additionally, we handle 404 error pages, displaying a friendly error message when users navigate to a non-existent page.
3. **Responsive Design**: The application is designed to be responsive, ensuring that it works well on various devices and screen sizes. This is achieved using CSS media queries and flexible grid layouts. For example, in the `About` page, the layout adjusts based on the screen size:
    - On larger screens, the feature blocks are displayed in a row with equal spacing.
    - On smaller screens (max-width: 768px), the feature blocks stack vertically and center-align to ensure readability and usability.
    - The CSS media queries ensure that the width and height of the feature blocks adjust accordingly to provide an optimal viewing experience on all devices.
4. **File Interactions**: The application includes a comprehensive record management system that allows users to manage their medical records. Users can add new records, search for existing records, import records from CSV files, export records to CSV files, and download a CSV template for importing records. This functionality ensures that users can easily maintain and access their medical history, providing a seamless experience for managing healthcare information.
5. **Real-time Search**: The application supports real-time search functionality. As users type in the search box, the results are updated instantly, providing a seamless and interactive search experience. This feature is implemented in various parts of the application, including the hospital search, blog search and record search functionalities.
6. **Reading Accessibility**: We have introduced accessibility settings in the assistive toolbar, specifically designed to cater to the needs of elderly users and enhance their digital experience. With the font enlargement feature, seniors can easily **adjust text size** to suit their vision, reducing reading difficulties and minimizing eye strain. The **color adjustment** option improves text visibility, especially for users with color sensitivity or visual impairments. The **text-to-speech** functionality converts written content into audio, making information more accessible for those with severe vision issues or challenges with prolonged reading. Additionally, **the display magnification** feature allows users to zoom in on specific areas for better clarity and precise interaction. This aligns perfectly with the target audience of our website: the elderly. Therefore, we can confidently say that our system design is user-friendly, inclusive, and practically meaningful(in the toolbar after clicking the `Assistive` button).

### Back-end Features

<!-- - **Database Integration**: The back-end integrates with MongoDB to store and manage application data. This includes user information, medical records, appointment details, and more. The database is designed to be scalable and efficient, handling large volumes of data with ease. -->

1. **NLP Integration**: The application integrates with third-party NLP APIs to provide advanced text processing capabilities, which includes chatbot interactions. Our chatbot is primarily used for robotic medical consultations, engaging with users in a professional manner to diagnose potential health conditions and provide solutions. The detailed implement explanation are as follows:
    1. **Creating the Chatbot with the API**: First, we use the API to create a custom robot tailored to our needs.
    2. **Configuring LLM Settings**:
        - We set the **maximum response length** to 1024 tokens to ensure comprehensive but concise answers.
        - For the **identity prompt**, we define the chatbot’s role as: *“A doctor specializing in elderly healthcare, focusing on reliable medical knowledge to provide disease diagnosis, psychological comfort, and guidance tailored to elderly patients.”*
        - To ensure the responses are accurate and reliable, we set the **temperature** to 0.30 (as shown in the attached figure). This keeps the chatbot’s creativity low, making responses more deterministic and focused on factual information.
        - Additionally, we adjust other parameters, such as context allocation, to prioritize **knowledge base (20%)** and **short-term memory (65%)**, allowing the chatbot to leverage both existing and contextual knowledge effectively.
    3. **Training with a Custom Knowledge Base**:
        
        We train the chatbot using a custom knowledge base containing supplementary materials. These materials are derived from the **National Health Commission’s (NHC)** top-searched academic papers on 16 common diseases. This ensures that the chatbot provides precise, evidence-based responses, enhancing its capability to assist users with reliable medical information and tailored advice for elderly healthcare.
        
2. **Chatbot and Webpage Integration:** Our chatbot is seamlessly integrated with the website to enhance functionality and user experience. It can access the database to recommend suitable hospitals, guide users through page functionalities with rule-based dialogues, and provide navigation links. Additionally, the chatbot supports voice input through speech recognition, enabling more convenient interactions. This integration combines advanced natural language processing, real-time database queries, and voice recognition technologies, ensuring an intelligent and user-friendly experience. *While the chatbot leverages state-of-the-art NLP AI models, users are advised to verify the accuracy of the information provided.*
3. **Multiple API Integrations**: Our application integrates several third-party APIs, including Custom ChatBOT API for advanced text processing, Google Maps API for displaying hospital locations, Google Authentication for secure user login, Tencent Cloud for online video consultations, and YouTube API for recommending healthcare-related videos. These integrations enhance the application's functionality and provide a seamless user experience.
4. **Authentication and Authorization**: The back-end includes robust authentication and authorization mechanisms to ensure the security of user data. When users are not logged in, they can only access the homepage. Attempting to use other features will automatically redirect them to the login page, ensuring that only authenticated users can access the full functionality of the website. The website supports two login methods:
    1. **Google API Login**: Users can log in using their Google accounts, leveraging Google's secure OAuth 2.0 protocol for authentication and authorization.
    2. **Email and Password Registration**: Users can register an account using their email and password. To enhance security and prevent password leakage by administrators, passwords are encrypted using industry-standard hashing algorithms, ensuring safe usage for users. Additionally, the website includes OTP (One-Time Password) verification to prevent unauthorized email registrations, adding an extra layer of security to the registration process.
5. **Reliable Data Scource:** To ensure the authenticity of recommendations and the usefulness of the website, the data comes from crawling multiple websites and multiple authoritative databases, and the data dimensions are very diverse.
    1. **Disease-Related**:
        
        Based on the classification methods provided by online medical encyclopedias, we categorized diseases using a "secondary department" approach. The primary categories include **Internal Medicine, Surgery, Dermatology & Venereology, Orthopedics, Otorhinolaryngology**, and **Others**, resulting in six main groups. Each main group is further divided into 1-8 subcategories, encompassing common diseases. This categorization facilitates the subsequent retrieval of hospital information.
        
    2. **Hospital-Related**:
        
        We scraped nationwide hospital data from [www.guahao.com](https://www.notion.so/www.guahao.com), including details such as hospital names, descriptions, phone numbers, specific locations, provinces, reservation volumes, follower counts, and reviews. For certain well-equipped hospitals with high-quality specialty departments, we also collected information about their key specialties to recommend them to users based on disease information. For cases where department classifications were ambiguous, we employed semantic matching to align them with our disease categories, enabling the design of a "Specialty Department Navigation" feature.
        
        Additionally, the data underwent cleaning to address issues such as missing values for phone numbers, locations, and descriptions. Missing values represented by keywords like `none`, `not available`, `unknown`, `0`, and `<p>` were identified and replaced with `NA`. For hospital descriptions, specific measures were taken to handle truncated content and invalid characters like  `<p>`,`<br>`, and `\\0a`.
        
        The original hospital data often lacked geographic location fields and omitted the "city" field, which could hinder recommendations based on user-selected regions. To address this, we used Tencent Maps API to retrieve precise geographic and city information using hospital names and provinces. The requests were made via the `requests` library by sending GET requests to `https://apis.map.qq.com/ws/place/v1/search?` with the authorized key provided by Tencent Maps. The responses, returned in JSON format, were parsed to extract the "city" and "geographic location" information from the `cluster` or `data` fields.
        
    3. **NLP Fine-Tuning Related**:
        
        We referenced 32 research papers from the publicly available and authoritative **National Health Commission (NHC)**, focusing on elderly diseases. These diseases include:
        
        `["Arthritis", "Hypertension (High Blood Pressure)", "Heart Disease", "Diabetes", "Osteoporosis", "Chronic Obstructive Pulmonary Disease (COPD)", "Alzheimer's Disease", "Parkinson's Disease", "Cancer", "Chronic Kidney Disease", "Depression", "Hearing Loss", "Vision Disorders", "Stroke", "Influenza and Pneumonia", "Peripheral Artery Disease (PAD)"]`.
        
        This knowledge base served as a foundation for fine-tuning our NLP models, ensuring accurate and relevant results for elderly health-related queries.
        


