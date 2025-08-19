import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DynamicFormCard = ({
  title,
  formData,
  fields,
  handleInputChange,
  containerClass = "mb-3",
}) => (
  <Card className={containerClass}>
    <CardHeader className="pb-3">
      <CardTitle className="text-base font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {fields.map(
          ({  name, label, type = "text", placeholder, required, options,  gridSpan,}) => {
            
            if (type === "select") {
              return (
                <div key={name} className={gridSpan || ""}>
                  <Label htmlFor={name} className="text-sm font-medium">
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                  </Label>
                  <Select
                    value={formData[name] || ""}
                    onValueChange={(value) => handleInputChange(name, value)}
                  >
                    <SelectTrigger id={name} className="h-9 mt-1">
                      <SelectValue
                        placeholder={
                          placeholder || `Select ${label.toLowerCase()}`
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {(options || []).map((opt) => {
                        const value =
                          typeof opt === "object"
                            ? opt.value || opt.label
                            : opt;
                        const displayText =
                          typeof opt === "object"
                            ? opt.label || opt.value
                            : opt;

                        return (
                          <SelectItem key={value} value={value}>
                            {displayText}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              );
            }

            return (
              <div key={name} className={gridSpan || ""}>
                <Label htmlFor={name} className="text-sm font-medium">
                  {label} {required && <span className="text-red-500">*</span>}
                </Label>
                <Input
                  id={name}
                  type={type}
                  className="h-9 mt-1"
                  name={name}
                  value={formData[name] || ""}
                  onChange={(e) => handleInputChange(name, e.target.value)}
                  placeholder={placeholder}
                  required={required}
                />
              </div>
            );
          }
        )}
      </div>
    </CardContent>
  </Card>
);

export default DynamicFormCard;
