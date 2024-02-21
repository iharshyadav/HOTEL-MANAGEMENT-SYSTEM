"use client"

import { 
    FieldError, 
    FieldValues, 
    UseFormRegister 
} from "react-hook-form"

interface InputProps {
    id:string,
    label:string,
    type?:boolean,
    disabled:boolean,
    fornmatPrice?:boolean,
    required?:boolean,
    register: UseFormRegister<FieldValues>,
    errors:FieldError,
}

const Input:React.FC<InputProps> = ({
    id,
    label,
    type = 'text',
    disabled,
    fornmatPrice,
    required,
    register,
    errors
}) => {
  return (
    <div>
        
    </div>
  )
}

export default Input