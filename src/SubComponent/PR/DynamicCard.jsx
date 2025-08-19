import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Trash2,
  Save,
  Edit,
} from "lucide-react";

const DynamicCard = ({
  title,
  items = [],
  fields,
  setItems,
  keyField = "id",
  itemLabelPrefix = "Item",
  addButtonLabel = "Add Item",
  containerClass = "mb-3",
  bgColorForItem = "bg-gray-50",
}) => {
  // State for the current form data
  const [currentItem, setCurrentItem] = useState(() => {
    const initialItem = {};
    fields.forEach(field => {
      initialItem[field.name] = field.type === 'number' ? 0 : '';
    });
    return initialItem;
  });

  const [editingId, setEditingId] = useState(null);

  // Reset form
  const resetForm = () => {
    const resetItem = {};
    fields.forEach(field => {
      resetItem[field.name] = field.type === 'number' ? 0 : '';
    });
    setCurrentItem(resetItem);
    setEditingId(null);
  };

  // Handle input change
  const handleInputChange = (name, value) => {
    setCurrentItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save item (add new or update existing)
  const saveItem = () => {
    if (editingId) {
      // Update existing item
      setItems(prev => prev.map(item => 
        item[keyField] === editingId 
          ? { ...currentItem, [keyField]: editingId }
          : item
      ));
    } else {
      // Add new item
      const newId = items.length > 0 ? Math.max(...items.map(item => item[keyField])) + 1 : 1;
      const newItem = { ...currentItem, [keyField]: newId };
      setItems(prev => [...prev, newItem]);
    }
    resetForm();
  };

  // Edit item
  const editItem = (item) => {
    setCurrentItem({ ...item });
    setEditingId(item[keyField]);
  };

  // Remove item
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item[keyField] !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  // Check if form is valid (basic validation)
  const isFormValid = () => {
    return fields.some(field => field.required && !currentItem[field.name]) === false;
  };

  return (
    <div className={containerClass}>
      {/* Form Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">
              {editingId ? `Edit ${itemLabelPrefix}` : `Add ${itemLabelPrefix}`}
            </CardTitle>
            {editingId && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetForm}
                className="h-8"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`border rounded-lg p-4 ${bgColorForItem}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {fields.map(({
                name,
                label,
                type = "text",
                placeholder,
                required,
                gridSpan = "sm:col-span-1",
                ...rest
              }) => {
                const value = currentItem[name] || '';

                // For textarea render Textarea
                if (type === "textarea") {
                  return (
                    <div key={name} className={gridSpan}>
                      <Label className="text-sm font-medium">
                        {label} {required && <span className="text-red-500">*</span>}
                      </Label>
                      <Textarea
                        className="min-h-[50px] mt-1"
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => handleInputChange(name, e.target.value)}
                        {...rest}
                      />
                    </div>
                  );
                }

                // For custom readonly or display-only fields
                if (type === "display") {
                  return (
                    <div key={name} className={gridSpan}>
                      <Label className="text-sm font-medium">{label}</Label>
                      <div className="text-lg font-semibold text-green-600 p-2 bg-green-50 rounded mt-1">
                        {rest.format ? rest.format(value) : value}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={name} className={gridSpan}>
                    <Label className="text-sm font-medium">
                      {label} {required && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      type={type}
                      className="h-9 mt-1"
                      value={value}
                      placeholder={placeholder}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (type === "number") {
                          val = rest.step && rest.step.includes(".")
                            ? parseFloat(val) || 0
                            : parseInt(val) || 0;
                        }
                        handleInputChange(name, val);
                      }}
                      {...rest}
                    />
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={saveItem}
                disabled={!isFormValid()}
                className="h-9 px-4"
              >
                <Save className="w-4 h-4 mr-1" />
                {editingId ? 'Update' : 'Save'} {itemLabelPrefix}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      {items.length > 0 && (
        <Card className="mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              {title} ({items.length} {items.length === 1 ? 'item' : 'items'})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">#</th>
                    {fields.map(field => (
                      <th key={field.name} className="text-left p-2 font-medium">
                        {field.label}
                      </th>
                    ))}
                    <th className="text-center p-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item[keyField]} className="border-b hover:bg-gray-50">
                      <td className="p-2 text-sm font-medium">{index + 1}</td>
                      {fields.map(field => (
                        <td key={field.name} className="p-2 text-sm">
                          {field.type === 'display' && field.format 
                            ? field.format(item[field.name])
                            : field.type === 'number'
                            ? (item[field.name] || 0).toLocaleString()
                            : item[field.name] || '-'
                          }
                        </td>
                      ))}
                      <td className="p-2">
                        <div className="flex items-center justify-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => editItem(item)}
                            className="h-7 w-7 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item[keyField])}
                            className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


export default DynamicCard




