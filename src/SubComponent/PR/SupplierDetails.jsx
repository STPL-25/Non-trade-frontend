// components/PurchaseRequisition/SupplierDetails.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SupplierDetails = ({ supplier, onRemove }) => {
  return (
    <div className="bg-white rounded-md p-3 border border-blue-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-blue-900">Supplier Details</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div><span className="font-medium">Name:</span> {supplier.name}</div>
        <div><span className="font-medium">Contact:</span> {supplier.contactPerson}</div>
        <div><span className="font-medium">Phone:</span> {supplier.phone}</div>
        <div><span className="font-medium">Email:</span> {supplier.email}</div>
      </div>
    </div>
  );
};

export default SupplierDetails;
