import { FC } from 'react';
import { Search, MessageSquare, FileText, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'How do I create a new project?',
    answer:
      'To create a new project, navigate to the Projects page and click the "New Project" button. Fill in the project details such as name, description, and deadline, then click "Create Project" to save.',
  },
  {
    question: 'How can I invite team members?',
    answer:
      'You can invite team members from the Team page. Click "Add Team Member" and enter their email address. They will receive an invitation to join your workspace.',
  },
  {
    question: 'What are the available payment methods?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. For enterprise customers, we also offer invoice-based payments.',
  },
  {
    question: 'How do I reset my password?',
    answer:
      'Click "Forgot Password" on the login page and enter your email address. You will receive instructions to reset your password via email.',
  },
  {
    question: 'Can I export my data?',
    answer:
      'Yes, you can export your data from the Settings page. Go to Privacy settings and click "Export Data". You can choose between various export formats.',
  },
];

const supportChannels = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    action: 'Start Chat',
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email Support',
    description: 'Send us an email, we usually respond within 24 hours',
    action: 'Send Email',
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Phone Support',
    description: 'Schedule a call with our support team',
    action: 'Schedule Call',
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Documentation',
    description: 'Browse our detailed documentation',
    action: 'View Docs',
  },
];

const Support: FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="mt-2 text-muted-foreground">
          Get help with your questions and issues
        </p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search for help articles, tutorials, and FAQs..."
          />
        </div>
        <Button>Search</Button>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {supportChannels.map((channel, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  {channel.icon}
                </div>
                <div>
                  <CardTitle className="text-base">{channel.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {channel.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                {channel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find quick answers to common questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Support; 