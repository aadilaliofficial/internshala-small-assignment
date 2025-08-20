import { useState } from "react";
import { InputField } from "../components/InputField/InputField";

export default function InputDemo() {
  const [val, setVal] = useState("");

  return (
    <div className="p-4 space-y-4 max-w-sm">
      <InputField
        label="Username"
        value={val}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVal(e.target.value)}
        helperText="Enter your username"
      />
      <InputField
        label="Password"
        type="password"
        invalid
        errorMessage="Password too weak"
      />
    </div>
  );
}
