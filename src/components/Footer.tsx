'use client';

export default function Footer() {
  return (
    <footer className="bg-[#b1b1b1] text-white py-4 mt-4 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Company Header */}
        <div className="text-center mb-3">
          <h2 className="text-xl font-bold mb-1">Impact Business Solutions Sdn Bhd</h2>
          <p className="text-[#f4f4f1] text-sm">Your Partner in IT Excellence</p>
          <p className="text-[#f4f4f1] mt-1 max-w-2xl mx-auto text-sm">
            We're committed to delivering cutting-edge IT solutions and expert support to elevate your business.
          </p>
        </div>

        {/* Copyright and Links */}
        <div className="border-t border-[#76767b] pt-4">
          <div className="text-center">
            <p className="text-[#f4f4f1] mb-2 text-sm">
              © Copyright Impact Business Solutions Sdn Bhd | 200501011778 (688826-H). All right reserved.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-[#2596be] hover:text-[#1e40af] transition-colors text-sm">Privacy Policy</a>
              <span className="text-[#76767b]">|</span>
              <a href="#" className="text-[#2596be] hover:text-[#1e40af] transition-colors text-sm">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}