"use client"

import { IconType } from "react-icons"
import qs from "query-string";
import { useSearchParams , useRouter } from "next/navigation";
import { useCallback } from "react";

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
    },[router,params,label])

  return (
    <div
    onClick={handleClick}
    className={`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    border-b-2
    hover:text-neutral-800
    transition
    cursor-pointer
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
    >
        <Icon size={20} />
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}

export default CategoryBox