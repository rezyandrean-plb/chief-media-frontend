import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-12" style={{ backgroundColor: "#273F4F" }}>
      <div className="w-full px-[7vw]">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/chiefmedia.png"
                alt="Chief Media Logo"
                className="h-20 w-auto"
              />
            </div>
            <p className="text-white/80">
              Connecting real estate professionals with premium media services and studio spaces.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Service</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="/vendors" className="hover:text-white transition-colors">
                  Photography
                </a>
              </li>
              <li>
                <a href="/vendors" className="hover:text-white transition-colors">
                  Videography
                </a>
              </li>
              <li>
                <a href="/vendors" className="hover:text-white transition-colors">
                  Drone Services
                </a>
              </li>
              <li>
                <a href="/vendors" className="hover:text-white transition-colors">
                  Virtual Tours
                </a>
              </li>
              <li>
                <a href="/vendors" className="hover:text-white transition-colors">
                  Copywriting
                </a>
              </li>
              <li>
                <a href="/vendors" className="hover:text-white transition-colors">
                  Social Media
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Resource</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="/become-vendor" className="hover:text-white transition-colors">
                  Become a Chief Media Vendor
                </a>
              </li>
              <li>
                <a href="/studios" className="hover:text-white transition-colors">
                  Studio Booking
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Chief Media
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/press" className="hover:text-white transition-colors">
                  Press Releases
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>Chief Media ® is a part of KW Singapore Real Estate Pte. Ltd.</p>
          <p>Copyright © 2025 KW Singapore Official Gig Economy Vendor</p>
        </div>
      </div>
    </footer>
  )
}
