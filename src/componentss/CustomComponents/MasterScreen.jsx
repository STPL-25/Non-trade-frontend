 import DynamicTable from "./DynamicTables";
 import { ParentContext } from "../../ParentContext/ParentContext";
 import { useContext } from "react";
 import { fields } from "@/Data/Data";
 import useFetch from "@/hooks/useFetchHook";
 const MasterScreen = ({ master,setCurrentScreen }) => {
console.log("Master Screen:", master);
      const apiUrl = import.meta.env.VITE_API_URL;

      const headerData=fields[master] || [];
      console.log("Header Data:", headerData);
    const { data:datas, loading:loading, error:error } = useFetch(`${apiUrl}/api/${master}`);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <DynamicTable
        headers={headerData||[]}
        data={datas?.data||[]} 
        title={master.replace(/([a-z])([A-Z])/g, "$1 $2")}
        master={master}
        searchable={true}
        sortable={true}
        className="mb-8"
        setCurrentScreen={setCurrentScreen}
        
      />
      </div>
    );
  };


  export default MasterScreen;