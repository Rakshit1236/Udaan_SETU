import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Briefcase, MapPin, Download, MessageSquare, Check, X } from 'lucide-react';

export const CandidatesPage: React.FC = () => {
  const { students, updateCandidateStatus } = useApp();
  // Filter only students who are "Seeking" or "Interning" for demo purposes of candidates list
  const applicants = students.slice(0, 5); 
  const [statuses, setStatuses] = useState<Record<string, string>>({});

  const handleStatusUpdate = (id: string, status: 'Shortlisted' | 'Rejected') => {
    updateCandidateStatus(id, status);
    setStatuses(prev => ({ ...prev, [id]: status }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
           <p className="text-gray-600">Review applications for your posted roles.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
             <option>All Jobs</option>
             <option>Frontend Developer</option>
             <option>Data Analyst</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applicants.map((candidate) => {
          const status = statuses[candidate.id];
          return (
            <Card key={candidate.id} className={`transition-all ${status === 'Rejected' ? 'opacity-60 bg-gray-50' : ''} ${status === 'Shortlisted' ? 'border-green-200 bg-green-50/20' : ''}`}>
              <div className="flex flex-col sm:flex-row gap-6 p-2">
                <div className="flex-shrink-0">
                  <img src={candidate.avatar} alt={candidate.name} className="w-20 h-20 rounded-full object-cover bg-gray-100" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                      <p className="text-gray-600">{candidate.department} Engineering • {candidate.year} Year</p>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="outline" size="sm"><MessageSquare size={16} className="text-gray-500"/></Button>
                       <Button variant="outline" size="sm"><Download size={16} className="text-gray-500"/></Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">GPA: <span className="text-gray-900 font-semibold">{candidate.gpa}</span></span>
                    <span>|</span>
                    <span>Applying for: <span className="text-[#1976D2] font-medium">Frontend Intern</span></span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {candidate.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Area */}
                <div className="flex flex-col justify-center gap-2 border-l border-gray-100 pl-0 sm:pl-6 pt-4 sm:pt-0 min-w-[140px]">
                  {status ? (
                     <div className={`text-center font-bold px-3 py-2 rounded-lg ${status === 'Shortlisted' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                       {status}
                     </div>
                  ) : (
                    <>
                      <Button onClick={() => handleStatusUpdate(candidate.id, 'Shortlisted')} className="w-full sm:w-auto" size="sm">
                        <Check size={16} className="mr-2" /> Shortlist
                      </Button>
                      <Button onClick={() => handleStatusUpdate(candidate.id, 'Rejected')} variant="outline" className="w-full sm:w-auto text-red-600 hover:bg-red-50 border-red-200" size="sm">
                        <X size={16} className="mr-2" /> Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
