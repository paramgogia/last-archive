// 1. Import Dependencies
const express = require('express');
const admin = require('firebase-admin');

// --- START: FIREBASE CONFIGURATION ---
// !! IMPORTANT !!
// 1. Download your service account key from your Firebase project settings:
//    Project Settings > Service Accounts > Generate new private key
// 2. Save the downloaded JSON file as 'serviceAccountKey.json' in the same folder as this file.

const serviceAccount = require('./serviceAccountKey.json');

// 3. !! IMPORTANT !!
//    Replace this with your project's Realtime Database URL
//    Find it in your Firebase Console > Realtime Database > (it's the URL at the top)
const databaseURL = 'https://asdfjnvhajjf884asdft-rtdb.firebaseio.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

// Get a reference to the database service
const db = admin.database();
// --- END: FIREBASE CONFIGURATION ---


// 2. Initialize Express App
const app = express();
const port = process.env.PORT || 3000;

// 3. Add Middleware
// This middleware parses incoming JSON requests
app.use(express.json());

// 4. Define API Endpoint
/**
 * @route   POST /add-text
 * @desc    Adds a new text entry to Firebase
 * @access  Public
 * @body    { "text": "This is the message to save" }
 */
app.post('/add-text', async (req, res) => {
  try {
    // 1. Get the text from the request body
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, error: 'Text field is required' });
    }

    // 2. Get a reference to the '/texts' node in your database
    const textsRef = db.ref('texts');

    // 3. Push the new data (this creates a new unique ID)
    const newTextRef = await textsRef.push({
      content: text,
      timestamp: new Date().toISOString()
    });

    // 4. Send a success response
    console.log(`Successfully added text with ID: ${newTextRef.key}`);
    res.status(201).json({
      success: true,
      message: 'Text added successfully!',
      id: newTextRef.key
    });

  } catch (error) {
    // 5. Handle errors
    console.error('Error adding text to Firebase:', error);
    res.status(500).json({ success: false, error: 'Failed to add text' });
  }
});

// 5. Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log('Listening for POST requests on /add-text');
});