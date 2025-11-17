const { MongoClient } = require('mongodb');

const blogs = [
  {
    id: 1,
    title: "Empowering Nurses: Unlocking Opportunities",
    content: "We offer a wide array of growth opportunities and comprehensive training programs designed to empower nurses and help them reach their full potential in the healthcare industry. Our commitment to professional development ensures that nurses are equipped with the skills and knowledge necessary to excel in their roles.",
    author: "Healthhub Team",
    publication_date: "2024-06-10",
    tag: "latest"
  },
  {
    id: 2,
    title: "Home Nursing Services",
    content: "Our home nursing services provide personalized care solutions tailored to meet the unique needs of each individual. From elderly assistance to post-operative care, our skilled team of nurses delivers compassionate support that promotes well-being and dignity in the comfort of your own home.",
    author: "Grace Williams",
    publication_date: "2024-06-10",
    tag: "latest"
  },
  {
    id: 3,
    title: "Inspiring Future Nurses",
    content: "Embarking on a nursing career is a transformative journey filled with opportunities for personal and professional growth. By inspiring and supporting aspiring nurses, we aim to cultivate a new generation of healthcare professionals who are dedicated to making a positive impact on the lives of others.",
    author: "John Doe",
    publication_date: "2024-05-03",
    tag: "latest"
  },
  {
    id: 4,
    title: "Patient-Centric Approach",
    content: "At Healthhub, we prioritize a patient-centric approach to healthcare delivery, ensuring that each individual receives personalized care that is tailored to their specific needs and preferences. Our flexible scheduling options and attentive staff guarantee timely and compassionate support for all our patients.",
    author: "Emily Johnson",
    publication_date: "2024-05-03",
    tag: "latest"
  },
  {
    id: 5,
    title: "Home Nursing Services",
    content: "Our home nursing services offer comprehensive care solutions that allow individuals to recover comfortably in familiar surroundings. With skilled nurses providing round-the-clock support, patients can rest assured that their well-being is our top priority.",
    author: "Michael Smith",
    publication_date: "2024-05-03",
    tag: "trending"
  },
  {
    id: 6,
    title: "Inspiring Future Nurses",
    content: "Through our outreach programs, we aim to inspire and educate students about the fulfilling and rewarding nature of a career in nursing. By sharing our experiences and insights, we hope to ignite a passion for nursing in the hearts of the next generation of healthcare professionals.",
    author: "Samantha Brown",
    publication_date: "2024-05-03",
    tag: "trending"
  },
  {
    id: 7,
    title: "Patient-Centric Approach",
    content: "Our patient-centric approach emphasizes immediate access to high-quality care in the comfort of one's home. With a focus on convenience and compassion, we strive to ensure that patients receive the support they need, when they need it most.",
    author: "Daniel Wilson",
    publication_date: "2024-05-03",
    tag: "trending"
  },
  {
    id: 8,
    title: "The Role of Telehealth in Modern Nursing",
    content: "Telehealth plays a vital role in modern nursing by enabling remote consultations and healthcare delivery. Our nurses leverage telehealth platforms to connect with patients, provide expert advice, and maintain a personal connection that transcends physical boundaries, ensuring continuity of care and support.",
    author: "Olivia Davis",
    publication_date: "2024-05-03",
    tag: "top"
  },
  {
    id: 9,
    title: "Mental Health Support for Nurses",
    content: "Mental health is a critical aspect of nursing practice, and our support programs are designed to help nurses manage stress, prevent burnout, and promote well-being. By fostering a supportive community and implementing effective strategies, we empower nurses to prioritize their mental health and thrive in their profession.",
    author: "Benjamin Lee",
    publication_date: "2024-05-03",
    tag: "top"
  },
  {
    id: 10,
    title: "The Impact of Cultural Competence in Nursing",
    content: "Cultural competence is essential in nursing practice as it enables healthcare providers to deliver culturally sensitive and respectful care to diverse populations. By honoring cultural traditions and integrating cultural competence into care practices, nurses can build trust, enhance communication, and improve health outcomes for all individuals.",
    author: "Sophia Martinez",
    publication_date: "2024-05-03",
    tag: "top"
  },
];

/**
 * seedBlogs function
 * Seeds the blogs collection in MongoDB with predefined blog data.
 */
async function seedBlogs() {
  const url = 'mongodb+srv://2315902845:6gK61uB8xsMvhYpq@cluster0.5b8hk.mongodb.net/Healthhub';
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('blogs');

    // Insert the predefined blog data
    const result = await collection.insertMany(blogs);
    console.log(`${result.insertedCount} blogs inserted`);
  } catch (error) {
    console.error('Error inserting blogs:', error);
  } finally {
    await client.close();
  }
}

seedBlogs();