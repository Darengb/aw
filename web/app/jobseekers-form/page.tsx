import { getOffices } from '@/utils/content';
import JobseekersFormClient from './JobseekersFormClient';

export default function JobseekersFormPage() {
  const offices = getOffices().map(o => ({
    title: o.title,
    state: o.state,
    zip: o.zip,
  }));
  return <JobseekersFormClient offices={offices} />;
}
