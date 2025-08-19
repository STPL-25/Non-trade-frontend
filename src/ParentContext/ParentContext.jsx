import React, { useState, useContext, useRef, useEffect } from "react";
import useFetch from "../hooks/useFetchHook";
import axios from "axios";
// Mock ParentContext for demo
const ParentContext = React.createContext();

const ParentProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const [activeItem, setActiveItem] = useState("masters");
  const [activeComponent, setActiveComponent] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [companyDetails,setCompanyDetails]=useState([]);
  const [branchDetails,setBranchDetails]= useState([])
  const [divDetails,setDivDetails]=useState([])
  const [headerComponentRender,setHeaderComponentRender]=useState("")
  const [isFullscreen, setIsFullscreen] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    const getDivisionMasterOptions = async () => {
  try {
    const divData = await axios.get(`${apiUrl}/api/DivisionMaster`);
    console.log(divData.data.data)
    const divDatas=divData?.data?.data.map(branch => ({ value: branch?.DIVCODE, label: branch?.DIV_NAME  })) || []
    setDivDetails(divDatas) ;
  } catch (error) {
    console.error("Error fetching DivisionMaster data:", error);
    setDivDetails([]) ;
  }
};

const getCompanyMasterOptions = async () => {
  try {
    const companyData = await axios.get(`${apiUrl}/api/CompanyMaster`);
    const cmpData= companyData?.data?.data?.map(company => ({ value: company?.COMCODE, label: company?.COMNAME })) || []
    setCompanyDetails(cmpData);
  } catch (error) {
    console.error("Error fetching CompanyMaster data:", error);
    setCompanyDetails( []);
  }
};
const getBranchMasterOptions = async () => {
  try {
    const companyData = await axios.get(`${apiUrl}/api/BranchMaster`);
    const cmpData= companyData?.data?.data?.map(company => ({ value: company?.BRN_SNO, label: company?.BRN_NAME })) || []
    setBranchDetails(cmpData);
  } catch (error) {
    console.error("Error fetching CompanyMaster data:", error);
    setBranchDetails( []);
  }
};


    useEffect(()=>{
           getDivisionMasterOptions();
           getCompanyMasterOptions();
           getBranchMasterOptions()
    },[])
   console.log(companyDetails,divDetails)
  // const { data:fieldData, loading:fieldLoading, error:fieldError } = useFetch(`${apiUrl}/api/frontend_data/datas`);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    
    if (!isCollapsed) {
      setSidebarWidth(80);
    } else {
      setSidebarWidth(280);
    }
  };
  return (
    <ParentContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        expandedItems,
        setExpandedItems,
        activeItem,
        setActiveItem,
        activeComponent,
        setActiveComponent,
        sidebarWidth,
        setSidebarWidth,
        isCollapsed,
        setIsCollapsed,
        toggleCollapse,
        
        companyDetails,divDetails,branchDetails,headerComponentRender,setHeaderComponentRender,isFullscreen, setIsFullscreen
        // fieldData,
        // fieldLoading,
        // fieldError,
      }}
    >
      {children}
    </ParentContext.Provider>
  );
};

export { ParentContext, ParentProvider };
