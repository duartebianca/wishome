import React, { useEffect, useState } from 'react';

const HomePage: React.FC = () => {
  const [gifts, setGifts] = useState<any[]>([]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/gifts");
        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.error("Error fetching gifts:", error);
      }
    };

    fetchGifts();
  }, []);

  return (
    <div>
      <h1>Welcome to Wishome!</h1>
      <p>Your personalized gift registry.</p>
      <h2>Available Gifts:</h2>
      <ul>
        {gifts.map(gift => (
          <li key={gift.id}>{gift.name} - ${gift.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;