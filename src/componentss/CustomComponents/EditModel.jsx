import React, { useState, useEffect ,useContext} from "react";
import { Save, Loader2 } from "lucide-react";
import {  Dialog,  DialogContent,  DialogHeader,  DialogTitle,  DialogFooter,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";
import { ParentContext } from "@/ParentContext/ParentContext";
import useUpdate from "@/hooks/useUpdateHook";
const EditModal = ({  isOpen,  onClose,  headers,  onSave,  isLoading = false,  initialData = null,  isEditMode = false,
  master = null,  setIsEditMode,   }) => {
  
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const {data,loading,  error, updateData,  patchData, reset}=useUpdate()
  const {companyDetails,divDetails}=useContext(ParentContext)
  useEffect(() => {
    if (isOpen) {
      const newFormData = {};
      
      headers.forEach((header) => {
        if (header.field !== "actions") {
          newFormData[header.field] =  isEditMode && initialData  ? (initialData[header.field] || "")  : "";
        }
      });

      setFormData(initialData);
      setErrors({});
    }
  }, [isOpen, headers, initialData, isEditMode]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // const validateForm = () => {
  //   const newErrors = {};
  //   const requiredFields = headers.filter(
  //     (header) => 
  //       header.label !== "S.No" && 
  //       header.field !== "actions" && 
  //       header.required !== false &&
  //       header.input // Only validate fields that have inputs
  //   );

  //   requiredFields.forEach((header) => {
  //     const value = formData[header.field];
  //     if (!value || value.toString().trim() === "") {
  //       newErrors[header.field] = `${header.label} is required`;
  //     }
  //   });

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSave = async () => {
    // console.log("Attempting to save:", { formData, master, isValid: validateForm() });
    
    // if (validateForm()) {
      try {
        await onSave(formData, master);
        handleClose();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
//   };

  const handleClose = () => {
    onClose();
    setFormData({});
    // setIsEditMode(false);
  };

  const getInputType = (field) => {
    const fieldName = field.toLowerCase();
    if (fieldName.includes("email")) return "email";
    if (fieldName.includes("phone") || fieldName.includes("mobile")) return "tel";
    if (fieldName.includes("date")) return "date";
    if (fieldName.includes("age") || fieldName.includes("number")) return "number";
    if (fieldName.includes("url") || fieldName.includes("website")) return "url";
    return "text";
  };

  const renderFormField = (header) => {
    const fieldProps = {
      id: header.field,
      name: header.field,
      value: formData[header.field] || "",
      disabled: isLoading,
      className: errors[header.field] ? "border-destructive" : "",
    };

    if (header.type === "textarea") {
      return (
        <Textarea
          {...fieldProps}
          rows={3}
          placeholder={`Enter ${header.label.toLowerCase()}`}
          onChange={(e) => handleInputChange(header.field, e.target.value)}
        />
      );
    }

    if (header.type === "select" && header.options) {
      return (
        <Select
          value={formData[header.field] || ""}
          onValueChange={(value) => handleInputChange(header.field, value)}
          disabled={isLoading}
        >
          <SelectTrigger className={errors[header.field] ? "border-destructive" : ""}>
            <SelectValue placeholder={`Select ${header.label}`} />
          </SelectTrigger>
          {/* <SelectContent>
            {header.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent> */}
          <SelectContent>
        {(() => {
          // Dynamically resolve options based on the string reference
          let optionsArray = [];
          
          if (typeof header.options === 'string') {
            // Map string references to actual data
            switch (header.options) {
              case 'companyDetails':
                optionsArray = companyDetails || [];
                break;
              case 'divDetails':
                optionsArray = divDetails || [];
                break;
              default:
                optionsArray = [];
            }
          } else if (Array.isArray(header.options)) {
            optionsArray = header.options;
          }
          
          return optionsArray.map((option) => (
            <SelectItem 
              key={option.value || option.id} 
              value={option.value || option.id}
            >
              {option.label || option.name}
            </SelectItem>
          ));
        })()}
      </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        {...fieldProps}
        type={header.inputType || getInputType(header.field)}
        placeholder={`Enter ${header.label.toLowerCase()}`}
        onChange={(e) => handleInputChange(header.field, e.target.value)}
      />
    );
  };

  const filteredHeaders = headers.filter(
    (header) => 
      header.label !== "S.no" && 
      header.field !== "actions" && 
      header.input
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit" : "Add"} {master?.replace(/([a-z])([A-Z])/g, "$1 $2")} Entry
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHeaders.map((header) => (
              <div key={header.field} className="space-y-2">
                <Label htmlFor={header.field}>
                  {header.label}
                  {header.required !== false && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </Label>

                <div className="space-y-1">
                  {renderFormField(header)}
                  {errors[header.field] && (
                    <p className="text-sm text-destructive">
                      {errors[header.field]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Entry
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
