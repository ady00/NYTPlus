import React from 'react'
import { Heading } from '@radix-ui/themes'

export const metadata = {
  title: 'Terms',
  description: 'Terms of service',
}

const Page = () => {
  return (
    <div className="relative flex flex-col w-full gap-2 p-5 overflow-hidden border border-gray-300 rounded-md shadow-sm bg-gold-25 group">
      <Heading size="5">Terms of Service for NYTPlus</Heading>
      <p>
      </p>
      <div className="flex flex-col gap-4 m-auto mt-4 mb-8 max-w-prose">
        <Heading size="5">1. Introduction</Heading>
        <p>
          Welcome to NYTPlus, a collaborative online platform for solving
          crossword puzzles with friends. These Terms of Service (“Terms”)
          govern your access to and use of NYTPlus, including any related
          services, features, content, and applications offered by NYTPlus ("we",
          "us", or "our"). By accessing or using NYTPlus, you agree to be bound
          by these Terms and acknowledge our about.
        </p>
        <Heading size="5">2. User Eligibility</Heading>
        <p>
          The Service is not targeted towards, nor intended for use by, anyone
          under the age of 13. If you are under 13, you are not permitted to use
          the Service. By using NYTPlus, you represent and warrant that you meet
          all eligibility requirements outlined in these Terms.
        </p>
        <Heading size="5">3. Account Registration and Use</Heading>
        <p>
          You agree to create your account in NYTPlus using an existing social
          sign-on service and to provide accurate, current, and complete
          information. You are responsible for safeguarding the password used to
          access NYTPlus and for any activities or actions under your account.
        </p>
        <Heading size="5">4. User Conduct and Content</Heading>
        <p>
          You are solely responsible for the content you upload, including the
          legality, reliability, and appropriateness of the content. You agree
          not to upload any content that infringes upon the intellectual
          property rights of others, is sexually explicit, offensive,
          defamatory, or otherwise objectionable.
        </p>
        <Heading size="5">5. about</Heading>
        <p>
          Your use of NYTPlus is subject to our about, which explains
          how we collect, use, and share your personal information. By using
          NYTPlus, you agree to the collection, use, and sharing of your data as
          set forth in our about.
        </p>
        <Heading size="5">6. Intellectual Property</Heading>
        <p>
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of NYTPlus and its licensors.
          Our trademarks and trade dress may not be used in connection with any
          product or service without the prior written consent of NYTPlus.
        </p>
        <Heading size="5">7. Modification and Termination of Service</Heading>
        <p>
          We reserve the right to change or discontinue, temporarily or
          permanently, the Service (or any part thereof) with or without notice.
          We will not be liable to you or to any third party for any
          modification, suspension, or discontinuance of the Service.
        </p>
        <Heading size="5">8. Disclaimer of Warranties</Heading>
        <p>
          Your use of NYTPlus is at your sole risk. The Service is provided on an
          “AS IS” and “AS AVAILABLE” basis. We disclaim all warranties, express
          or implied, including, but not limited to, implied warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
        <Heading size="5">9. Limitation of Liability</Heading>
        <p>
          In no event will NYTPlus, its directors, employees, partners, agents,
          suppliers, or affiliates, be liable for any indirect, incidental,
          special, consequential, or punitive damages, including without
          limitation, loss of profits, data, use, goodwill, or other intangible
          losses, resulting from your access to or use of or inability to access
          or use the Service.
        </p>
        <Heading size="5">10. Governing Law and Dispute Resolution</Heading>
        <p>
          These Terms shall be governed and construed in accordance with the
          laws of Ontario, without regard to its conflict of law provisions. Our
          failure to enforce any right or provision of these Terms will not be
          considered a waiver of those rights.
        </p>
        <Heading size="5">11. Contact Information</Heading>
        <p>
          For any questions about these Terms, please contact us at
          m@eamonma.com.
        </p>
      </div>
    </div>
  )
}

export default Page
