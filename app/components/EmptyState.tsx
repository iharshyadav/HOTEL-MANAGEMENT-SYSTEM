"use client"

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyStateProps {
    title?: string,
    subTitle?: string,
    ShowReset?: boolean,
}

const EmptyState:React.FC<EmptyStateProps> = ({
title = "No exact matches",
subTitle = "Try changing or removing some of your filters",
ShowReset
}) => {

    const router = useRouter()

  return (
    <div
    className="
    h-[60vh]
    flex
    flex-col
    gap-2
    justify-center
    items-center
    ">
         <Heading
          center
          title={title}
          subTitle={subTitle}
         />
         <div className="w-40 mt-4">
            {ShowReset && (
                <Button
                 outline
                 label="Remove all filters"
                 onClick={()=> router.push('/')}
                />
            )}
         </div>
    </div>
  )
}

export default EmptyState