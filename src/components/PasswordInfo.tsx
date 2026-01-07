import { FaInfoCircle } from "react-icons/fa";

export function PasswordInfo() {
  return (
    <div className="relative flex justify-end">
      <FaInfoCircle size={25} color="lightblue" className="tooltipBtn cursor-pointer" />
      <div className="tooltipContent">
        <p>Password requirements:</p>
        <ul>
          <li>- At least 8 characters long</li>
          <li>- Contains at least one uppercase letter</li>
          <li>- Contains at least one lowercase letter</li>
          <li>- Contains at least one number</li>
        </ul>
      </div>
    </div>
  )
}