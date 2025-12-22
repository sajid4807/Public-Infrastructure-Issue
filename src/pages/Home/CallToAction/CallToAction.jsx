import { Link } from "react-router";
import { FaFlag, FaUserPlus, FaArrowRight } from "react-icons/fa";

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-64 w-64 animate-pulse rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
        <div className="absolute -right-20 bottom-0 h-64 w-64 animate-pulse rounded-full bg-purple-400 opacity-20 blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-indigo-400 opacity-10 blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        <div className="text-center text-white">
          {/* Icon Badge */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 shadow-2xl backdrop-blur-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm">
              <FaFlag className="text-3xl text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <h2 className="mb-6 text-4xl font-black md:text-5xl lg:text-6xl">
            Help Improve Public Infrastructure
          </h2>

          {/* Decorative Line */}
          <div className="mx-auto mb-6 h-1 w-32 rounded-full bg-white/40"></div>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-blue-100 md:text-xl">
            Report issues, track progress, and be part of the solution.
            Together, we can build safer and better communities.
          </p>

          {/* Decorative Dots */}
          <div className="mb-10 flex justify-center gap-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-white/60"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: '0.1s' }}></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-white/60" style={{ animationDelay: '0.2s' }}></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {/* Primary Button - Report an Issue */}
            <Link
              to="/dashboard/citizen-report"
              className="group relative overflow-hidden rounded-2xl bg-white px-8 py-4 font-bold text-blue-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex items-center justify-center gap-3">
                <FaFlag className="transition-transform duration-300 group-hover:rotate-12" />
                <span>Report an Issue</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Secondary Button - Join Now */}
            <Link
              to="/register"
              className="group relative overflow-hidden rounded-2xl border-2 border-white bg-transparent px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white hover:text-blue-600 hover:shadow-2xl"
            >
              <div className="relative flex items-center justify-center gap-3">
                <FaUserPlus className="transition-transform duration-300 group-hover:scale-110" />
                <span>Join Now</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          {/* Bottom Stats or Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 border-t border-white/20 pt-8">
            <div className="group">
              <div className="mb-2 text-3xl font-black transition-transform duration-300 group-hover:scale-110">1000+</div>
              <div className="text-sm text-blue-100">Issues Resolved</div>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="group">
              <div className="mb-2 text-3xl font-black transition-transform duration-300 group-hover:scale-110">5000+</div>
              <div className="text-sm text-blue-100">Active Citizens</div>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div className="group">
              <div className="mb-2 text-3xl font-black transition-transform duration-300 group-hover:scale-110">24/7</div>
              <div className="text-sm text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" fillOpacity="0.1"/>
        </svg>
      </div>
    </section>
  );
};

export default CallToAction;