import React, { useState } from "react";
import FormHeader from "../SubComponent/PR/FormHeader";
import FormFooter from "../SubComponent/PR/FormFooter";
import SingleItemForm from "../SubComponent/PR/SingleItemForm";
import AddedItemsList from "../SubComponent/PR/AddedItemsList";
import DynamicFormCard from "@/SubComponent/PR/DynamicFormCard";
import PrSummary from "@/SubComponent/PR/PrSummary";
import usePost from "@/hooks/usePostHook";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
 

// import { itemFields, basicInfoFields, tabs, priorities } from "../Data/PRData";
import {
  useBasicInfoFields,
  itemFields,
  supplierFields,
  tabs,
  priorities,
} from "../Data/PRData";

export default function PurchaseRequisitionForm() {
  const [showSummary, setShowSummary] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({});
  const [items, setItems] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const { data, loading, error, postData, reset } = usePost();
  const url = import.meta.env.VITE_API_URL;
  const isMobile=useIsMobile()
  const [currentItem, setCurrentItem] = useState({
    id: 1,
    description: "",
    quantity: 1,
    specifications: "",
    supplier: null,
  });
  const basicInfoFields = useBasicInfoFields();
  // Event Handlers
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCurrentItemChange = (id, field, value) => {
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSupplierToCurrentItem = (itemId, supplier, applyToAll) => {
    setCurrentItem((prev) => ({ ...prev, supplier }));

    if (applyToAll) {
      setItems((prev) => prev.map((item) => ({ ...item, supplier })));
    }
  };

  const handleAddItem = () => {
    if (currentItem.PR_PRODUCT.trim() && currentItem.PR_QTY > 0) {
      const newItem = {
        ...currentItem,
        // totalPrice: currentItem.PR_QTY * (currentItem.unitPrice || 0),
      };

      setItems((prev) => [...prev, newItem]);

      setCurrentItem({
        id: currentItem.id + 1,
        PR_PRODUCT: "",
        PR_QTY: 1,
        SPECS: "",
        UOM_SNO: "",
        supplier: null,
      });
    }
  };

  const handleEditItem = (item) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setCurrentItem(item);
  };

  const handleDeleteItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  

  const handleSubmit = (isDraft = false) => {
    const status = isDraft ? "draft" : "submitted";
    let data;
    try {
      data = postData(`${url}/api/pr`, { formData, items, status });
      toast.success("PR Saved Successfully");
    } catch (error) {
      toast.error("Error Occured");
    }
    if (!isDraft) {
      setFormData({});
      setItems([]);
      setSuppliers([]);
      setCurrentItem({
        id: 1,
        description: "",
        quantity: 1,
        specifications: "",
        supplier: null,
      });

      // Reset any other relevant state
      setShowSummary(false);
      setActiveTab("basic");
    }

  };

  console.log(items);

  return (
    <div
      className={`${
        isFullscreen ? "fixed inset-0 z-50 bg-white" : "max-w-full"
      } mx-auto`}
    >
      {isMobile&&
      <FormHeader
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />}

      {/* Content */}
      <div className="flex-1">
        {/* Desktop Layout */}
        <div
          className={`hidden md:grid ${
            showSummary ? "md:grid-cols-3 lg:grid-cols-12" : "md:grid-cols-1"
          } gap-4 p-4 h-[calc(100vh-140px)]`}
        >
          {/* Form Section */}
          <div
            className={`${
              showSummary ? "lg:col-span-8" : "col-span-1"
            } flex flex-col overflow-hidden`}
          >
            <div className="flex-1 overflow-y-auto space-y-4">
              <DynamicFormCard
                title="Basic Information"
                formData={formData}
                fields={basicInfoFields}
                handleInputChange={handleInputChange}
              />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="min-h-0">
                  <SingleItemForm
                    currentItem={currentItem}
                    fields={itemFields}
                    handleChange={handleCurrentItemChange}
                    onAddItem={handleAddItem}
                    suppliers={suppliers}
                    handleAddSupplierToItem={handleAddSupplierToCurrentItem}
                  />
                </div>

                <div className="min-h-0">
                  <AddedItemsList
                    items={items}
                    onEditItem={handleEditItem}
                    onDeleteItem={handleDeleteItem}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Summary */}
          {showSummary && (
            <div className="lg:col-span-4 h-full">
              <div className="h-full overflow-y-auto">
                <PrSummary
                  formData={formData}
                  items={items}
                  suppliers={suppliers}
                  priorities={priorities}
                  // calculateTotal={calculateTotal}
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden h-[calc(100vh-140px)] overflow-y-auto">
          <div className="p-4 space-y-4">
            {activeTab === "basic" && (
              <DynamicFormCard
                title="Basic Information"
                formData={formData}
                fields={basicInfoFields}
                handleInputChange={handleInputChange}
              />
            )}

            {activeTab === "items" && (
              <>
                <SingleItemForm
                  currentItem={currentItem}
                  fields={itemFields}
                  handleChange={handleCurrentItemChange}
                  onAddItem={handleAddItem}
                  suppliers={suppliers}
                  handleAddSupplierToItem={handleAddSupplierToCurrentItem}
                />
                <AddedItemsList
                  items={items}
                  onEditItem={handleEditItem}
                  onDeleteItem={handleDeleteItem}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <FormFooter
        // calculateTotal={calculateTotal}
        items={items}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
