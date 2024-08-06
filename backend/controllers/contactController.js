const Contact = require('../models/Contact');
const sendEmail = require('../config/sendEmail');

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send confirmation email to the user
    await sendEmail(email, 'Thank you for contacting us', 'Thank you for reaching out. We will get back to you shortly.');

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

const sendReply = async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    await sendEmail(email, subject, message);
    res.status(200).json({ message: 'Reply sent successfully!' });
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({ message: 'Failed to send reply' });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  sendReply,
};