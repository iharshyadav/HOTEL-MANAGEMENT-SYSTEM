"use client"

import useRentModel from "@/app/hooks/useRentModel"
import Model from "./Model"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../navbar/Categories"
import CategoryInputs from "../inputs/CategoryInputs"
import "@/app/extra.css"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import Map from "../Map"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
    CATEGORY = 0 ,
    LOCATION = 1 ,
    INFO = 2 , 
    IMAGES = 3 ,
    DESCRIPTION = 4 ,
    PRICE =5 ,
}

const RentModel = () => {

    const rentModel = useRentModel();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
          defaultValues : {
            category : "",
            location : 1 ,
            guestCount : 1 ,
            roomCount : 1 ,
            bathroomCount : 1 ,
            imageSrc : "",
            price : 1 , 
            title : "" ,
            description : "" ,

          }
    })



    const category = watch('category');
    const location = watch('location');
    const guestCount = watch ('guestCount')
    const roomCount = watch ('roomCount')
    const bathroomCount = watch ('bathroomCount')
    const imageSrc = watch('imageSrc');


    const Map = useMemo(()=>
        dynamic(()=> import ('../Map'),{
            ssr: false ,
        })
    ,[location]);



    const setCustomValue = (id : string , value : any ) =>{
        setValue(id , value , {
            shouldValidate : true,
            shouldDirty : true,
            shouldTouch : true,
        })
    }

    const [steps, setSteps] = useState(STEPS.CATEGORY)

    const onBack = ()=>{
        setSteps((value)=>
            value - 1 
        )
    }

    const onNext = ()=>{
        setSteps((value)=>
             value + 1 
        )
    }


    const onSubmit : SubmitHandler<FieldValues> = (data)=>{

        if (steps !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings' , data)
        .then(()=>{
            toast.success("Listing Created!");
            router.refresh();
            reset();
            setSteps(STEPS.CATEGORY);
            rentModel.onClose();
        })
        .catch(()=>{
            toast.error("Something went wrong!")
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    const actionLabel = useMemo(()=>{

       if(steps === STEPS.PRICE){
          return "Create"
       }

       return "Next"

    },[steps])


    const secondaryActionLabel = useMemo(()=>{
        if(steps === STEPS.CATEGORY){
            return undefined;
        }

        return 'Back'
    },[steps]);


    //    STEP - 1 (LISTING - CATEGORY)

    let bodyContent = (
      <div className="flex flex-col gap-3">
        <Heading
          title="Which of these best describes your place?"
          subTitle="Pick a category"
        />
        <div
          className=" 
            grid
            grid-cols-1 
            md:grid-cols-2 
            gap-3
            max-h-[50vh]
            overflow-y-auto
            scroll-smooth
          "
        >
          {categories.map((item) => (
            // <div key={item.label}>
            //    {item.label}
            // </div>
            <div key={item.label} className="col-span-1 scroll-smooth">
              <CategoryInputs
                label={item.label}
                selected={category === item.label}
                icon={item.icon}
                onClick={(category) => {
                 setCustomValue( "category", category);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );

    //    STEP - 2 (LISTING - LOCATION)

    if(steps === STEPS.LOCATION){
         bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Where is your place located!"
                subTitle="Help guest find you!"
                />

                <CountrySelect
                value={location}
                 onChange={(value)=>setCustomValue('location',value)}
                />

                <Map
                center={location?.latlng}
                />
            </div>
        )
    }

    //    STEP - 3 (LISTING - INFO)

    if (steps === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="Share some basics about your place"
                subTitle="Whats amenties do you have?"
                />
                <Counter
                 title="Guests"
                 subTitle="How many guests do you allow?"
                 values={guestCount}
                 onChange={(value)=> setCustomValue ('guestCount',value)}
                />
                <hr />
                <Counter
                 title="Rooms"
                 subTitle="How many rooms do you allow?"
                 values={roomCount}
                 onChange={(value)=> setCustomValue ('roomCount',value)}
                />
                <hr />
                <Counter
                 title="Bathrooms"
                 subTitle="How many bathrooms do you allow?"
                 values={bathroomCount}
                 onChange={(value)=> setCustomValue ('bathroomCount',value)}
                />
            </div>
        )
    }

    //    STEP - 4 (LISTING - IMAGE)

    if(steps === STEPS.IMAGES) {

        bodyContent = (
            <div className="flex flex-col gap-8">
               <Heading 
                title="Add a photo of your place!"
                subTitle="Show guest what your place looks like!"
               />

               <ImageUpload
               value={imageSrc}
               onChange={(value)=>setCustomValue('imageSrc',value)}
               />
            </div>
        )
    }


        //    STEP - 5 (LISTING - DESCRIPTION)

        if(steps === STEPS.DESCRIPTION) {

            bodyContent = (
                <div className="flex flex-col gap-8">
                    <Heading
                    title="How would you describe your place?"
                    subTitle="Short and sweet works best!"
                    />

                    <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />

                    <hr />

                    <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />
                </div>
            )
        }


           //    STEP - 6 (LISTING - PRICE)


           if(steps === STEPS.PRICE) {

            bodyContent = (
                <div className="flex flex-col gap-8">
                    <Heading
                    title="Now, set your price"
                    subTitle="How much do you charge per night?"
                    />

                    <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    />
                </div>
            )
           }



  return (
    <Model
     onClose={rentModel.onClose}
     isOpen={rentModel.isOpen}
     onSubmit={handleSubmit(onSubmit)}
     title="HMS your home!"
     actionLabel={actionLabel}
     secondaryActionLabel={secondaryActionLabel}
     secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
     body={bodyContent}
    />
  )
}

export default RentModel