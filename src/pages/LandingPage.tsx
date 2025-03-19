import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
            Transform Your Customer Relationships
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            The modern CRM platform that helps you build stronger relationships, close more deals, and grow your business.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that are already using our platform to grow their customer relationships.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Free Trial
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

const features = [
  {
    title: "Smart Automation",
    description: "Automate repetitive tasks and focus on what matters most - building relationships with your customers.",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Analytics & Insights",
    description: "Get deep insights into your customer relationships with powerful analytics and reporting tools.",
    icon: <CheckCircle2 className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Team Collaboration",
    description: "Work seamlessly with your team members and keep everyone aligned with shared goals.",
    icon: <CheckCircle2 className="h-6 w-6 text-blue-600" />,
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "2x", label: "Revenue Growth" },
  { value: "24/7", label: "Support" },
];

export default LandingPage; 