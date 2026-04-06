import { useEffect, useState } from 'react';
import api from '@/utils/api';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({
    totalPageViews: 0,
    mostVisitedPages: [],
    eventCounts: {}
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/logs');
        const logs = res.data;
        const pageViews = logs.filter(log => log.type === 'PAGE_VIEW').length;
        const pageCounts = {};
        logs.forEach(log => {
          if (log.type === 'PAGE_VIEW' && log.meta?.page) {
            pageCounts[log.meta.page] = (pageCounts[log.meta.page] || 0) + 1;
          }
        });
        const mostVisited = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]);
        const eventCounts = {};
        logs.forEach(log => {
          eventCounts[log.type] = (eventCounts[log.type] || 0) + 1;
        });
        setAnalytics({
          totalPageViews: pageViews,
          mostVisitedPages: mostVisited,
          eventCounts
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Page Views: {analytics.totalPageViews}</p>
      <h2>Most Visited Pages</h2>
      <ul>
        {analytics.mostVisitedPages.map(([page, count]) => (
          <li key={page}>{page}: {count}</li>
        ))}
      </ul>
      <h2>Event Counts</h2>
      <ul>
        {Object.entries(analytics.eventCounts).map(([type, count]) => (
          <li key={type}>{type}: {count}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;