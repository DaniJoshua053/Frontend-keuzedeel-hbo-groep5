import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function Terms() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">{t('terms')}</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              By accessing and using the RedFlags website, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these terms, please do not use our website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Use of Website</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              You agree to use our website for lawful purposes only and in a way that does not infringe 
              the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
            <p className="mt-2">
              Prohibited behavior includes harassing or causing distress or inconvenience to any other user, 
              transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Product Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We strive to provide accurate product descriptions and images. However, we do not warrant that 
              product descriptions, colors, or other content available on the website is accurate, complete, 
              reliable, current, or error-free.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Pricing and Payment</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              All prices are listed in Euros (€) and include VAT where applicable. We reserve the right to 
              change prices at any time without notice. Payment must be received before your order is processed.
            </p>
            <p className="mt-2">
              We accept payment via iDEAL, credit card, and PayPal. All transactions are secure and encrypted.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Orders and Cancellations</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Once you place an order, you will receive an email confirmation. We reserve the right to refuse 
              or cancel any order for any reason, including product availability, errors in pricing or product 
              information, or problems identified by our fraud avoidance department.
            </p>
            <p className="mt-2">
              You may cancel your order within 2 hours of placement by contacting our customer service team.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Shipping and Delivery</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We ship to most countries worldwide. Delivery times vary depending on your location. 
              We are not responsible for delays caused by customs or postal services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the 
              property of RedFlags or its content suppliers and is protected by international copyright laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              RedFlags shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use of or inability to use the website or products.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
              use, and protect your personal information.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately 
              upon posting to the website. Your continued use of the website after changes are posted 
              constitutes your acceptance of the modified terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you have any questions about these Terms & Conditions, please contact us at:
            </p>
            <p className="mt-2">
              Email: info@redflags.com<br />
              Phone: +31 20 123 4567<br />
              Address: 123 Flag Street, Amsterdam, 1012 AB, Netherlands
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="text-sm text-muted-foreground mt-8 text-center">
        Last updated: February 5, 2026
      </p>
    </div>
  );
}
