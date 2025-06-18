import React from "react";

interface FilterT {
  title: string;
  location: string;
  salary: number;
  type: string;
}

const Sidebar = ({
  filters,
  setFilters,
}: {
  filters: FilterT;
  setFilters: React.Dispatch<React.SetStateAction<FilterT>>;
}) => {
  const handleCheckboxChange = (key: keyof FilterT, value: string) => {
    setFilters((prev: FilterT) => {
      const currentValue = prev[key];

      if (Array.isArray(currentValue)) {
        return {
          ...prev,
          [key]: currentValue.includes(value)
            ? currentValue.filter((item) => item !== value)
            : [...currentValue, value],
        };
      }

      console.error(`Invalid field "${key}" for checkbox change`);
      return prev;
    });
  };

  const handleInputChange = (key: string, value: string | number) => {
    setFilters((prev: FilterT) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="w-1/4 p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

    
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          placeholder="e.g., Developer"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          placeholder="e.g., Remote"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Salary (Min)
        </label>
        <input
          type="number"
          placeholder="e.g., 50000"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => handleInputChange("salary", Number(e.target.value))}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Type
        </label>
        <div className="flex flex-col">
          {["Full-Time", "Part-Time", "Internship"].map((type) => (
            <label key={type} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                checked={filters.type?.includes(type) || false}
                onChange={() => handleCheckboxChange("type", type)}
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
