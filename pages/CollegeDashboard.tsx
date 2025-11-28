import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, Building, FileCheck, TrendingUp } from 'lucide-react';

const PLACEMENT_DATA = [
  { name: 'CS', placed: 85, total: 120 },
  { name: 'IT', placed: 78, total: 100 },
  { name: 'ECE', placed: 45, total: 90 },
  { name: 'MECH', placed: 60, total: 80 },
];

const STATUS_DATA = [
  { name: 'Placed', value: 340, color: '#48C78E' },
  { name: 'Interning', value: 120, color: '#1976D2' },
  { name: 'Seeking', value: 80, color: '#FFBB28' },
];

export const CollegeDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">College Overview</h1>
        <div className="flex gap-2">
          <Button variant="outline">Download Report</Button>
          <Button>Approve Internships</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: '1,200', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Industry Partners', value: '45', icon: Building, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Active Internships', value: '342', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending Approvals', value: '18', icon: FileCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, idx) => (
          <Card key={idx} className="flex items-center p-4">
             <div className={`p-3 rounded-lg mr-4 ${stat.bg}`}>
               <stat.icon className={`w-6 h-6 ${stat.color}`} />
             </div>
             <div>
               <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
               <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
             </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Department-wise Placement" className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PLACEMENT_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="placed" name="Placed" fill="#1976D2" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" name="Total Students" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Student Status Distribution" className="h-96">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={STATUS_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {STATUS_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {STATUS_DATA.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Recent Internship Approvals">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">Rahul Verma</td>
                  <td className="px-6 py-4">Google</td>
                  <td className="px-6 py-4">Software Eng. Intern</td>
                  <td className="px-6 py-4">Oct 24, 2023</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pending</span></td>
                  <td className="px-6 py-4">
                    <Button size="sm" variant="outline">Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
