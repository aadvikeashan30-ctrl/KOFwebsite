'use client';

import { useEffect, useState } from 'react';
import { FileText, Plus, X, Download } from 'lucide-react';

export default function AdminPayslips() {
  const [payslips, setPayslips] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    employee_id: '', month: '', year: new Date().getFullYear().toString(),
    basic_salary: '', hra: '', da: '', ta: '', pf_deduction: '', tax_deduction: '', bonus: ''
  });

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/payslips').then(r => r.json()),
      fetch('/api/admin/employees').then(r => r.json()),
    ]).then(([payData, empData]) => {
      setPayslips(payData.payslips || []);
      setEmployees(empData.employees || []);
    }).finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/payslips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        year: parseInt(form.year),
        basic_salary: parseFloat(form.basic_salary) || 0,
        hra: parseFloat(form.hra) || 0,
        da: parseFloat(form.da) || 0,
        ta: parseFloat(form.ta) || 0,
        pf_deduction: parseFloat(form.pf_deduction) || 0,
        tax_deduction: parseFloat(form.tax_deduction) || 0,
        bonus: parseFloat(form.bonus) || 0,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Payslip generated successfully!');
      setShowModal(false);
      // Refresh
      const payData = await fetch('/api/admin/payslips').then(r => r.json());
      setPayslips(payData.payslips || []);
    } else {
      setMessage(data.error);
    }
  };

  const handleSelectEmployee = (empId: string) => {
    const emp = employees.find(e => e.id === empId);
    if (emp) {
      setForm(prev => ({
        ...prev,
        employee_id: empId,
        basic_salary: emp.salary?.toString() || '',
        hra: (emp.salary * 0.2).toString(),
        da: (emp.salary * 0.1).toString(),
        ta: '2000',
        pf_deduction: (emp.salary * 0.12).toString(),
        tax_deduction: emp.salary > 40000 ? (emp.salary * 0.05).toString() : '0',
      }));
    }
  };

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payslips</h1>
          <p className="text-gray-600 mt-1">Generate and manage employee salary slips</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Generate Payslip
        </button>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl flex justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage('')}><X size={16} /></button>
        </div>
      )}

      {/* Payslips Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Employee</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Period</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Basic</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Deductions</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Net Salary</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Loading...</td></tr>
              ) : payslips.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">No payslips generated yet</td></tr>
              ) : (
                payslips.slice(0, 20).map((ps) => (
                  <tr key={ps.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{ps.employee_name}</p>
                      <p className="text-xs text-gray-500">{ps.emp_id} | {ps.department}</p>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{ps.month} {ps.year}</td>
                    <td className="py-4 px-4 text-gray-700">₹{ps.basic_salary?.toLocaleString()}</td>
                    <td className="py-4 px-4 text-red-600">-₹{((ps.pf_deduction || 0) + (ps.tax_deduction || 0)).toLocaleString()}</td>
                    <td className="py-4 px-4 font-bold text-green-700">₹{ps.net_salary?.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        ps.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {ps.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Payslip Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Generate Payslip</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={20} /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee *</label>
                <select required value={form.employee_id} onChange={(e) => handleSelectEmployee(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none">
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.emp_id})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Month *</label>
                  <select required value={form.month} onChange={(e) => setForm({...form, month: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="">Select</option>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                  <input type="number" required value={form.year} onChange={(e) => setForm({...form, year: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary *</label>
                  <input type="number" required value={form.basic_salary} onChange={(e) => setForm({...form, basic_salary: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">HRA</label>
                  <input type="number" value={form.hra} onChange={(e) => setForm({...form, hra: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DA</label>
                  <input type="number" value={form.da} onChange={(e) => setForm({...form, da: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TA</label>
                  <input type="number" value={form.ta} onChange={(e) => setForm({...form, ta: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
                  <input type="number" value={form.bonus} onChange={(e) => setForm({...form, bonus: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PF Deduction</label>
                  <input type="number" value={form.pf_deduction} onChange={(e) => setForm({...form, pf_deduction: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Deduction</label>
                  <input type="number" value={form.tax_deduction} onChange={(e) => setForm({...form, tax_deduction: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 btn-primary">Generate Payslip</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
