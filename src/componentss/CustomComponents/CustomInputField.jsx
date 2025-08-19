"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function CustomInputField({
  field,
  label,
  require = false,
  view = true,
  type = "text",
  options = [],
  input = true,
  className,
  disabled = false,
  value,
  onChange,
  error,
  optionsData = {}, // For dynamic options like companyDetails, divDetails
  ...props
}) {
  // Return null for S.No fields and non-input fields
  if (label === "S.No") {
    return null
  }

  // Get dynamic options if options is a string (like 'companyDetails', 'divDetails')
  const getOptionsArray = () => {
    if (typeof options === 'string') {
      return optionsData[options] || []
    }
    return Array.isArray(options) ? options : []
  }

  const optionsArray = getOptionsArray()

  const renderInput = () => {
    const inputType = type.toLowerCase()
    
    switch (inputType) {
      case "textarea":
        return (
          <Textarea
            name={field}
            placeholder={`Enter ${label}`}
            className={cn(className, error && "border-red-500")}
            disabled={disabled}
            rows={3}
            value={value || ""}
            onChange={onChange}
            required={require}
            {...props}
          />
        )
      
      case "select":
        return (
          <Select
            name={field}
            value={value}
            onValueChange={onChange}
            disabled={disabled}
            required={require}
          >
            <SelectTrigger className={cn(className, error && "border-red-500")}>
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {optionsArray.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case "checkbox":
        return (
          <Checkbox
            name={field}
            checked={value}
            onCheckedChange={onChange}
            disabled={disabled}
            className={cn(className)}
            {...props}
          />
        )
      
      case "switch":
        return (
          <Switch
            name={field}
            checked={value}
            onCheckedChange={onChange}
            disabled={disabled}
            className={cn(className)}
            {...props}
          />
        )
      
      case "number":
        return (
          <Input
            name={field}
            type="number"
            placeholder={`Enter ${label}`}
            className={cn(className, error && "border-red-500")}
            disabled={disabled}
            value={value || ""}
            onChange={onChange}
            required={require}
            {...props}
          />
        )
      
      case "email":
        return (
          <Input
            name={field}
            type="email"
            placeholder={`Enter ${label}`}
            className={cn(className, error && "border-red-500")}
            disabled={disabled}
            value={value || ""}
            onChange={onChange}
            required={require}
            {...props}
          />
        )
      
      case "date":
        return (
          <Input
            name={field}
            type="date"
            className={cn(className, error && "border-red-500")}
            disabled={disabled}
            value={value || ""}
            onChange={onChange}
            required={require}
            {...props}
          />
        )
      
      default: // text
        return (
          <Input
            name={field}
            type="text"
            placeholder={`Enter ${label}`}
            className={cn(className, error && "border-red-500")}
            disabled={disabled}
            value={value || ""}
            onChange={onChange}
            required={require}
            {...props}
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={field}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          require && "after:content-['*'] after:text-red-500 after:ml-1"
        )}
      >
        {label}
      </Label>
      
      <div className="space-y-1">
        {renderInput()}
        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
