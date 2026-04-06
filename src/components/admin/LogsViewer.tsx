import { useEffect, useState } from 'react';
import api from '@/utils/api';

const LogsViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/logs');
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      }
    };
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(log => !filter || log.type === filter);

  return (
    <div>
      <h1>Logs Viewer</h1>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="">All</option>
        <option value="PAGE_VIEW">PAGE_VIEW</option>
        <option value="USER_ACTION">USER_ACTION</option>
        <option value="ERROR">ERROR</option>
      </select>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Type</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.type}</td>
              <td>{log.message}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsViewer;