import React, { useEffect, useState } from "react";

const DynamicTable = ({ apiEndpoint }) => {
  const [fields, setFields] = useState([]); // Table columns
  const [rawData, setRawData] = useState([]); // Raw table data
  const [loading, setLoading] = useState(false); // Loading state
  const [sortField, setSortField] = useState(null); // Field for sorting
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting order
  const [filter, setFilter] = useState(""); // Filter value

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiEndpoint}?sortField=${sortField || ""}&sortOrder=${sortOrder}&filter=${filter}`
      );
      const result = await response.json();
      setFields(result.fields || []);
      setRawData(result.data || []);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [sortField, sortOrder, filter]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Map raw data dynamically based on fields
  const data = rawData.map((row) =>
    fields.reduce((acc, field, index) => {
      acc[field] = row[index];
      return acc;
    }, {})
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-600">Dynamic Table</h2>
        <input
          type="text"
          placeholder="Filter..."
          className="border p-2 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              {fields.map((field) => (
                <th
                  key={field}
                  className="border p-2 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort(field)}
                >
                  {field}
                  {sortField === field && (
                    <span className="ml-2">
                      {sortOrder === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={fields.length} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  {fields.map((field) => (
                    <td key={field} className="border p-2">
                      {row[field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={fields.length} className="text-center p-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
