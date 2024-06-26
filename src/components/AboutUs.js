import React, { useEffect } from "react";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">About Us</h1>
        <p class="mb-4">
          Welcome to Practise Pro – your ultimate destination for mastering the art of practice. At Practise Pro, we believe that consistent, targeted practice is the key to academic excellence. Our
          platform is designed to provide students with a personalized and dynamic learning experience, tailored to their unique needs and preferences.
        </p>

        <p class="mb-4">
          With our extensive repository of questions spanning a wide array of subjects and topics, Practise Pro empowers students to take control of their learning journey. Our innovative system
          ensures that no two tests are ever the same, delivering a fresh and challenging experience every time. Questions are generated randomly and will not repeat until the entire repository has
          been exhausted, ensuring comprehensive coverage and thorough preparation.
        </p>

        <p class="mb-4">
          At Practise Pro, we understand that every student is different. Our flexible platform allows users to customize their practice sessions based on parameters such as time constraints, number
          of questions, and difficulty levels. Whether you are preparing for a competitive exam or seeking to reinforce your understanding of a specific topic, Practise Pro offers the tools you need
          to succeed.
        </p>

        <p class="mb-4">
          Our mission is encapsulated in our tagline: ‘practise karo, pro bano’. We are committed to fostering a culture of continuous improvement and excellence. By providing a supportive and
          adaptive learning environment, we aim to help students build confidence, enhance their skills, and achieve their academic goals.
        </p>

        <p class="mb-4">Join us at Practise Pro and embark on a path to proficiency. Practise smart, practise right, and become a pro with Practise Pro.</p>
      </div>
    </div>
  );
}

export default AboutUs;
