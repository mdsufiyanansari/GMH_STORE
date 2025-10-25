import React from "react";
import { Lock, Mail, Database, Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-gray-800">
        {/* Header */}
        <div className="text-center mb-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
            alt="Privacy Illustration"
            className="w-24 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-cyan-700 mb-2">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            We respect your privacy and are committed to protecting your data.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <Database className="text-cyan-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold text-cyan-700 mb-2">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Name, email address, and contact number.</li>
              <li>Order details and payment information.</li>
              <li>Website activity (cookies, time spent, preferences).</li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <Lock className="text-cyan-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold text-cyan-700 mb-2">
              How We Use Your Data
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use your information to process orders, send updates, and
              enhance your shopping experience. We never sell your personal
              information to third parties.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <Shield className="text-cyan-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold text-cyan-700 mb-2">
              Data Protection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your data is stored securely with industry-standard encryption
              protocols. Only authorized staff can access sensitive information.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <Mail className="text-cyan-600 w-10 h-10 mb-3" />
            <h2 className="text-xl font-semibold text-cyan-700 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For privacy-related concerns, email us at{" "}
              <a
                href="mailto:contact@gmail.com"
                className="text-cyan-700 font-medium hover:underline"
              >
                contact@gmail.com
              </a>
              .
            </p>
          </div>
        </div>

        {/* Bottom Illustration */}
        {/* <div className="mt-16 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="Secure Data"
            className="w-48 mx-auto"
          />
        </div> */}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
