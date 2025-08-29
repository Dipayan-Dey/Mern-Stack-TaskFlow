import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          About <span className="text-indigo-600">TaskFlow</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6 text-center">
          TaskFlow is a modern productivity app designed to help individuals and 
          teams organize, prioritize, and achieve more. With a clean interface 
          and powerful features, TaskFlow makes managing your work effortless 
          and efficient.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div className="p-5 bg-indigo-50 rounded-xl">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              ✨ Simplicity
            </h2>
            <p className="text-gray-600">
              A clutter-free, easy-to-use interface that helps you stay focused 
              on what really matters.
            </p>
          </div>
          <div className="p-5 bg-indigo-50 rounded-xl">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              ⚡ Performance
            </h2>
            <p className="text-gray-600">
              Fast, responsive, and designed to keep up with your workflow, no 
              matter the size of your projects.
            </p>
          </div>
          <div className="p-5 bg-indigo-50 rounded-xl">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              🤝 Collaboration
            </h2>
            <p className="text-gray-600">
              Work together seamlessly with teammates and share progress in real-time.
            </p>
          </div>
          <div className="p-5 bg-indigo-50 rounded-xl">
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              🔒 Security
            </h2>
            <p className="text-gray-600">
              Your tasks and data are always safe with enterprise-grade 
              security and privacy measures.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
