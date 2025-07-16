import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import ContactForm from "@/components/hero/ContactForm";
import { MorphingText } from "@/components/ui/MorphingText";

const Contact = () => {

  return (
    <div>
      <div>
        <h3 className="text-xl text-center lg:pt-24 pt-10 text-teal-600">Contact</h3>
        <MorphingText
          texts={["Get", "in", "Touch"]}
          className="text-primaryLight text-4xl"
        />
        <p className="text-center pt-4 dark:text-gray-300 text-gray-400 text-xl">
          We'd love to hear from you! Reach out to us with any questions,
          feedback, <br /> or inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 md:pt-16 items-stretch">
        {/* contact form */}
        <ContactForm/>

        {/* contact info */}
        <Card className="h-full rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-card to-muted/50">
          <CardHeader>
            <CardTitle className="text-2xl">Contact Information</CardTitle>
            <CardDescription>
              You can also reach us through the following channels:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground">lalbagh, Sador, Rangpur</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-muted-foreground">+880 568450889</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">
                  naimurrahmun34@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-muted-foreground">
                  Available from 9:00 AM to 10:00 PM
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Start Chat
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Opening Hours</h3>
                <ul className="text-muted-foreground space-y-1 mt-1">
                  <li className="flex justify-between">
                    <span>Saturday - Thursday:</span>
                    <span>9:00 AM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">Need Urgent Assistance?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our customer service team is available 24/7 for urgent
                inquiries.
              </p>
              <Button variant="secondary" className="w-full">
                <Phone className="mr-2 h-4 w-4" /> Call Hotline
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
