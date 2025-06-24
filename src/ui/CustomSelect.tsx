// CustomSelect.tsx
"use client";

import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const statusOptions = [
  { label: "Все статусы", value: "ALL" },
  { label: "Открыт", value: "OPEN" },
  { label: "В процессе", value: "IN_PROGRESS" },
  { label: "Закрыт", value: "CLOSED" },
];

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange }) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="inline-flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm w-36 sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <Select.Value />
        <Select.Icon className="ml-2">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="rounded-md border border-gray-200 bg-white shadow-md z-50 animate-in fade-in slide-in-from-top-1"
          position="popper"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-6">
            <ChevronUp className="h-4 w-4 text-gray-500" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {statusOptions.map((opt) => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  "relative flex items-center px-3 py-1.5 text-sm rounded-md cursor-pointer select-none text-gray-700 hover:bg-gray-100 focus:bg-gray-100"
                )}
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-3">
                  <Check className="w-4 h-4 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-6">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default CustomSelect;
