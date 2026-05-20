'use client';

import { useEffect, useState } from 'react';
import { FileText, Download, IndianRupee } from 'lucide-react';

export default function EmployeePayslips() {
  const [payslips, setPayslips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    fetch('/api/employee/payslips')
      .then(r => r.json())
      .then(data => setPayslips(data.payslips || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Payslips</h1>
        <p className="text-gray-600 mt-1">View and download your monthly salary slips</p>
      </div>

      {loading ? (
        <div className="text-center py-12"><div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : (
        <div className="grid gap-4">
          {payslips.map((ps) => (
            <div key={ps.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <FileText size={24} className="text-green-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{ps.month} {ps.year}</p>
                    <p className="text-sm text-gray-500">Generated: {ps.generated_date?.split(' ')[0]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Net Salary</p>
                    <p className="text-xl font-bold text-green-700">₹{ps.net_salary?.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => setSelected(selected?.id === ps.id ? null : ps)}
                    className="px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-sm font-medium transition-colors"
                  >
                    {selected?.id === ps.id ? 'Hide' : 'View Details'}
                  </button>
                </div>
              </div>

              {/* Detailed payslip view */}
              {selected?.id === ps.id && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4 text-center">SALARY SLIP - {ps.month} {ps.year}</h4>
                    <div className="text-center text-sm text-gray-600 mb-6">
                      <p className="font-medium">KOF Chitradurga - Regional Oilseeds Growers&apos; Co-operative Society Union Ltd.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Earnings */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Earnings</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Basic Salary</span>
                            <span className="font-medium">₹{ps.basic_salary?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">HRA</span>
                            <span className="font-medium">₹{ps.hra?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">DA</span>
                            <span className="font-medium">₹{ps.da?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">TA</span>
                            <span className="font-medium">₹{ps.ta?.toLocaleString()}</span>
                          </div>
                          {ps.bonus > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Bonus</span>
                              <span className="font-medium">₹{ps.bonus?.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm pt-2 border-t border-gray-200 font-bold">
                            <span>Total Earnings</span>
                            <span className="text-green-700">₹{(ps.basic_salary + ps.hra + ps.da + ps.ta + ps.bonus).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Deductions */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Deductions</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Provident Fund</span>
                            <span className="font-medium text-red-600">₹{ps.pf_deduction?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tax (TDS)</span>
                            <span className="font-medium text-red-600">₹{ps.tax_deduction?.toLocaleString()}</span>
                          </div>
                          {ps.other_deductions > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Other</span>
                              <span className="font-medium text-red-600">₹{ps.other_deductions?.toLocaleString()}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm pt-2 border-t border-gray-200 font-bold">
                            <span>Total Deductions</span>
                            <span className="text-red-600">₹{(ps.pf_deduction + ps.tax_deduction + ps.other_deductions).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Net Pay */}
                    <div className="mt-6 pt-4 border-t-2 border-green-200 bg-green-50 -mx-6 -mb-6 px-6 py-4 rounded-b-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-gray-900">NET PAY</span>
                        <span className="text-2xl font-bold text-green-700">₹{ps.net_salary?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {payslips.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No payslips available yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
