import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
     
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className=" p-2 rounded-lg">
                <Image
                  src="/assets/job-search.png"
                  alt="job-search_logo"
                  width={50}
                  height={50}
                />
              </div>
              <span className="text-2xl font-bold text-gray-100">
                Job
                <span className="text-[#EC2E3A]">Hunt</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting talented professionals with amazing opportunities
              worldwide. Your career journey starts here.
            </p>
          
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">For Job Seekers</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/browse-jobs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link
                  href="/salary-guide"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Salary Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-builder"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

      
          <div>
            <h4 className="text-lg font-semibold mb-6">For Employers</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/post-job"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/browse-resumes"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Resumes
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/employer-resources"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Enterprise Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Job Hunt. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
