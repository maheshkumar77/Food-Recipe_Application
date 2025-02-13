import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaYoutube, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [rating, setRating] = useState<number>(0); // Rating as number
  const [feedback, setFeedback] = useState<string>(''); // Feedback as string
  const [message, setMessage] = useState<string>(''); // Message as string

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !feedback) {
      setMessage('Please fill in all fields');
      return;
    }

    // Reset feedback and rating after submission
    setMessage('Thank you for your feedback!');
    setTimeout(() => {
      setFeedback('');
      setRating(0); // Reset the rating
      setMessage(''); // Clear the message after a few seconds
    }, 2000); // Wait for 2 seconds before clearing the fields
  };

  return (
    <footer className="bg-gray-800 text-white py-8 w-[98%] rounded-lg mt-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={30} className="hover:text-red-600 transition duration-300" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} className="hover:text-pink-600 transition duration-300" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} className="hover:text-blue-600 transition duration-300" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} className="hover:text-blue-400 transition duration-300" />
          </a>
        </div>

        {/* Feedback Form */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl text-center mb-4">We Value Your Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Feedback</label>
              <textarea
                className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={feedback}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
              />
            </div>

            {/* Rating Component */}
            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium">Rate Us</label>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setRating(star)}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 17.3l6.3 4-1.7-7.3L22 9h-7.3L12 2 9.3 9H2l5.4 4 1.7 7.3z" />
                </svg>
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit Feedback
            </button>
          </form>

          {/* Feedback Message */}
          {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
