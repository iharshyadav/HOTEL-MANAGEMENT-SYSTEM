"use client"

import { IconType } from "react-icons"
import qs from "query-string";
import { useSearchParams , useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface CategoryBoxProps {
    icon : IconType,
    label : string,
    selected?: boolean,
}

const CategoryBox:React.FC<CategoryBoxProps> = ({
    label,
    selected,
    icon: Icon
}) => {

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(()=>{
       
        let currentQuery = {};

        if(params){
            currentQuery = qs.parse(params.toString());
        }

        const updateQuery : any = {
            ...currentQuery,
            category : label,
        }

        if(params?.get('category') === label){
            delete updateQuery.category;
        }

        const url = qs.stringifyUrl({
            url: '/',
            query : updateQuery,
        },
        {
            skipNull : true
        }
        )

        router.push(url);
        toast.success('scroll down')
        toast.success(label);
    },[router,params,label])

  return (
    // <div
    // onClick={handleClick}
    // className={`
    // flex
    // flex-col
    // items-center
    // justify-center
    // gap-2
    // border-b-2
    // hover:text-neutral-800
    // transition
    // cursor-pointer
    // ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    // ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    // `}
    // >
    <div
      onClick={handleClick}
      className="group relative flex gap-x-6 cursor-pointer rounded-lg p-4 hover:bg-gray-50"
    >
      <div className="mt-1 flex h-1 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        <Icon
          size={20}
          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
          aria-hidden="true"
        />
      </div>
      <div className="text-black font-semibold">{label}</div>
    </div>
    // </div>
  );
}

export default CategoryBox