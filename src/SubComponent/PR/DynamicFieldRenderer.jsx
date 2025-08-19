import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DynamicFieldRenderer = ({ field, value, onChange, id }) => {
  const renderField = () => {
    switch (field.type) {
      case "select":
        return (
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={2}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        );

      default:
        return (
          <Input
            id={id}
            type={field.type || "text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            step={field.type === "number" ? "0.01" : undefined}
            className="mt-1"
          />
        );
    }
  };

  return (
    <div>
      <Label htmlFor={id}>
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};

export default DynamicFieldRenderer;
