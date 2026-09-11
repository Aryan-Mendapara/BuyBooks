function Customers({ customers }) {
  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <p className="text-[10px] font-bold tracking-[2px] text-orange-600">
          CUSTOMER DIRECTORY
        </p>

        <h2 className="font-serif text-4xl font-bold">
          Customers
        </h2>
      </div>

      {/* Customer Table */}
      <div className="overflow-x-auto rounded-xl border border-[#e5dfd8] bg-[#fffdf9] p-5">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="pb-3">Email</th>
              <th className="pb-3">Mobile</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer._id}
                className="border-t border-[#eee8e1]"
              >
                <td className="py-3 font-semibold">
                  {customer.email}
                </td>

                <td className="py-3 text-gray-500">
                  {customer.mobileno || "-"}
                </td>

                <td className="py-3 text-green-700">
                  {customer.isVerified ? "Verified" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {!customers.length && (
          <p className="py-8 text-center text-sm text-gray-500">
            No customers found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Customers;