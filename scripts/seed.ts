const algoliasearch = require('algoliasearch');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

async function seedData() {
  try {
    console.log('🌱 Starting data seeding...');
    
    // Load sample data
    const homesData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/homes.json'), 'utf8'));
    const usersData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/users.json'), 'utf8'));
    const reviewsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/reviews.json'), 'utf8'));

    // Seed Homes
    const homesIndex = client.initIndex('Homes');
    await homesIndex.saveObjects(homesData);
    console.log(`✅ Seeded ${homesData.length} homes`);

    // Seed Users  
    const usersIndex = client.initIndex('Users');
    await usersIndex.saveObjects(usersData);
    console.log(`✅ Seeded ${usersData.length} users`);

    // Seed Reviews
    const reviewsIndex = client.initIndex('Reviews');
    await reviewsIndex.saveObjects(reviewsData);
    console.log(`✅ Seeded ${reviewsData.length} reviews`);

    console.log('🎉 All data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

seedData();
