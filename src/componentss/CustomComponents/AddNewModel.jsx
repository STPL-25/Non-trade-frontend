// import React, { useState, useEffect,useContext } from "react";
// import { Save, Loader2 } from "lucide-react";
// import {  Dialog,  DialogContent,  DialogHeader,  DialogTitle,  DialogFooter,} from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { ParentContext } from "@/ParentContext/ParentContext";
// import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";

// const AddNewModal = ({
//   isOpen,  onClose,  headers,  onSave,  isLoading = false,  initialData = null,  isEditMode = false,  master = null,  setIsEditMode,}) => {
//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const {companyDetails,divDetails}=useContext(ParentContext)
//   console.log(isOpen, isLoading, initialData, isEditMode, master);
//   useEffect(() => {
//     if (isOpen) {
//       if (isEditMode && initialData) {
//         // Initialize form with existing data for editing
//         const editFormData = {};
//         headers.forEach((header) => {
//           if (header.field !== "Sno" && header.field !== "actions") {
//             // Use existing data if available, otherwise empty string
//             editFormData[header.field] = initialData[header.field] || "";
//           }
//         });
//         setFormData(editFormData);
//       } else {
//         // Initialize form with empty data for new entry
//         const newFormData = {};
//         headers.forEach((header) => {
//           if (header.field !== "Sno" && header.field !== "actions") {
//             newFormData[header.field] = "";
//           }
//         });
//         setFormData(newFormData);
//       }
//       setErrors({});
//     }
//   }, [isOpen, headers, initialData, isEditMode]);

//   const handleInputChange = (field, value) => {
//     console.log(field, value)
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({
//         ...prev,
//         [field]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const requiredFields = headers.filter(
//       (h) => h.label !== "S.No" && h.field !== "actions" && h.required !== false
//     );

//     requiredFields.forEach((header) => {
//       if (
//         !formData[header.field] ||
//         formData[header.field].toString().trim() === ""
//       ) {
//         newErrors[header.field] = `${header.label} is required`;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = async (formData, master) => {
//     console.log("Form Data:", formData);
//     console.log("Master:", validateForm());
//     // if (validateForm()) {
//       try {
//         await onSave(formData, master);
//         onClose();
//       } catch (error) {
//         console.error("Error saving data:", error);
//       }
//     // }
//   };

//   const getInputType = (field) => {
//     const fieldName = field.toLowerCase();
//     if (fieldName.includes("email")) return "email";
//     if (fieldName.includes("phone") || fieldName.includes("mobile"))
//       return "tel";
//     if (fieldName.includes("date")) return "date";
//     if (fieldName.includes("age") || fieldName.includes("number"))
//       return "number";
//     if (fieldName.includes("url") || fieldName.includes("website"))
//       return "url";
//     return "text";
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onOpenChange={() => {
//         onClose(), setFormData({}), setIsEditMode(false);
//       }}
//     >
//       <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
//         <DialogHeader>
//           <DialogTitle>
//             {" "}
//             {master?.replace(/([a-z])([A-Z])/g, "$1 $2")} Entry
//           </DialogTitle>
//         </DialogHeader>

//         <div className="overflow-y-auto max-h-[60vh] px-1">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {headers
//               .filter(
//                 (header) => header.field !== "Sno" && header.field !== "actions"&&header.input
//               )
//               .map((header) => (
//                 <div key={header.field} className="space-y-2">
//                   <Label htmlFor={header.field}>
//                     {header.label}
//                     {header.required !== false && (
//                       <span className="text-destructive ml-1">*</span>
//                     )}
//                   </Label>

//                   {header.type === "textarea" ? (
//                     <div className="space-y-1">
//                       <Textarea
//                         id={header.field}
//                         rows={3}
//                         placeholder={`Enter ${header.label.toLowerCase()}`}
//                         name={header.field}
//                         value={formData[header.field] || ""}
//                         onChange={(e) =>
//                           handleInputChange(header.field, e.target.value)
//                         }
//                         disabled={isLoading}
//                         className={
//                           errors[header.field] ? "border-destructive" : ""
//                         }
//                       />
//                       {errors[header.field] && (
//                         <p className="text-sm text-destructive">
//                           {errors[header.field]}
//                         </p>
//                       )}
//                     </div>
//                   ) : header.type === "select" && header.options ? (
//                     <div className="space-y-1">
//                       <Select
//                         value={formData[header.field] || ""}
//                         onValueChange={(value) =>
//                           handleInputChange(header.field, value)
//                         }
//                         disabled={isLoading}
//                       >
//                         <SelectTrigger
//                           className={
//                             errors[header.field] ? "border-destructive" : ""
//                           }
//                         >
//                           <SelectValue placeholder={`Select ${header.label}`} />
//                         </SelectTrigger>
//                         {/* <SelectContent>
//                           {console.log("Options:", header)}
//                           {header?.options?.map((option) => (
//                             <SelectItem key={option.value} value={option?.value}>
//                               {option?.label}
//                             </SelectItem>
//                           ))}
//                         </SelectContent> */}
//                         <SelectContent>
//         {(() => {
//           let optionsArray = [];
          
//           if (typeof header.options === 'string') {
//             // Map string references to actual data
//             switch (header.options) {
//               case 'companyDetails':
//                 optionsArray = companyDetails || [];
//                 break;
//               case 'divDetails':
//                 optionsArray = divDetails || [];
//                 break;
//               default:
//                 optionsArray = [];
//             }
//           } else if (Array.isArray(header.options)) {
//             optionsArray = header.options;
//           }
          
//          return optionsArray.map((option, index) => (
//   <SelectItem 
//     key={option.id || `${option.value}-${index}`} 
//     value={option.value}
//   >
//     {option.label }
//   </SelectItem>
// ));
//         })()}
//       </SelectContent>
//                       </Select>
//                       {errors[header.field] && (
//                         <p className="text-sm text-destructive">
//                           {errors[header.field]}
//                         </p>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="space-y-1">
//                       <Input
//                         id={header.field}
//                         type={header.inputType || getInputType(header.field)}
//                         placeholder={`Enter ${header.label.toLowerCase()}`}
//                         name={header.field}
//                         value={formData[header.field] || ""}
//                         onChange={(e) =>
//                           handleInputChange(header.field, e.target.value)
//                         }
//                         disabled={isLoading}
//                         className={
//                           errors[header.field] ? "border-destructive" : ""
//                         }
//                       />
//                       {errors[header.field] && (
//                         <p className="text-sm text-destructive">
//                           {errors[header.field]}
//                         </p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>

//         <DialogFooter>
//           <Button
//             variant="outline"
//             onClick={() => {
//               onClose(), setFormData({}), setIsEditMode(false);
//             }}
//             disabled={isLoading}
//           >
//             Cancel
//           </Button>

//           <Button
//             onClick={() => handleSave(formData, master)}
//             // disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 Save Entry
//               </>
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddNewModal;


import React, { useState, useEffect, useContext } from "react";
import { Save, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ParentContext } from "@/ParentContext/ParentContext";
import { CustomInputField } from "./CustomInputField";
const AddNewModal = ({
  isOpen,
  onClose,
  headers,
  onSave,
  isLoading = false,
  initialData = null,
  isEditMode = false,
  master = null,
  setIsEditMode,
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { companyDetails, divDetails } = useContext(ParentContext);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        const editFormData = {};
        headers.forEach((header) => {
          if (header.field !== "Sno" && header.field !== "actions") {
            editFormData[header.field] = initialData[header.field] || "";
          }
        });
        setFormData(editFormData);
      } else {
        const newFormData = {};
        headers.forEach((header) => {
          if (header.field !== "Sno" && header.field !== "actions") {
            newFormData[header.field] = "";
          }
        });
        setFormData(newFormData);
      }
      setErrors({});
    }
  }, [isOpen, headers, initialData, isEditMode]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = headers.filter(
      (h) => h.label !== "S.No" && h.field !== "actions" && h.required !== false
    );

    requiredFields.forEach((header) => {
      if (
        !formData[header.field] ||
        formData[header.field].toString().trim() === ""
      ) {
        newErrors[header.field] = `${header.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (formData, master) => {
    try {
      await onSave(formData, master);
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Prepare options data for CustomInputField
  const optionsData = {
    companyDetails: companyDetails || [],
    divDetails: divDetails || [],
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        setFormData({});
        setIsEditMode(false);
      }}
    >
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {master?.replace(/([a-z])([A-Z])/g, "$1 $2")} Entry
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] px-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {headers
              .filter(
                (header) =>
                  header.field !== "Sno" &&
                  header.field !== "actions" &&
                  header.input !== false
              )
              .map((header) => (
                <CustomInputField
                  key={header.field}
                  field={header.field}
                  label={header.label}
                  require={header.required !== false}
                  type={header.type || header.inputType || "text"}
                  options={header.options || []}
                  optionsData={optionsData}
                  value={formData[header.field] || ""}
                  onChange={(e) => {
                    const value = e?.target?.value !== undefined ? e.target.value : e;
                    handleInputChange(header.field, value);
                  }}
                  error={errors[header.field]}
                  disabled={isLoading}
                />
              ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              setFormData({});
              setIsEditMode(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button onClick={() => handleSave(formData, master)}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Entry
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewModal;

