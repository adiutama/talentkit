"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const emailValid = /\S+@\S+\.\S+/.test(email);

    if (email.trim() === "") {
      setError("Please enter your email.");
      setIsSubmitting(false);
      return;
    }
    if (!emailValid) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Subscription failed. Please try again later.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 font-sans">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl" />
        
        {/* Chart-like grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-teal-400" />
          </svg>
        </div>
      </div>

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              TalentKit
            </h1>
            <div className="w-16 h-1 bg-linear-to-r from-teal-400 to-electric-blue mx-auto" />
          </div>

          {/* Main heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Coming Soon
          </h2>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-navy-200 mb-4 max-w-xl mx-auto leading-relaxed">
            Your Next-Generation Career Intelligence Platform.
          </p>
          
          <p className="text-lg text-navy-300 mb-12 max-w-lg mx-auto">
            Access intelligent tools that will assist you in a journey to get your dream job.
          </p>

          {/* Visual progress indicator */}
          <div className="mb-12 flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Email signup form */}
          <div className="mb-16">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 rounded-lg bg-navy-800/50 border border-navy-700 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-lg bg-linear-to-r from-teal-400 to-electric-blue text-navy-900 font-semibold hover:from-teal-300 hover:to-electric-blue/90 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-navy-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isSubmitting ? "Submitting..." : "Notify Me"}
                  </button>
                </div>
                {error && (
                  <p className="text-sm text-red-400 text-center">
                    {error}
                  </p>
                )}
              </form>
            ) : (
              <div className="max-w-md mx-auto p-6 rounded-lg bg-teal-400/10 border border-teal-400/20">
                <p className="text-teal-400 font-medium">
                  ✓ Thanks! We&apos;ll send you and update when we launch.
                </p>
              </div>
            )}
          </div>

          {/* Upward chevron indicator */}
          <div className="flex flex-col items-center gap-2 text-navy-400">
            <div className="flex flex-col items-center gap-1">
              <svg
                className="w-6 h-6 text-teal-400 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <span className="text-sm">No spam, just updates.</span>
            </div>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 text-navy-500 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400" />
            <span>AI-Powered</span>
          </div>
          <div className="w-px h-4 bg-navy-700" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-electric-blue" />
            <span>Streamlined</span>
          </div>
        </div>
      </main>
    </div>
  );
}
