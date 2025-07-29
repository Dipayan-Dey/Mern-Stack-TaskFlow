import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, ArrowRight, Users, Clock, TrendingUp, Play, CheckSquare } from 'lucide-react';

function Landing() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({ users: 0, tasks: 0, teams: 0 });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "TaskFlow revolutionized how our team manages projects. The intuitive interface and powerful features make productivity effortless."
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "From chaos to clarity in just one week. TaskFlow helped us organize our entire workflow and boost team collaboration."
    },
    {
      name: "Emma Davis",
      role: "Freelance Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "As a freelancer juggling multiple clients, TaskFlow keeps me organized and ensures I never miss a deadline."
    }
  ];

  const features = [
    {
      icon: CheckCircle,
      title: "Smart Task Management",
      description: "Organize, prioritize, and track your tasks with intelligent automation and seamless collaboration."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together effortlessly with real-time updates, shared workspaces, and communication tools."
    },
    {
      icon: TrendingUp,
      title: "Analytics & Insights",
      description: "Track productivity trends, identify bottlenecks, and optimize your workflow with detailed analytics."
    }
  ];

  // Animate stats on component mount
  useEffect(() => {
    const targets = { users: 50000, tasks: 2000000, teams: 5000 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedStats({
        users: Math.floor(targets.users * progress),
        tasks: Math.floor(targets.tasks * progress),
        teams: Math.floor(targets.teams * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  const currentDate = new Date().getFullYear()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" style={{ fontFamily: "'Poppins', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-6" style={{ letterSpacing: '0.025em' }}>
                <Star className="w-4 h-4 mr-2" />
                $1 Productivity App of 2024 - {currentDate}
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontWeight: '800', letterSpacing: '-0.025em' }}>
                Transform Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Productivity
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" style={{ fontWeight: '400', lineHeight: '1.7' }}>
                Join millions of professionals who've revolutionized their workflow with TaskFlow. 
                Smart task management, seamless collaboration, and powerful insights in one beautiful app.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300" style={{ fontWeight: '700', letterSpacing: '0.025em' }}>
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group inline-flex items-center px-8 py-4 bg-white text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 transition-all duration-300" style={{ fontWeight: '600' }}>
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                  ].map((avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`User ${index + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-white hover:scale-110 transition-transform duration-200"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600" style={{ fontWeight: '500' }}>
                  <span className="font-bold text-gray-900" style={{ fontWeight: '700' }}>50,000+</span> happy users
                </p>
              </div>
            </div>
            
            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
                  alt="TaskFlow Dashboard"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckSquare className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Complete project proposal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                    <span className="text-gray-500">Review team feedback</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                    <span className="text-gray-500">Schedule client meeting</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                {animatedStats.users.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                {animatedStats.tasks.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Tasks Completed</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">
                {animatedStats.teams.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Teams Organized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to boost your productivity and streamline your workflow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by professionals worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about TaskFlow
            </p>
          </div>
          
          <div className="relative bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
            <div className="text-center">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white shadow-lg"
              />
              
              <blockquote className="text-xl lg:text-2xl text-gray-700 mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="font-semibold text-gray-900 text-lg">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="text-gray-600">
                {testimonials[currentTestimonial].role}
              </div>
            </div>
            
            {/* Testimonial Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-blue-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've already made the switch to TaskFlow
          </p>
          
          <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
          
          <p className="text-blue-200 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;