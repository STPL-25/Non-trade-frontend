import { useContext } from "react";
import { ParentContext } from "@/ParentContext/ParentContext";

const useSignUpFields = () => {
  const { companyDetails, divDetails, branchDetails } = useContext(ParentContext);

  return [
    {
      name: "ecno",
      label: "ECNO",
      type: "text",
      placeholder: "Enter ECNO",
      required: true,
    },
    {
      name: "company",
      label: "COMPANY",
      type: "select",
      required: true,
      options: companyDetails || [],
      placeholder: "Select Company",
    },
    {
      name: "division",
      label: "DIVISION",
      type: "select",
      required: true,
      options: divDetails || [],
      placeholder: "Select Division",
    },
    {
      name: "branch",
      label: "BRANCH",
      type: "select",
      required: true,
      options: branchDetails || [],
      placeholder: "Select Branch",
    },
    {
      name: "department",
      label: "DEPARTMENT",
      type: "text",
      placeholder: "Enter Department",
      required: true,
    },
    {
      name: "password",
      label: "PASSWORD",
      type: "password",
      placeholder: "Enter Password",
      required: true,
      showToggle: true,
    },
    {
      name: "confirmPassword",
      label: "CONFIRM PASSWORD",
      type: "password",
      placeholder: "Confirm Password",
      required: true,
      showToggle: true,
      validation: {
        matchField: "password",
        message: "Passwords do not match"
      }
    },
  ];
};



export { useSignUpFields };
