'use client'
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography } from '@mui/material';

// Define the type for an individual event
interface Event {
  date: string;
  title: string;
}

// Define the type for the props of the EventTimeline component
interface EventTimelineProps {
  events: Event[];
  onEventClick: (date: string) => void;
  title: string;
}

const EventTimeline: React.FC<EventTimelineProps> = ({ events, onEventClick, title }) => {
  return (
    <DashboardCard title={title}>
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: '-40px',
          '& .MuiTimelineConnector-root': {
            width: '1px',
            backgroundColor: '#efefef'
          },
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {events.map((event: Event, index: number) => (
          <TimelineItem
            key={index}
            onClick={() => onEventClick(event.date)}
            style={{ cursor: 'pointer' }}
          >
            <TimelineOppositeContent>{event.date}</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              {index < events.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>{event.title}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </DashboardCard>
  );
};

// Define the type for the props of the UpcomingEvents component
interface UpcomingEventsProps {
  events: Event[];
  onEventClick: (date: string) => void;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, onEventClick }) => {
  const upcomingEvents = events.filter((event) => new Date(event.date) >= new Date());
  return <EventTimeline events={upcomingEvents} onEventClick={onEventClick} title="Upcoming Events" />;
};

export default UpcomingEvents;
