import { getOffices } from '@/utils/content';
import ContactClient from './ContactClient';

export default function ContactPage() {
  const offices = getOffices({ includeDirectoryOnly: true });
  return <ContactClient offices={offices} />;
}
