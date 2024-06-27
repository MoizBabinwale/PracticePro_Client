import React, { useEffect } from "react";

function TermsAndCondition() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-lg mb-4">
          Welcome to Practise Pro. By accessing or using our website (the "Site") and services (the "Services"), you agree to comply with and be bound by the following terms and conditions ("Terms").
          Please read these Terms carefully before using our Site and Services.
        </p>

        <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
        <p className="text-lg mb-4">
          By accessing and using Practise Pro, you accept and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Site or Services.
        </p>

        <h2 className="text-2xl font-bold mb-2">2. Use of the Site and Services</h2>
        <h3 className="text-xl font-bold mb-1">2.1 Eligibility</h3>
        <p className="text-lg mb-4">You must be at least 10 years old to use our Site and Services. By using Practise Pro, you represent and warrant that you meet this age requirement.</p>

        <h3 className="text-xl font-bold mb-1">2.2 Account Registration</h3>
        <p className="text-lg mb-4">
          To access certain features of the Site, you may need to register for an account. You agree to provide accurate and complete information during the registration process and to keep this
          information up-to-date.
        </p>

        <h3 className="text-xl font-bold mb-1">2.3 User Conduct</h3>
        <p className="text-lg mb-4">You agree to use Practise Pro only for lawful purposes. You shall not:</p>
        <ul className="list-disc pl-4 mb-4">
          <li>Use the Site or Services in any way that violates any applicable local, state, national, or international law.</li>
          <li>Upload, post, or otherwise transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
          <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
          <li>Interfere with or disrupt the Site or Services or servers or networks connected to the Site or Services.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-2">3. Intellectual Property</h2>
        <p className="text-lg mb-4">
          All content on Practise Pro, including text, graphics, logos, icons, images, and software, is the property of Practise Pro or its content suppliers and is protected by international
          copyright laws. You may not reproduce, distribute, modify, or create derivative works from any content without prior written permission from Practise Pro.
        </p>

        <h2 className="text-2xl font-bold mb-2">4. Privacy</h2>
        <p className="text-lg mb-4">Your use of the Site and Services is also governed by our Privacy Policy. By using Practise Pro, you consent to the practices described in the Privacy Policy.</p>

        <h2 className="text-2xl font-bold mb-2">5. Disclaimers and Limitation of Liability</h2>
        <h3 className="text-xl font-bold mb-1">5.1 Disclaimers</h3>
        <p className="text-lg mb-4">
          The Site and Services are provided "as is" and "as available" without warranties of any kind, either express or implied. Practise Pro does not warrant that the Site or Services will be
          uninterrupted or error-free.
        </p>

        <h3 className="text-xl font-bold mb-1">5.2 Limitation of Liability</h3>
        <p className="text-lg mb-4">
          In no event shall Practise Pro, its affiliates, or their respective directors, officers, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive
          damages arising out of or related to your use of the Site or Services.
        </p>

        <h2 className="text-2xl font-bold mb-2">6. Indemnification</h2>
        <p className="text-lg mb-4">
          You agree to indemnify, defend, and hold harmless Practise Pro, its affiliates, and their respective directors, officers, employees, and agents from and against any and all claims, damages,
          losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Site or Services or any violation of these Terms.
        </p>

        <h2 className="text-2xl font-bold mb-2">7. Termination</h2>
        <p className="text-lg mb-4">
          Practise Pro reserves the right to terminate your access to the Site and Services at any time, without notice, for any reason, including but not limited to a breach of these Terms.
        </p>

        <h2 className="text-2xl font-bold mb-2">8. Changes to Terms</h2>
        <p className="text-lg mb-4">
          Practise Pro may revise these Terms at any time by updating this page. Your continued use of the Site and Services after any changes to these Terms constitutes your acceptance of the revised
          Terms.
        </p>

        <h2 className="text-2xl font-bold mb-2">9. Governing Law</h2>
        <p className="text-lg mb-4">
          These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Practise Pro operates, without regard to its conflict of law principles.
        </p>
        <h2 className="text-2xl font-bold mb-2">10. Non-Refundable Policy</h2>
        <p className="text-lg mb-4">
          All payments made on Practise Pro are non-refundable. By making a payment, you acknowledge that you have read and understood our non-refundable policy and agree to be bound by it.
        </p>
        <p className="text-lg mb-4">
          We do not offer refunds or exchanges for any reason, including but not limited to:
          <ul className="list-disc pl-4 mb-4">
            <li>Change of mind or cancellation of services</li>
            <li>Dissatisfaction with our services</li>
            <li>Technical issues or errors</li>
          </ul>
        </p>
        <p className="text-lg mb-4">By using our Site and Services, you agree to waive any right to a refund or exchange, and acknowledge that all payments are final.</p>
      </div>
    </div>
  );
}

export default TermsAndCondition;
