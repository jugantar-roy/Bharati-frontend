import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Bharati Kitchenware",
  description: "How we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl font-bold mb-8 border-b border-border pb-4">Privacy Policy</h1>
      
      <div className="prose prose-slate max-w-none text-muted-foreground space-y-6">
        <p>Last updated: October 1, 2024</p>
        
        <p>This Privacy Policy describes how Bharati Kitchenware ("we", "us", or "our") collects, uses, and discloses your Personal Information when you visit or make a purchase from our website.</p>
        
        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">1. Collecting Personal Information</h3>
        <p>When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.</p>
        <p>In this Privacy Policy, we refer to any information that can uniquely identify an individual as "Personal Information".</p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">2. Sharing Personal Information</h3>
        <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We use Shopify to power our online store.</li>
          <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">3. Security</h3>
        <p>We take reasonable precautions and follow industry best practices to make sure your personal information is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-4">4. Contact</h3>
        <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@bharatikitchen.com.</p>
      </div>
    </div>
  );
}
