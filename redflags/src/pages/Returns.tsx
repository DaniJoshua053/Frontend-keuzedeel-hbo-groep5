import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CheckCircle } from 'lucide-react';

export function Returns() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">{t('returns')}</h1>

      <div className="mb-8 bg-accent p-6 rounded-lg">
        <h3 className="mb-4">30-Day Return Policy</h3>
        <p className="text-muted-foreground">
          We want you to be completely satisfied with your purchase. If you're not happy with your order, 
          you can return it within 30 days for a full refund or exchange.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Return Eligibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p>Items must be unused and in their original condition</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p>Original packaging and tags must be intact</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p>Return must be initiated within 30 days of delivery</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p>Proof of purchase (order number or receipt) is required</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Return an Item</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ol className="space-y-3">
              <li>
                <strong>Contact Us:</strong> Email us at returns@redflags.com with your order number 
                and reason for return. We'll respond within 24 hours with return instructions.
              </li>
              <li>
                <strong>Prepare Your Package:</strong> Pack the item securely in its original packaging. 
                Include all tags, accessories, and documentation.
              </li>
              <li>
                <strong>Ship Your Return:</strong> Use the prepaid shipping label we provide (for returns 
                within the Netherlands) or ship via your preferred carrier.
              </li>
              <li>
                <strong>Receive Your Refund:</strong> Once we receive and inspect your return, we'll process 
                your refund within 5-7 business days.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Return Shipping Costs</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              <strong>Netherlands:</strong> We provide a prepaid return shipping label free of charge.
            </p>
            <p className="mt-2">
              <strong>International Orders:</strong> Customers are responsible for return shipping costs. 
              We recommend using a trackable shipping service.
            </p>
            <p className="mt-2">
              <strong>Defective or Incorrect Items:</strong> If you received a defective or incorrect item, 
              we'll cover all return shipping costs.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Refunds</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Refunds will be issued to your original payment method within 5-7 business days after we 
              receive and inspect your return. You'll receive an email confirmation when your refund 
              has been processed.
            </p>
            <p className="mt-2">
              Please note that it may take an additional 3-5 business days for the refund to appear 
              in your account, depending on your bank or credit card company.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exchanges</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you'd like to exchange an item for a different size or product, please follow the 
              return process and place a new order for the item you want. This ensures you receive 
              your new item as quickly as possible.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Non-Returnable Items</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>The following items cannot be returned:</p>
            <ul className="mt-2 space-y-1">
              <li>Custom or personalized flags</li>
              <li>Sale or clearance items marked as "Final Sale"</li>
              <li>Items that have been used or damaged by the customer</li>
              <li>Items without original packaging or tags</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Damaged or Defective Items</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you receive a damaged or defective item, please contact us immediately at 
              support@redflags.com with photos of the damage. We'll arrange for a replacement 
              or full refund, including any shipping costs.
            </p>
            <p className="mt-2">
              Please report any damage or defects within 7 days of receiving your order.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you have any questions about our return policy, please don't hesitate to contact us:
            </p>
            <p className="mt-2">
              Email: returns@redflags.com<br />
              Phone: +31 20 123 4567<br />
              Hours: Monday-Friday, 9:00 AM - 6:00 PM CET
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
