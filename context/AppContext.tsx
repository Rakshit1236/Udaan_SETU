import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Internship, LogbookEntry, Notification, Student, UserRole } from '../types';
import { MOCK_USER, MOCK_INTERNSHIPS, MOCK_LOGBOOK, MOCK_NOTIFICATIONS, MOCK_STUDENTS } from '../constants';

interface AppContextType {
  user: User | null;
  internships: Internship[];
  logbookEntries: LogbookEntry[];
  notifications: Notification[];
  students: Student[];
  login: (role: UserRole, name?: string) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  addLogEntry: (entry: LogbookEntry) => void;
  applyForInternship: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  postInternship: (internship: Internship) => void;
  updateStudentStatus: (id: string, status: 'Placed' | 'Interning' | 'Seeking') => void;
  updateCandidateStatus: (studentId: string, status: 'Shortlisted' | 'Rejected') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [internships, setInternships] = useState<Internship[]>(MOCK_INTERNSHIPS);
  const [logbookEntries, setLogbookEntries] = useState<LogbookEntry[]>(MOCK_LOGBOOK);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);

  const login = (role: UserRole, name?: string) => {
    const newUser = { ...MOCK_USER, role, name: name || MOCK_USER.name };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addLogEntry = (entry: LogbookEntry) => {
    setLogbookEntries([entry, ...logbookEntries]);
  };

  const applyForInternship = (id: string) => {
    setInternships(prev => prev.map(i => 
      i.id === id ? { ...i, applicants: i.applicants + 1, status: 'Closed' } : i // Simulating "Applied" by incrementing count
    ));
    // Add a notification for the user
    const newNotif: Notification = {
      id: `n${Date.now()}`,
      title: 'Application Sent',
      message: 'Your application has been successfully submitted.',
      date: 'Just now',
      read: false,
      type: 'success'
    };
    setNotifications([newNotif, ...notifications]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const postInternship = (internship: Internship) => {
    setInternships([internship, ...internships]);
  };

  const updateStudentStatus = (id: string, status: 'Placed' | 'Interning' | 'Seeking') => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const updateCandidateStatus = (studentId: string, status: 'Shortlisted' | 'Rejected') => {
    // In a real app, this would update an application record. 
    // Here we'll just show a notification or update the mock student list for demo.
    console.log(`Candidate ${studentId} marked as ${status}`);
  };

  return (
    <AppContext.Provider value={{
      user,
      internships,
      logbookEntries,
      notifications,
      students,
      login,
      logout,
      updateUserProfile,
      addLogEntry,
      applyForInternship,
      markNotificationRead,
      markAllNotificationsRead,
      postInternship,
      updateStudentStatus,
      updateCandidateStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
