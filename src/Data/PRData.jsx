

import { useContext } from "react";
import {
  CalendarDays,
  Plus,

  Eye,

} from "lucide-react";
import { ParentContext } from "@/ParentContext/ParentContext";
// Assuming you have a context like this - replace with your actual context
// import { DataContext } from './DataContext';

const reasons = [
  "Equipment Replacement",
  "New Equipment Purchase",
  "Office Supplies",
  "Maintenance & Repair",
  "Software License",
  "Professional Services",
  "Marketing Materials",
  "Training & Development",
  "Other",
];

const priorities = [
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-800" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-800" },
  {
    value: "medium",
    label: "Medium",
    color: "bg-yellow-100 text-yellow-800",
  },
  { value: "low", label: "Low", color: "bg-green-100 text-green-800" },
];

const tabs = [
  { id: "basic", label: "Basic Info", icon: CalendarDays },
  { id: "items", label: "Items", icon: Plus },
  { id: "summary", label: "Summary", icon: Eye },
];

const supplierFields = [
  {
    name: "name",
    label: "Company Name",
    placeholder: "Company name",
    required: true,
    type: "text",
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    placeholder: "Contact person",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Phone number",
    required: true,
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Email address",
    type: "email",
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Complete address",
    required: true,
    type: "textarea",
    gridSpan: "sm:col-span-2",
  },
];

const itemFields = [
  {
    name: "PR_PRODUCT",
    label: "Description",
    placeholder: "Item description",
    required: true,
    gridSpan: "sm:col-span-2",
    type: "text",
  },
  {
    name: "PR_QTY",
    label: "Quantity",
    type: "number",
    min: 1,
    placeholder: "",
    required: true,
  },
  { name: "UOM_SNO_DATA", label: "UOM", type: "text" },
  {
    name: "SPECS",
    label: "Specifications",
    type: "textarea",
    gridSpan: "sm:col-span-2",
  },
];

const useBasicInfoFields = () => {
  // Replace 'DataContext' with your actual context name
  const { companyDetails,divDetails ,branchDetails} = useContext(ParentContext);

  return [
    {
      name: "COMCODE",
      label: "Company",
      type: "select",
      required: true,
      options: companyDetails || [], 
    },
    {
      name: "DIVCODE",
      label: "Division",
      type: "select",
      required: true,
      options: divDetails || [],
    },
    {
      name: "BRN_SNO",
      label: "Branch",
      type: "select",
      required: true,
      options:branchDetails ||[],
    },
    {
      name: "DEPT",
      label: "Department",
      type: "text",
      placeholder: "Department",
    },
    {
      name: "ECNO",
      label: "Requested By",
      type: "text",
      required: true,
      placeholder: "Your Ecno",
    },
    {
      name: "REQ_DATE",
      label: "Required Date",
      type: "date",
      required: true,
    },
    {
      name: "PRIORITY",
      label: "Priority",
      type: "select",
      required: true,
      options: priorities.map((p) => ({ label: p.label, value: p.value })),
    },
    {
      name: "REASON",
      label: "Reason",
      type: "select",
      required: true,
      options: reasons,
      gridSpan: "sm:col-span-2",
    },
  ];
};
 const purchaseTeamFields = {
  prItems: [
    { field: "PR_SNO", label: "S.No", require: false, view: true, type: 'text', input: false },
    { field: "PR_PRODUCT", label: "Product", require: true, view: true, type: 'text', input: false },
    { field: "PR_CODE", label: "Product Code", require: false, view: true, type: 'text', input: false },
    { field: "editedQty", label: "Quantity", require: true, view: true, type: 'number', input: true },
    { field: "UOM_SNO", label: "Unit", require: false, view: true, type: 'text', input: false },
    { field: "HSN", label: "HSN Code", require: false, view: true, type: 'text', input: true },
   
  ],
  
  quotationFields: [
    { field: "unitPrice", label: "Unit Price (₹)", require: true, view: true, type: 'number', input: true },
    { field: "gstPercent", label: "GST %", require: true, view: true, type: 'number', input: true, defaultValue: 0 },
    { field: "discount", label: "Discount %", require: false, view: true, type: 'number', input: true, defaultValue: 0 },
    { field: "freight", label: "Freight (₹)", require: false, view: true, type: 'number', input: true, defaultValue: 0 },
    { field: "packaging", label: "Packaging (₹)", require: false, view: true, type: 'number', input: true, defaultValue: 0 },
    { field: "deliveryDays", label: "Delivery Days", require: false, view: true, type: 'number', input: true },
    { field: "remarks", label: "Remarks", require: false, view: true, type: 'textarea', input: true },
    { field: "validityDays", label: "Validity Days", require: false, view: true, type: 'number', input: true, defaultValue: 30 },
    { field: "termsConditions", label: "Terms & Conditions", require: false, view: true, type: 'textarea', input: true },
  ],

  supplierFields: [
    { field: "id", label: "S.No", require: false, view: true, type: 'text', input: false },
    { field: "code", label: "Supplier Code", require: true, view: true, type: 'text', input: false },
    { field: "name", label: "Supplier Name", require: true, view: true, type: 'text', input: false },
    { field: "contact", label: "Contact Person", require: false, view: true, type: 'text', input: false },
    { field: "email", label: "Email", require: false, view: true, type: 'email', input: false },
    { field: "phone", label: "Phone", require: false, view: true, type: 'text', input: false },
    { field: "address", label: "Address", require: false, view: true, type: 'textarea', input: false },
    { field: "category", label: "Category", require: false, view: true, type: 'text', input: false },
    { field: "gst", label: "GST Number", require: false, view: true, type: 'text', input: false },
    { field: "pan", label: "PAN Number", require: false, view: true, type: 'text', input: false },
  ]
};

export { itemFields, supplierFields, useBasicInfoFields, tabs, priorities,purchaseTeamFields };