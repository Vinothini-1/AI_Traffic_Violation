import React from "react";
import { useLoaderData } from "react-router-dom";
import { useDashbordContext } from "../pages/DashboardLayout";
import AllItems from "./AllItems";
import dimage from "../assets/Images/OIP-removebg-preview (1).png";
import { FaChartLine, FaShieldAlt, FaRegLightbulb } from "react-icons/fa";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { RecycleItemUserBarchart } from "../Components";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/RItems");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function Dashboard() {
  const { user } = useDashbordContext();
  const { data } = useLoaderData();

  return (
    <div>
      {/* Header Section */}
      <div className="px-6 rounded-lg shadow-md bg-gradient-to-r from-red-300 to-violet-200 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-semibold mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">
            We're glad to have you here. Explore the latest reports and insights.
          </p>
        </div>
        <img src={dimage} alt="Dashboard" className="w-36 h-36" />
      </div>

      {/* Main Dashboard Section */}
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
        {/* Hero Section */}
        <section className="mt-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-pink-300">
              Ensure Safer Roads
            </h2>
            <p className="mt-3 text-gray-300">
              Our system helps law enforcement and authorities to detect and
              manage traffic violations in real-time.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://source.unsplash.com/600x400/?traffic,road"
              alt="Traffic Violation"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mt-16 w-full max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-pink-400">
            📊 Traffic Violation Insights
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <FaChartLine className="text-4xl text-pink-300 mx-auto mb-2" />
              <h4 className="text-xl font-semibold text-pink-300">
                12,500+ Violations
              </h4>
              <p className="mt-2 text-gray-400">
                Recorded across multiple cities in the past year.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <FaShieldAlt className="text-4xl text-pink-300 mx-auto mb-2" />
              <h4 className="text-xl font-semibold text-pink-300">
                85% Compliance Rate
              </h4>
              <p className="mt-2 text-gray-400">
                Improved road safety through our detection system.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
              <FaRegLightbulb className="text-4xl text-pink-300 mx-auto mb-2" />
              <h4 className="text-xl font-semibold text-pink-300">
                AI-Powered Analysis
              </h4>
              <p className="mt-2 text-gray-400">
                Using deep learning for precise violation detection.
              </p>
            </div>
          </div>
        </section>

        {/* User Guide Section */}
        <section className="mt-16 w-full max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-pink-400">
            📖 How It Works
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-pink-300">
                Step 1: Capture Violations
              </h4>
              <p className="mt-2 text-gray-400">
                Our system automatically captures traffic violations from cameras
                and images.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-pink-300">
                Step 2: AI-Powered Detection
              </h4>
              <p className="mt-2 text-gray-400">
                Violations are analyzed and categorized using our AI model.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-pink-300">
                Step 3: Violation Reports
              </h4>
              <p className="mt-2 text-gray-400">
                Authorities receive real-time reports for appropriate action.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-pink-300">
                Step 4: Compliance & Improvement
              </h4>
              <p className="mt-2 text-gray-400">
                Citizens and organizations take action to improve road safety.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-16 w-full max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-pink-400">
            💬 User Testimonials
          </h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-300">
                "This system has drastically improved road safety in our city. We
                now have real-time insights into violations."
              </p>
              <p className="mt-3 text-pink-300 font-semibold">— Officer Smith</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <p className="text-gray-300">
                "With AI-powered detection, it's much easier to enforce traffic
                rules fairly and efficiently."
              </p>
              <p className="mt-3 text-pink-300 font-semibold">
                — Traffic Analyst, NYC
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-gray-500">
          <p>
            © {new Date().getFullYear()} Traffic Violation System | All Rights
            Reserved
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
