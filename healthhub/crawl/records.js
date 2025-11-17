const { MongoClient } = require('mongodb');

const records = [
  { userEm: "quentinchin010912@gmail.com", Disease: "Cold", Symptoms: "Runny nose, sore throat", Medications: "Rest, fluids", Duration: "5", Hospital: "City Hospital", Clinic: "Downtown Clinic" },
  { userEm: "quentinchin010912@gmail.com", Disease: "Asthma", Symptoms: "Shortness of breath, wheezing", Medications: "Inhalers", Duration: "Indefinite", Hospital: "Respiratory Hospital", Clinic: "Pulmonary Clinic" },
  { userEm: "quentinchin010912@gmail.com", Disease: "Diabetes", Symptoms: "Increased thirst, frequent urination", Medications: "Insulin", Duration: "Lifetime", Hospital: "Endocrine Hospital", Clinic: "Diabetes Clinic" },
  { userEm: "quentinchin010912@gmail.com", Disease: "Hypertension", Symptoms: "High blood pressure", Medications: "ACE inhibitors", Duration: "Lifetime", Hospital: "Cardiac Hospital", Clinic: "Heart Clinic" },
  { userEm: "777777777@gmail.com", Disease: "Migraine", Symptoms: "Severe headache, nausea", Medications: "Triptans", Duration: "Variable", Hospital: "Neurology Hospital", Clinic: "Headache Clinic" },
  { userEm: "777777777@gmail.com", Disease: "Arthritis", Symptoms: "Joint pain, stiffness", Medications: "NSAIDs", Duration: "Lifetime", Hospital: "Orthopedic Hospital", Clinic: "Joint Clinic" },
  { userEm: "777777777@gmail.com", Disease: "COVID-19", Symptoms: "Fever, cough, shortness of breath", Medications: "Supportive care", Duration: "14", Hospital: "Infectious Disease Hospital", Clinic: "COVID Clinic" },
  { userEm: "777777777@gmail.com", Disease: "Pneumonia", Symptoms: "Cough, chest pain", Medications: "Antibiotics", Duration: "10", Hospital: "Pulmonary Hospital", Clinic: "Lung Clinic" }
];

/**
 * seedRecords function
 * Seeds the records collection in MongoDB with predefined record data.
 */
async function seedRecords() {
  const url = 'mongodb+srv://2315902845:6gK61uB8xsMvhYpq@cluster0.5b8hk.mongodb.net/Healthhub';
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('records');

    // Insert the predefined record data
    const result = await collection.insertMany(records);
    console.log(`${result.insertedCount} records inserted`);
  } catch (error) {
    console.error('Error inserting records:', error);
  } finally {
    await client.close();
  }
}

seedRecords();

// node healthhub/crawl/records.js