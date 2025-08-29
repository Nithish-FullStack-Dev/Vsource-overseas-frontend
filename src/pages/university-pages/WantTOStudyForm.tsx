import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WantTOStudyForm = () => {
  const [phone, setPhone] = useState("");

  return (
    <form className="p-7 space-y-2">
      {/* Name */}
      <div className="space-y-1">
        <Label>
          Name <span className="text-red-500">*</span>
        </Label>
        <Input type="text" placeholder="Enter your full name" required />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label>
          Email <span className="text-red-500">*</span>
        </Label>
        <Input type="email" placeholder="Enter your email" required />
      </div>

      {/* Mobile with Country Selector */}
      <div className="space-y-1">
        <Label>
          Mobile <span className="text-red-500">*</span>
        </Label>
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={setPhone}
          countryCodeEditable={false}
          disableCountryCode={false}
          inputProps={{
            required: true,
            name: "phone",
            className:
              "w-full rounded-md py-2 px-3 pl-12 focus:ring-2 focus:ring-blue-400 outline-none border",
          }}
        />
      </div>


      {/* Courses */}
      <div className="space-y-1">
        <Label>
          Perfered Courses <span className="text-red-500">*</span>
        </Label>
        <Input type="text" placeholder="Enter your courses" required className="outline-none focus:ring-0 focus:outline-none  focus:border-none"/>
      </div>

      {/* Preferred Destination */}
      <div className="space-y-1">
        <Label>
          Preferred Destination <span className="text-red-500">*</span>
        </Label>
        <Select required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usa">USA</SelectItem>
            <SelectItem value="uk">UK</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="ireland">Ireland</SelectItem>
            <SelectItem value="france">France</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full py-2 rounded-lg font-semibold text-white shadow-md bg-gradient-to-r from-orange-400 to-red-500 hover:opacity-90"
      >
        Submit
      </Button>
    </form>
  );
};

export default WantTOStudyForm;
