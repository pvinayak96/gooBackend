const express = require('express');
const router = express.Router();
require('dotenv').config();

const {GoogleGenerativeAI,HarmCategory,HarmBlockThreshold} = require("@google/generative-ai");
  

router.post('/', async (req, res) => {
  console.log(req.body)
    let prompt = req.body.prompt;
    console.log('Input from user', prompt);
    try{
    const result = await run(prompt);
    res.json(result); 
    }
    catch (error) {
      console.error('Something went wrong!!', error);
      res.status(500).send('Internal Server Error'); // Handle error gracefully
    }
});

  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a trip advisor. Suggest best places and hotels according to the feedbacks. Do not ask about date of travel. Be straight to the point limiting response with particulars.",
  });
  
  const generationConfig = {
    temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
  
      history: [
        {
          role: "user",
          parts: [
            {text: "I want to travel to Munnar, Kerala. Suggest me good places to stay nearby"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I can definitely help you with that! Munnar is a beautiful place. To give you the best suggestions, I need a little more information about your preferences. Please tell me:\n\n* **What kind of experience are you looking for?**  Are you looking for a luxurious stay, a budget-friendly option, or something in between?\n* **What are your interests?**  Are you interested in nature, adventure, culture, or relaxation?\n* **What is your budget?** \n* **How many people will be traveling with you?**\n* **Do you have any specific dates in mind?**\n\nOnce I know a bit more about your preferences, I can suggest some specific places and hotels that will be perfect for your trip to Munnar. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "budget friendly cottage, relaxation, 4000 , 4 people, no specific dates"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, so you're looking for a budget-friendly cottage in Munnar for relaxation, with a budget of INR 4000 for 4 people. Here are some highly-rated options based on traveller reviews:\n\n**Within Munnar Town:**\n\n* **The Misty Mountain Resort:** This place offers cozy cottages, a serene atmosphere, and stunning views of the hills.  It has good reviews for its value, cleanliness, and friendly staff. You might find cottages within your budget.\n* **The Windflower Resort and Spa:** This resort has a range of accommodations, including cottages. It's known for its beautiful gardens, spa, and relaxing environment. Some cottages might be within your budget, especially during off-peak season.\n* **Greenwoods Resort:** Another option with budget-friendly cottages, Greenwoods Resort boasts a lush green environment. You can find clean and comfortable cottages at reasonable prices. \n\n**Near Munnar Town (Within 10-15 km):**\n\n* **The Cardamom County Resort:** Located in the scenic tea plantations, this resort offers a peaceful escape. Their cottages are known for their traditional architecture and beautiful views.  They often have special offers that might fit your budget.\n\n**Tips for Finding a Cottage Within Your Budget:**\n\n* **Check for discounts and offers:** Many resorts offer seasonal discounts, early bird discounts, or special packages that could save you money.\n* **Book in advance:** Booking your stay in advance can often give you better rates and help ensure you get the cottage you want.\n* **Travel during the off-season:**  Travelling during the off-season (typically April-May and September-October) can significantly reduce prices.\n\n**Beyond Hotels:**\n\n* **Airbnb or Homestays:**  Consider searching for cottages on Airbnb or booking a homestay in Munnar. This can be a more budget-friendly option and offers a more authentic experience.\n\n**Remember:**\n\n* Prices can fluctuate based on availability and the time of year.\n* It's always a good idea to read reviews before booking to get a better understanding of each property and its amenities. \n\nI hope these suggestions help you find the perfect relaxing cottage for your trip to Munnar! \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Also, best places to visit nearby. \n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Here are some fantastic places to visit near Munnar, perfect for a relaxing and scenic trip: \n\n**Within Munnar Town:**\n\n* **Mattupetty Dam and Lake:** Take a boat ride or enjoy the stunning views of the dam and the surrounding hills. \n* **Eravikulam National Park:** Hike through the park to spot the endangered Nilgiri Tahr, enjoy breathtaking views, and explore the unique flora and fauna.\n* **Tea Gardens:** Take a guided tour of a tea plantation to learn about the tea-making process and enjoy the panoramic views.\n* **Kundala Lake:** Take a leisurely walk around the lake or enjoy a boat ride amidst the scenic surroundings. \n* **Echo Point:** Marvel at the echoing sounds and enjoy the stunning vistas of the hills.\n* **Rose Garden:** Indulge in the vibrant colors and fragrances of various rose varieties.\n\n**Near Munnar (Within 20-30 km):**\n\n* **Top Station:** Enjoy panoramic views of the surrounding hills and valleys from the highest point on Munnar's scenic route.\n* **Devikulam:** Explore the serene Devikulam Lake, enjoy the beautiful scenery, and spot the unique Neelakurinji flowers (which bloom once in 12 years).\n* **Pothamedu Viewpoint:** Hike up to this viewpoint for breathtaking views of the valleys, tea gardens, and mountains. \n* **Cheeyappara Waterfalls:** Witness the cascading beauty of this waterfall and enjoy a refreshing picnic by the river. \n* **Valara Waterfalls:** Another picturesque waterfall, known for its serenity and scenic beauty.\n\n**Tips for Exploring:**\n\n* **Hire a car or taxi:** This will allow you to explore the area at your own pace and visit multiple locations in a day.\n* **Plan your trips:** Many of these attractions require some travel time, so plan your itinerary in advance.\n* **Check the weather:** The climate in Munnar can be unpredictable, so check the forecast before heading out.\n\nI hope you have a wonderful and relaxing trip to Munnar! \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "PlaceName: Munnar, Kerala"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, so you are interested in Munnar, Kerala. That's a great choice! It's a beautiful hill station known for its lush green tea plantations, stunning views, and serene atmosphere. To give you the best recommendations for your trip, I need to know a little more about what you're looking for. \n\nCould you tell me: \n\n* **What kind of trip are you planning?** Are you looking for a relaxing getaway, an adventurous vacation, or a cultural exploration?\n* **What are your interests?**  Are you interested in nature, food, history, art, or something else?\n* **What is your budget?** \n* **How many people will be traveling with you?**\n* **Do you have any specific dates in mind?**\n\nThe more information you give me, the better I can suggest specific activities, places to stay, and things to do that would be perfect for your trip to Munnar. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "PlaceName: Munnar, Kerala\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, you're interested in Munnar, Kerala! That's fantastic, it's a beautiful place. To suggest the best places to visit, I need a little more information about your interests. \n\nCould you tell me:\n\n* **What kind of activities do you enjoy?** Are you looking for adventure, relaxation, cultural experiences, or something else?\n* **Are there any specific things you'd like to see or do in Munnar?**  For example, are you interested in tea plantations, wildlife, waterfalls, or something else?\n* **Do you have any preferences for the type of places you want to visit?**  For example, are you interested in historical sites, scenic viewpoints, natural attractions, or something else? \n\nOnce I know more about your preferences, I can give you some specific suggestions for places to visit in Munnar. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "PlaceName: Munnar, Kerala\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, Munnar, Kerala, it is!  To help you plan your trip, I need some more information about what kind of experiences you are looking for.\n\nCould you tell me:\n\n* **What are your interests?** Are you into nature, adventure, history, food, or something else entirely?\n* **What kind of trip are you planning?**  A relaxing getaway, an adventurous vacation, or a cultural exploration?\n* **What's your budget like?** \n* **How many people will be traveling with you?** \n* **Do you have any specific dates in mind?**\n\nThe more details you provide, the better I can tailor suggestions to your specific needs and preferences! \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Interest : Food, Trip Type: relaxing getaway, budget : normal, no of people : 4"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "That's great! Food and a relaxing getaway in Munnar for 4 people with a normal budget - you're in for a treat! \n\nHere are some suggestions to make your trip delicious and relaxing:\n\n**Food Experiences:**\n\n* **Spice Garden Tour and Lunch:** Explore a spice garden to learn about the various spices grown in Kerala, sample them, and enjoy a traditional Kerala lunch.\n* **Munnar Tea Factory Tour and Tasting:** Take a tour of a tea factory, witness the tea-making process, and indulge in a delightful tea tasting session.\n* **Authentic Kerala Cuisine:**  Try local Kerala dishes like Appam, Idiyappam, Puttu, and Kadala Curry at some of the traditional restaurants in Munnar.\n* **Street Food:**  Venture into the local markets and try some delicious street food like Pani Puri, Samosa, and Vada.\n* **Try the Local Honey:**  Munnar is famous for its honey, so be sure to try some local honey varieties. \n\n**Relaxing Getaways:**\n\n* **Spa & Massage:** Indulge in a relaxing massage or spa treatment at one of the many spas in Munnar.\n* **Nature Walks:** Take a leisurely stroll through the tea plantations, enjoying the fresh air and beautiful scenery.\n* **Picnic by the Lake:** Pack a lunch and enjoy a peaceful picnic by Mattupetty Lake or Kundala Lake.\n* **Sunset Viewing:** Head to Echo Point or Top Station for breathtaking sunset views over the mountains.\n* **Tea Plantation Stay:**  Choose a hotel or resort nestled in the tea plantations for a truly serene and calming experience.\n\n**Budget-Friendly Tips:**\n\n* **Prepare your own snacks:**  Pack some snacks and drinks to save money on meals. \n* **Eat at local restaurants:**   They offer delicious food at more affordable prices than tourist traps. \n* **Explore the local markets:**  Find fresh produce and local snacks at the markets.\n\nI hope these suggestions help you plan a relaxing and delicious getaway to Munnar. Enjoy your trip! \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Munnar, Kerala"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, Munnar, Kerala! You've chosen a beautiful destination. To give you the best recommendations, I need a little more information about what you're looking for.  \n\nCould you tell me:\n\n* **What are your interests?**  Are you into nature, adventure, history, food, art, or something else entirely?\n* **What kind of trip are you planning?**  A relaxing getaway, an adventurous vacation, a cultural exploration, or something else?\n* **What's your budget like?**  Are you looking for budget-friendly options, mid-range accommodations, or luxury experiences?\n* **How many people will be traveling with you?** \n* **Do you have any specific dates in mind?**\n\nThe more information you give me, the better I can tailor suggestions to your specific needs and preferences! \n\n\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Generate a list of hotels near by Munnar, Kerala. Make the outputs in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"name\": \"The Windflower Resort & Spa Munnar\",\n    \"rating\": 4.5,\n    \"price_range\": \"$$\",\n    \"address\": \"Pothamedu, Munnar, Kerala 685612, India\",\n    \"features\": [\n      \"Spa\",\n      \"Outdoor pool\",\n      \"Restaurant\",\n      \"Free Wi-Fi\",\n      \"Fitness center\",\n      \"Garden\"\n    ]\n  },\n  {\n    \"name\": \"The Gateway Hotel - Munnar\",\n    \"rating\": 4,\n    \"price_range\": \"$$$\",\n    \"address\": \"Nallathanni, Munnar, Kerala 685612, India\",\n    \"features\": [\n      \"Restaurant\",\n      \"Free Wi-Fi\",\n      \"Fitness center\",\n      \"Outdoor pool\",\n      \"Spa\",\n      \"Bar\"\n    ]\n  },\n  {\n    \"name\": \"Sterling Munnar\",\n    \"rating\": 4.2,\n    \"price_range\": \"$$$\",\n    \"address\": \"Old Munnar, Munnar, Kerala 685612, India\",\n    \"features\": [\n      \"Restaurant\",\n      \"Free Wi-Fi\",\n      \"Outdoor pool\",\n      \"Fitness center\",\n      \"Spa\",\n      \"Garden\"\n    ]\n  },\n  {\n    \"name\": \"Fragrant Nature Munnar\",\n    \"rating\": 4.3,\n    \"price_range\": \"$$\",\n    \"address\": \"Devikulam, Munnar, Kerala 685612, India\",\n    \"features\": [\n      \"Restaurant\",\n      \"Free Wi-Fi\",\n      \"Garden\",\n      \"Outdoor pool\",\n      \"Spa\"\n    ]\n  },\n  {\n    \"name\": \"Elysium Resort & Spa Munnar\",\n    \"rating\": 4,\n    \"price_range\": \"$$$$\",\n    \"address\": \"Devikulam, Munnar, Kerala 685612, India\",\n    \"features\": [\n      \"Restaurant\",\n      \"Free Wi-Fi\",\n      \"Outdoor pool\",\n      \"Spa\",\n      \"Fitness center\",\n      \"Garden\"\n    ]\n  },\n  {\n    \"name\": \"The Tea County Resort Munnar\",\n    \"rating\": 4.1,\n    \"price_range\": \"$$\",\n    \"address\": \"Munnar, Kerala 685612, India\",\n    \"features\": [\n      \"Restaurant\",\n      \"Free Wi-Fi\",\n      \"Outdoor pool\",\n      \"Garden\",\n      \"Spa\",\n      \"Bar\"\n    ]\n  },\n  {\n    \"name\": \"Greenwoods Resort Munnar\",\n    \"rating\": 3.8,\n    \"price_range\": \"$\",\n    \"address\": \"Munnar, Kerala 685612, India\",\n    \"features\": [\n      \"Restaurant\",\n      \"Free Wi-Fi\",\n      \"Garden\",\n      \"Outdoor pool\"\n    ]\n  },\n  {\n    \"name\": \"The Misty Mountain Resort Munnar\",\n    \"rating\": 4,\n    \"price_range\": \"$$\",\n    \"address\": \"Munnar, Kerala 685612, India\",\n    \"features\": [\n      \"Restaurant\",\n      \"Free Wi-Fi\",\n      \"Garden\",\n      \"Outdoor pool\",\n      \"Spa\"\n    ]\n  }\n]\n```\n\n**Please Note:**\n\n* This list is just a sample and doesn't include all the hotels in Munnar. \n* Ratings, price ranges, and features are approximate and can vary depending on the season and availability.\n* It's always best to check for the latest information and reviews on booking websites before making a reservation. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Munnar, Kerala. Interest : Food, Trip Type: relaxing getaway, budget : normal, no of people : 4"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, Munnar, Kerala, with a focus on food, a relaxing getaway, a normal budget, and for 4 people! You're in for a delicious and tranquil experience. Here's a plan that combines the best of both:\n\n**Day 1: Spice & Tea Indulgence**\n\n* **Morning:** Start your day with a visit to a spice garden near Munnar. Explore the vibrant aromas and learn about the various spices grown in Kerala. Take a tour and enjoy a traditional Kerala lunch with freshly picked spices. \n* **Afternoon:**  Head to a tea factory for a guided tour, witness the tea-making process, and indulge in a delightful tea tasting session. Enjoy the beautiful surroundings and the calming aroma of tea.\n* **Evening:**  Enjoy a relaxing dinner at a local restaurant, sampling authentic Kerala cuisine like Appam, Idiyappam, Puttu, and Kadala Curry. \n\n**Day 2: Nature & Flavors**\n\n* **Morning:** Take a leisurely walk through the tea plantations, enjoying the fresh air and beautiful scenery. Pack a picnic lunch and find a serene spot near a lake for a relaxing lunch.\n* **Afternoon:**  Visit Mattupetty Dam and Lake. Enjoy a boat ride, soak in the natural beauty, and indulge in some light snacks and beverages at a local cafe near the lake. \n* **Evening:** Enjoy a delicious dinner at a restaurant with stunning views of the mountains. Try some local street food like Pani Puri, Samosa, and Vada for a taste of local flavors.\n\n**Day 3: Relaxation & Indulgence**\n\n* **Morning:**  Indulge in a rejuvenating spa treatment at one of the many spas in Munnar. Relax and unwind with a massage or a spa package.\n* **Afternoon:**  Head to the Munnar Rose Garden. Admire the vibrant colors and fragrances of various rose varieties. Enjoy a leisurely stroll through the garden and relax amidst the beauty. \n* **Evening:** Enjoy a final dinner at a local restaurant, sampling more of the delicious Kerala cuisine. \n\n**Tips:**\n\n* **Pack snacks:** Pack some snacks and drinks to save money on meals and enjoy a picnic in the beautiful settings.\n* **Eat at local restaurants:**  They offer delicious food at more affordable prices than tourist traps. \n* **Explore the local markets:**  Find fresh produce and local snacks at the markets for a taste of local flavors.\n* **Look for deals:** Check for special offers and packages on accommodation and activities. \n\n**Additional Activities:**\n\n* **Sunset Viewing:** Head to Echo Point or Top Station for breathtaking sunset views over the mountains.\n* **Tea Plantation Stay:**  Choose a hotel or resort nestled in the tea plantations for a truly serene and calming experience.\n\nThis itinerary combines food exploration with a relaxing getaway. Enjoy Munnar's beauty, culture, and flavors!\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "place : Munnar, Kerala, Interest : Food, Trip Type: relaxing getaway, budget : normal"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, a food-focused, relaxing getaway to Munnar on a normal budget - sounds like a delightful plan! Here's an itinerary to make the most of it:\n\n**Day 1: Spice & Tea Journey**\n\n* **Morning:** Start with a visit to a spice garden, like the Mattupetty Spice Garden or the Eravikulam Spice Garden. Enjoy the vibrant aromas, learn about the spices, and maybe even get a chance to try a few! Enjoy a delicious Kerala lunch at a local restaurant, incorporating those fresh spices.\n* **Afternoon:**  Dive into the tea world! Visit a tea plantation like the Kannan Devan Hills Plantations or the Tata Tea Munnar Estate. Take a guided tour, learn about the tea-making process, and indulge in a tasting session. The aroma of freshly brewed tea is truly captivating.\n* **Evening:**  Head to a local restaurant for dinner, focusing on traditional Kerala cuisine.  Try the iconic Appam and Idiyappam with savory curries, or maybe some flavorful fish dishes.\n\n**Day 2: Nature & Local Delights**\n\n* **Morning:**  Take a leisurely walk through the tea plantations, enjoying the fresh air and breathtaking scenery. Look out for the tea pluckers and imagine the process. Pack a simple picnic lunch of local delicacies like Puttu or Idli, and find a tranquil spot near Mattupetty Lake or Kundala Lake. \n* **Afternoon:**  Enjoy a boat ride on Mattupetty Lake, soaking in the serenity and the natural beauty. The gentle breeze and the calming views are perfect for relaxation.\n* **Evening:**  Experience Munnar's street food scene! Explore the local markets and try some delicious street food like Pani Puri, Samosa, and Vada.  \n\n**Day 3: Spa & Culinary Adventure**\n\n* **Morning:** Indulge in a rejuvenating spa treatment at one of the many spas in Munnar.  Relax and unwind with a massage, body scrub, or facial.\n* **Afternoon:**  Head to the Munnar Rose Garden. Enjoy a leisurely stroll and admire the vibrant colors and fragrances of different rose varieties.\n* **Evening:**  Celebrate your trip with a final dinner at a local restaurant known for its culinary excellence.  Try some of the local specialties you haven't sampled yet or even request a special meal to be made. \n\n**Budget-Friendly Tips:**\n\n* **Pack your own snacks:**  Stock up on snacks and drinks to enjoy during your nature walks or picnics. \n* **Eat at local restaurants:**  They offer delicious food at more affordable prices than tourist traps. \n* **Explore the local markets:**  Find fresh produce, local snacks, and even spices at the markets. You can even bargain for a good price!\n* **Look for deals:** Check for special offers and packages on accommodation and activities.\n\n**Additional Ideas:**\n\n* **Sunset Viewing:** Head to Echo Point or Top Station for breathtaking sunset views over the mountains.\n* **Tea Plantation Stay:**  Choose a hotel or resort nestled in the tea plantations for a truly serene and calming experience.\n\nEnjoy your relaxing and delicious food-filled getaway in Munnar! \n\n\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Interest : Food, Trip Type: relaxing getaway, budget : normal. "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a plan for a relaxing food-focused getaway to Munnar on a normal budget, designed for a solo traveler or a couple:\n\n**Day 1: Spice & Tea Immersion**\n\n* **Morning:** Start with a visit to a spice garden like the Mattupetty Spice Garden or Eravikulam Spice Garden. Explore the vibrant aromas, learn about the spices, and maybe even get a chance to try a few.  Enjoy a delicious Kerala lunch at a local restaurant, incorporating those fresh spices.\n* **Afternoon:**  Dive into the tea world at a plantation like Kannan Devan Hills Plantations or Tata Tea Munnar Estate. Take a guided tour, learn about the tea-making process, and indulge in a tasting session. The aroma of freshly brewed tea is truly captivating.\n* **Evening:**  Head to a local restaurant for dinner, focusing on traditional Kerala cuisine. Try the iconic Appam and Idiyappam with savory curries, or maybe some flavorful fish dishes.\n\n**Day 2: Nature & Local Delights**\n\n* **Morning:**  Take a leisurely walk through the tea plantations, enjoying the fresh air and breathtaking scenery. Look out for the tea pluckers and imagine the process. Pack a simple picnic lunch of local delicacies like Puttu or Idli, and find a tranquil spot near Mattupetty Lake or Kundala Lake. \n* **Afternoon:**  Enjoy a boat ride on Mattupetty Lake, soaking in the serenity and the natural beauty. The gentle breeze and the calming views are perfect for relaxation.\n* **Evening:**  Experience Munnar's street food scene! Explore the local markets and try some delicious street food like Pani Puri, Samosa, and Vada.  \n\n**Day 3: Spa & Culinary Adventure**\n\n* **Morning:** Indulge in a rejuvenating spa treatment at one of the many spas in Munnar.  Relax and unwind with a massage, body scrub, or facial.\n* **Afternoon:**  Head to the Munnar Rose Garden. Enjoy a leisurely stroll and admire the vibrant colors and fragrances of different rose varieties.\n* **Evening:**  Celebrate your trip with a final dinner at a local restaurant known for its culinary excellence.  Try some of the local specialties you haven't sampled yet or even request a special meal to be made. \n\n**Budget-Friendly Tips:**\n\n* **Pack your own snacks:**  Stock up on snacks and drinks to enjoy during your nature walks or picnics. \n* **Eat at local restaurants:**  They offer delicious food at more affordable prices than tourist traps. \n* **Explore the local markets:**  Find fresh produce, local snacks, and even spices at the markets. You can even bargain for a good price!\n* **Look for deals:** Check for special offers and packages on accommodation and activities.\n\n**Additional Ideas:**\n\n* **Sunset Viewing:** Head to Echo Point or Top Station for breathtaking sunset views over the mountains.\n* **Tea Plantation Stay:**  Choose a hotel or resort nestled in the tea plantations for a truly serene and calming experience.\n\nEnjoy your relaxing and delicious food-filled getaway in Munnar! \n\n\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    //console.log(result.response.text());
    return result.response.text();
  }

module.exports = router ;