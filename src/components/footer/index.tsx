import { getSettings } from "@/lib/prismic-settings";
import { FooterCTA } from "./molecules/footer-cta";
import { ContactInfo } from "./molecules/contact-info";
import { FooterLinksGrid } from "./molecules/footer-links-grid";
import { FooterBottom } from "./molecules/footer-bottom";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const settings = await getSettings();

  return (
    <footer id="contact" className="relative bg-[#0F0F0F] text-white overflow-hidden">
      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-[#4A6FA5] via-[#3B5F52] to-[#F2B544]" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            {/* Left Column - CTA */}
            <FooterCTA
              heading={settings.data.heading}
              description={settings.data.description}
            />

            {/* Right Column - Contact Info */}
            <ContactInfo contacts={settings.data.contact} />
          </div>

          {/* Footer Links Grid */}
          <FooterLinksGrid
            services={settings.data.services}
            navigation={settings.data.navigation}
          />
        </div>

        {/* Bottom Bar */}
        <FooterBottom
          websiteName={settings.data.website_name}
          currentYear={currentYear}
          socialMedia={settings.data.social_media}
        />
      </div>
    </footer>
  );
}

