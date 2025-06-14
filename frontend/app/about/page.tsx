"use client";

import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Section */}
      <div className="w-full bg-blue-700 h-64 flex items-center justify-center text-white text-4xl font-bold">
        About Us
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-2xl mt-[-50px] w-4/5 max-w-4xl p-6">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We are a team of passionate professionals dedicated to creating
            innovative solutions that drive growth and make a positive impact on
            our community. Our goal is to empower individuals and businesses to
            achieve their full potential through cutting-edge technology and
            creative problem-solving.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to build tools and platforms that bridge the gap
            between technology and real-world applications. By leveraging our
            expertise, we aim to simplify complex challenges and create
            user-friendly experiences for our clients.
          </p>
        </section>

        {/* Call-to-Action */}
        <section className="text-center mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Work with Us?
          </h2>
          <Button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Contact Us
          </Button>
        </section>
      </div>
    </div>
  );
};

export default About;
