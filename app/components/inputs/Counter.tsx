"use client"

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title : string ;
    subTitle : string ; 
    values : number ; 
    onChange : (value : number)=> void ;
}

const Counter: React.FC <CounterProps> = ({
  title,
  subTitle,
  values,
  onChange
}) => {

    const onAdd = useCallback(()=>{
         onChange( values + 1)
    },[onChange,values])

    const onReduce = useCallback(()=>{
        if(values === 1){
            return;
        }

        onChange(values-1)
    },[onChange,values])

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subTitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="
            w-8
            h-8
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlineMinus />
        </div>
        <div
          className="
            font-normal 
            text-lg 
            text-neutral-700
          "
        >
          {values}
        </div>
        <div
          onClick={onAdd}
          className="
            w-8
            h-8
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}

export default Counter