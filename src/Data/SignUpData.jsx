import { useContext } from "react";
import { ParentContext } from "@/ParentContext/ParentContext";

const useSignUpFields = () => {
  const { companyDetails, divDetails, branchDetails } = useContext(ParentContext);
  console.log(companyDetails, divDetails, branchDetails);
  return [
    { field: "ECNO", label: "ECNO", type: "text", placeholder: "Enter ECNO", require: true },
    { field: "COMCODE", label: "COMPANY",  type: "select", require: true, options: companyDetails || [], placeholder: "Select Company" },
    { field: "DIVCODE", label: "DIVISION",  type: "select", require: true, options: divDetails || [], placeholder: "Select Division" },
    { field: "BRNCODE", label: "BRANCH",  type: "select", require: true, options: branchDetails || [], placeholder: "Select Branch" },
    { field: "DEPT", label: "DEPARTMENT", type: "text", placeholder: "Enter Department", require: true },
    { field: "PASSWORD", label: "PASSWORD", type: "password", placeholder: "Enter Password", require: true, showToggle: true },
    { field: "CONFIRM_PASSWORD", label: "CONFIRM PASSWORD", type: "password", placeholder: "Confirm Password", require: true }
  ];
};


const useLoginFields = () => {

  return [
    { field: "ECNO", label: "ECNO", type: "text", placeholder: "Enter ECNO", require: true },
    { field: "PASSWORD", label: "PASSWORD", type: "password", placeholder: "Enter Password", require: true, showToggle: true },
  ];
};

export { useSignUpFields ,useLoginFields};
