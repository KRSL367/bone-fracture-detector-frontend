import React from 'react';

const HowToUse = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 text-gray-800">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">How to Use</h1>
        <p className="text-lg md:text-xl mt-2">Follow these simple steps to get started with our app.</p>
      </header>

      {/* Steps Section */}
      <section className="flex-grow py-16 px-4 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-center items-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Upload X-Ray</h3>
              <p className="text-gray-600">
                Navigate to the upload page and select an X-ray image from your device for analysis.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-center items-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI model processes the X-ray to detect fractures and generate a detailed report.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="flex justify-center items-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Review Results</h3>
              <p className="text-gray-600">
                Access the analysis report with key metrics, visualizations, and diagnostic insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-gray-300 text-center">
        <p>&copy; 2024 FractureX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HowToUse;
