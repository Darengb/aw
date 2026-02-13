import { getEvents } from '@/utils/content';
import EventsClient from './EventsClient';

export default function EventsPage() {
  const events = getEvents();
  return <EventsClient events={events} />;
}
