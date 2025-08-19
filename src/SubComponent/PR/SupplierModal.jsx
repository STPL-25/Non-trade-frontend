import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import DynamicFieldRenderer from "./DynamicFieldRenderer";
import { supplierFields } from "../../Data/PRData";

const SupplierModal = ({ isOpen, onClose, onSave }) => {
  const [supplierData, setSupplierData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    contactPerson: "",
    notes: "",
  });
  const [applyToAll, setApplyToAll] = useState(false);

  const handleInputChange = (field, value) => {
    setSupplierData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(supplierData, applyToAll);
    resetForm();
  };

  const resetForm = () => {
    setSupplierData({
      name: "",
      address: "",
      phone: "",
      email: "",
      contactPerson: "",
      website: "",
      notes: "",
    });
    setApplyToAll(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Supplier to Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {supplierFields.slice(0, 2).map((field) => (
              <DynamicFieldRenderer
                key={field.name}
                field={field}
                value={supplierData[field.name]}
                onChange={(value) => handleInputChange(field.name, value)}
                id={field.name}
              />
            ))}
          </div>
          
          {supplierFields.slice(2).map((field) => (
            <div key={field.name} className={field.grid || ""}>
              <DynamicFieldRenderer
                field={field}
                value={supplierData[field.name]}
                onChange={(value) => handleInputChange(field.name, value)}
                id={field.name}
              />
            </div>
          ))}
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="applyToAll"
              checked={applyToAll}
              onCheckedChange={setApplyToAll}
            />
            <Label htmlFor="applyToAll" className="text-sm">
              Apply this supplier to all items
            </Label>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!supplierData.name.trim()}
            >
              Save Supplier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierModal;
