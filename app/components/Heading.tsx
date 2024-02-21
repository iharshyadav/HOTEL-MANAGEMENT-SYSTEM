"use client"

interface headingprops {
    title:string,
    subTitle?:string,
    center?:boolean
}

const Heading: React.FC<headingprops> = ({
    title,
    subTitle,
    center
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <div className="text-xl font-extrabold">
            {title}
        </div>
        <div className="font-light text-md text-neutral-500 mt-2">
            {subTitle}
        </div>
    </div>
  )
}

export default Heading