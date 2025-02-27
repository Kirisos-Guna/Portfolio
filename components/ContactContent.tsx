'use client';

import { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import GradientText from './GradientText';
import React from 'react';
import { ParallaxUp, ParallaxScale, ParallaxRotate } from './ParallaxEffect';

// Memoized contact information component for better performance
const ContactInfo = React.memo(() => (
  <div className="space-y-4">
    <div className="flex items-start space-x-4">
      <div className="text-purple-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <p className="text-purple-200 font-medium">Email</p>
        <a href="mailto:your.email@example.com" className="text-purple-100 hover:text-white transition-colors">your.email@example.com</a>
      </div>
    </div>
    
    <div className="flex items-start space-x-4">
      <div className="text-purple-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <p className="text-purple-200 font-medium">Location</p>
        <p className="text-purple-100">Your City, Country</p>
      </div>
    </div>
    
    <div className="pt-6">
      <p className="text-purple-200 font-medium mb-4">Connect with me</p>
      <div className="flex space-x-4">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
));

ContactInfo.displayName = 'ContactInfo';

export default function ContactContent() {
  const prefersReducedMotion = useReducedMotion();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Handle form input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  }, []);
  
  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formState.name || !formState.email || !formState.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Set submitting state
    setFormStatus('submitting');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Simulate success
      setFormStatus('success');
      
      // Reset form after success
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1000);
  }, [formState]);
  
  // Optimized animations based on reduced motion preference
  const titleAnimation = prefersReducedMotion 
    ? {} 
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 } };
    
  const leftColumnAnimation = prefersReducedMotion 
    ? {} 
    : { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.2 } };
    
  const rightColumnAnimation = prefersReducedMotion 
    ? {} 
    : { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.4 } };

  return (
    <section id="contact" className="py-20 px-4 pt-32">
      <div className="container mx-auto max-w-4xl">
        <ParallaxUp offset={25}>
          <motion.div
            className="text-center mb-16"
            {...titleAnimation}
          >
            <GradientText
              from="from-purple-400"
              via="via-fuchsia-500"
              to="to-pink-600"
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              animate={!prefersReducedMotion}
            >
              Get In Touch
            </GradientText>
            <p className="mt-4 text-purple-100 max-w-2xl mx-auto">
              Have a question or want to work together? Feel free to reach out using the form below or through my social media channels.
            </p>
          </motion.div>
        </ParallaxUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ParallaxScale offset={20}>
            <motion.div
              className="bg-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-800/30 p-6"
              {...leftColumnAnimation}
            >
              <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
              <ContactInfo />
            </motion.div>
          </ParallaxScale>
          
          <ParallaxRotate offset={5}>
            <motion.div
              {...rightColumnAnimation}
            >
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-purple-100 mb-2">Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-purple-900/20 border border-purple-800/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Your Name"
                    suppressHydrationWarning={true}
                    required
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-purple-100 mb-2">Email <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-purple-900/20 border border-purple-800/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="your.email@example.com"
                    suppressHydrationWarning={true}
                    required
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-purple-100 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-purple-900/20 border border-purple-800/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Subject"
                    suppressHydrationWarning={true}
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-purple-100 mb-2">Message <span className="text-red-400">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-purple-900/20 border border-purple-800/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                    placeholder="Your message..."
                    suppressHydrationWarning={true}
                    required
                    disabled={formStatus === 'submitting'}
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className={`px-6 py-3 w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg transition-all duration-300 ${
                    formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/30'
                  }`}
                  whileHover={formStatus !== 'submitting' && !prefersReducedMotion ? { scale: 1.03 } : {}}
                  whileTap={formStatus !== 'submitting' && !prefersReducedMotion ? { scale: 0.98 } : {}}
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'idle' && 'Send Message'}
                  {formStatus === 'submitting' && 'Sending...'}
                  {formStatus === 'success' && 'Message Sent!'}
                  {formStatus === 'error' && 'Error! Try Again'}
                </motion.button>
                
                {formStatus === 'success' && (
                  <motion.p 
                    className="text-green-400 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Thank you for your message! I&apos;ll get back to you soon.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </ParallaxRotate>
        </div>
      </div>
    </section>
  );
} 