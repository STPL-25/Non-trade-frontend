import {  Building, MapPin, FileCheck, IndianRupee, Package, FolderOpen, Receipt, CreditCard, Calendar,  Truck, Hash, PiggyBank, UserPlus, Menu, CheckCircle, Gift, FileText, Archive, Settings, Briefcase, Tag } from "lucide-react";

const masterItems = [
  { icon: <Building className="w-5 h-5" />, name: "Company Master", category: "organization", color: "bg-blue-500", id: "CompanyMaster" },
  { icon: <Briefcase className="w-5 h-5" />, name: "Division Master", category: "organization", color: "bg-green-500", id: "DivisionMaster" },
  { icon: <MapPin className="w-5 h-5" />, name: "Branch Master", category: "organization", color: "bg-purple-500", id: "BranchMaster" },
  { icon: <FileCheck className="w-5 h-5" />, name: "PO Approval", category: "approvals", color: "bg-orange-500", id: "POApproval" },
  { icon: <IndianRupee className="w-5 h-5" />, name: "Ledger Master", category: "finance", color: "bg-emerald-500", id: "ledger_master" },
  { icon: <FolderOpen className="w-5 h-5" />, name: "Product Category", category: "inventory", color: "bg-yellow-500", id: "product_category" },
  { icon: <Package className="w-5 h-5" />, name: "Product", category: "inventory", color: "bg-indigo-500", id: "product_master" },
  { icon: <Receipt className="w-5 h-5" />, name: "GST", category: "finance", color: "bg-rose-500", id: "gst_master" },
  { icon: <FileText className="w-5 h-5" />, name: "KYC", category: "compliance", color: "bg-teal-500", id: "kyc_master" },
  { icon: <Tag className="w-5 h-5" />, name: "Product Rate and Discount", category: "inventory", color: "bg-cyan-500", id: "product_rate_discount" },
  { icon: <Calendar className="w-5 h-5" />, name: "Acc Year", category: "finance", color: "bg-slate-500", id: "acc_year" },
  { icon: <UserPlus className="w-5 h-5" />, name: "User Creation", category: "administration", color: "bg-violet-500", id: "user_creation" },
  { icon: <Menu className="w-5 h-5" />, name: "Menu Creation", category: "administration", color: "bg-amber-500", id: "menu_creation" },
  { icon: <CheckCircle className="w-5 h-5" />, name: "Payment Approval", category: "approvals", color: "bg-lime-500", id: "payment_approval" },
  { icon: <CreditCard className="w-5 h-5" />, name: "Payment Type", category: "finance", color: "bg-pink-500", id: "payment_type" },
  { icon: <Gift className="w-5 h-5" />, name: "Customer Gift", category: "customer", color: "bg-fuchsia-500", id: "customer_gift" },
  { icon: <FileText className="w-5 h-5" />, name: "Approval Footer", category: "approvals", color: "bg-sky-500", id: "approval_footer" },
  { icon: <Archive className="w-5 h-5" />, name: "Request Dept", category: "administration", color: "bg-blue-600", id: "request_dept" },
  { icon: <Hash className="w-5 h-5" />, name: "UOM", category: "inventory", color: "bg-green-600", id: "uom_master" },
  { icon: <Settings className="w-5 h-5" />, name: "Request Type", category: "administration", color: "bg-yellow-600", id: "request_type" },
  { icon: <Truck className="w-5 h-5" />, name: "Vehicle Master", category: "logistics", color: "bg-red-600", id: "vehicle_master" },
  { icon: <Hash className="w-5 h-5" />, name: "Prefix Master", category: "administration", color: "bg-stone-500", id: "prefix_master" },
  { icon: <PiggyBank className="w-5 h-5" />, name: "Dept Budget", category: "finance", color: "bg-emerald-600", id: "dept_budget" },
];


const fields = {
  CompanyMaster: [
    { field: "COMCODE", label: "S.No", require: false, view: true, type: 'Text', input: false },
    { field: "COMNAME", label: "Company Name", require: true, view: true, type: 'Text', input: true },
    { field: "COM_NIC", label: "NIC", require: false, view: true, type: 'Text', input: true },
    { field: "COM_PAN_NO", label: "Pan No", require: true, view: true, type: 'Text', input: true },
    { field: "IS_COM_GST_APPLICABLE", label: "Gst Applicable", require: true, view: true, type: 'select', options: [{ value: "Y", label: 'Yes' }, { value:"N", label: 'No' }], input: true },
    { field: "COM_GST_NO", label: "Gst No", require: true, view: true, type: 'Text', input: true },
    { field: "ADD_PINCODE", label: "Pincode", require: true, view: true, type: 'Number', input: true },
    { field: "ADD_DOOR_NO", label: "Door No", require: false, view: true, type: 'Text', input: true },
    { field: "ADD_STREET", label: "Street", require: false, view: true, type: 'Text', input: true },
    { field: "ADD_AREA", label: "Area", require: false, view: true, type: 'Text', input: true },
    { field: "ADD_CITY", label: "City", require: true, view: true, type: 'Text', input: true },
    { field: "ADD_STATE", label: "State", require: true, view: true, type: 'Text', input: true },
    { field: "ADD_EMAIL", label: "E-mail", require: true, view: true, type: 'Text', input: true },
    { field: "ADD_PHONE", label: "Phone no", require: true, view: true, type: 'Text', input: true },
    { field: "COM_GST_CODE", label: "GST Code", require: false, view: false, type: 'Text', input: false },
    { field: "IS_ACTIVE", label: "Active Status", require: false, view: false, type: 'select', options: [{ value: "Y", label: 'Active' }, { value: "N", label: 'Inactive' }], input: true },
    { field: "APP_SNO", label: "App S.No", require: false, view: false, type: 'Number', input: false },
    { field: "CREATED_DATE", label: "Created Date", require: false, view: false, type: 'Date', input: false }
  ],
  
  DivisionMaster: [
    { field: "DIVCODE", label: "S.No", require: false, view: true, type: 'Text', input: false },
    { field: "DIV_NAME", label: "Division Name", require: true, view: true, type: 'Text', input: true },
    { field: "DIV_NIC", label: "Division nic", require: true, view: true, type: 'Text', input: true },
    { field: "DIV_CATEGORY", label: "Division Category", require: true, view: true, type: 'Text', input: true },
    { field: "DIV_ID", label: "Division Id", require: true, view: false, type: 'Text', input: true },
    { field: "IS_ACTIVE", label: "Active Status", require: false, view: false, type: 'Text', input: false },
  ],

  BranchMaster: [
    { field: "BRN_SNO", label: "S.No", require: false, view: true, type: 'Text', input: false },
    { field: "COMCODE", label: "Company Name", require: true, view: true, type:'select', options: 'companyDetails', input: true },
    { field: "DIVCODE", label: "Division Name", require: true, view: true, type:'select', options: "divDetails", input: true },
    { field: "BRN_NAME", label: "Branch Name", require: true, view: true, type:'text', input: true },
    { field: "BRN_NIC", label: "Branch Code", require: true, view: true, type:'Text', input: true },
    { field: "ADD_PINCODE", label: "Pincode", require: true, view: true, type: 'Number', input: true },
    { field: "ADD_DOOR_NO", label: "Door No", require: false, view: true, type: 'Text', input: true },
    { field: "ADD_STREET", label: "Street", require: false, view: true, type: 'Text', input: true },
    { field: "ADD_AREA", label: "Area", require: false, view: true, type: 'Text', input: true },
    { field: "ADD_CITY", label: "City", require: true, view: true, type: 'Text', input: true },
    { field: "ADD_STATE", label: "State", require: true, view: true, type: 'Text', input: true },
    { field: "ADD_EMAIL", label: "E-mail", require: true, view: true, type: 'Text', input: true },
    { field: "ADD_PHONE", label: "Phone no", require: true, view: true, type: 'Text', input: true },
    { field: "COM_GST_CODE", label: "GST Code", require: false, view: false, type: 'Text', input: false },
]

};


export { masterItems, fields };
