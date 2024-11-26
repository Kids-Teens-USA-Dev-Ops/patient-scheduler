import React, { useState } from 'react';
import { Search, Filter, FileUp, Download, Phone, UserCheck, AlertCircle } from 'lucide-react';

export default function PatientScheduler() {
  const [selectedClinic, setSelectedClinic] = useState('All Clinics');
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const currentUser = "User123";
  
  const clinics = ['All Clinics', 'Main Clinic', 'West Side', 'East Side'];
  const patients = [
    { 
      id: 1, 
      pid: "P123456",
      name: "Jane Smith", 
      lastPhysical: "2023-01-15", 
      clinic: "Main Clinic", 
      phone: "(555) 123-4567", 
      status: "PENDING",
      claimedBy: null,
      claimExpiry: null
    },
    { 
      id: 2, 
      pid: "P123457",
      name: "John Doe", 
      lastPhysical: "2023-02-01", 
      clinic: "West Side", 
      phone: "(555) 234-5678", 
      status: "PENDING",
      claimedBy: "User123",
      claimExpiry: new Date(Date.now() + 15 * 60000)
    }
  ];

  const OutcomeModal = ({ patient, onClose }) => {
    const [reason, setReason] = useState('');
    const [newAppointmentDate, setNewAppointmentDate] = useState('');

    const handleOutcome = (outcome) => {
      if (outcome === 'no-answer') {
        console.log(`Adding ${patient.pid} to "didn't answer" group`);
      } else if (outcome === 'rescheduled') {
        console.log(`Adding ${patient.pid} to "successful reschedule" group, date: ${newAppointmentDate}`);
      } else if (outcome === 'declined') {
        console.log(`Adding ${patient.pid} to "declined reschedule" group, reason: ${reason}`);
      }
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-red-500 p-4 text-white">Test Element</div>
        <div className="bg-white p-6 rounded-lg w-96">
          <h3 className="text-lg font-bold mb-4">Contact Outcome - {patient.name}</h3>
          <div className="space-y-4">
            <button
              onClick={() => handleOutcome('no-answer')}
              className="w-full p-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Didn't Answer
            </button>
            
            <div className="border-t pt-4">
              <button
                onClick={() => handleOutcome('rescheduled')}
                className="w-full p-2 bg-green-100 hover:bg-green-200 rounded mb-2"
              >
                Successful Reschedule
              </button>
              <input
                type="date"
                value={newAppointmentDate}
                onChange={(e) => setNewAppointmentDate(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Appointment Date"
              />
            </div>
            
            <div className="border-t pt-4">
              <button
                onClick={() => handleOutcome('declined')}
                className="w-full p-2 bg-red-100 hover:bg-red-200 rounded mb-2"
              >
                Declined Reschedule
              </button>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter reason for declining"
                rows="3"
              />
            </div>

            <button
              onClick={onClose}
              className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded mt-4"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {showOutcomeModal && selectedPatient && (
        <OutcomeModal 
          patient={selectedPatient} 
          onClose={() => {
            setShowOutcomeModal(false);
            setSelectedPatient(null);
          }} 
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Physical Scheduler</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <FileUp size={20} />
            Upload Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">
            <Download size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 w-full border rounded"
          />
        </div>
        <select
          value={selectedClinic}
          onChange={(e) => setSelectedClinic(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          {clinics.map(clinic => (
            <option key={clinic} value={clinic}>{clinic}</option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Physical</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clinic</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map(patient => {
              const isClaimed = patient.claimedBy !== null;
              const isClaimedByMe = patient.claimedBy === currentUser;
              return (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{patient.pid}</td>
                  <td className="px-6 py-4">{patient.name}</td>
                  <td className="px-6 py-4">{patient.lastPhysical}</td>
                  <td className="px-6 py-4">{patient.clinic}</td>
                  <td className="px-6 py-4">{patient.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        !isClaimed ? 'bg-green-500' :
                        isClaimedByMe ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span className="text-sm">
                        {!isClaimed ? 'Available' :
                         isClaimedByMe ? 'Claimed by you' : 'Claimed by other'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {!isClaimed && (
                        <button 
                          onClick={() => console.log(`Claiming patient ${patient.pid}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded flex items-center gap-1"
                          title="Claim to Contact"
                        >
                          <UserCheck size={20} />
                          <span>Claim (15m)</span>
                        </button>
                      )}
                      {isClaimedByMe && (
                        <button 
                          onClick={() => {
                            setSelectedPatient(patient);
                            setShowOutcomeModal(true);
                          }}
                          className="p-2 text-green-600 hover:bg-green-50 rounded flex items-center gap-1"
                          title="Record Outcome"
                        >
                          <Phone size={20} />
                          <span>Record Outcome</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}