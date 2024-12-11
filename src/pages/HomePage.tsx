const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">Welcome to FractureX</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
          Empowering healthcare with AI-driven bone fracture detection for faster and more accurate diagnostics.
        </p>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 md:px-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">About the App</h2>
          <p className="text-gray-600 text-lg">
            Our app leverages advanced machine learning algorithms to identify bone fractures from X-ray images. With an intuitive interface and state-of-the-art accuracy, it's designed for both medical professionals and researchers.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-4 md:px-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">Analyze X-ray images with cutting-edge AI models to detect fractures quickly and accurately.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">User-Friendly Interface</h3>
              <p className="text-gray-600">Navigate seamlessly with an interface designed for simplicity and efficiency.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Real-Time Results</h3>
              <p className="text-gray-600">Get results in seconds, allowing for faster decision-making in critical situations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 md:px-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ready to Transform Diagnostics?</h2>
          <p className="text-lg text-blue-100 mb-6">
            Join the revolution in medical diagnostics with our AI-driven bone fracture detection system.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-gray-300 text-center">
        <p>&copy; 2024 FractureX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
