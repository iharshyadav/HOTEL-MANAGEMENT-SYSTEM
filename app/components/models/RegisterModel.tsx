"use client"

import axios from "axios"
import { useCallback, useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { 
    FieldValues,
    useForm,
    SubmitHandler,
} from "react-hook-form"
import useRegisterModel from "@/app/hooks/useRegisterModel"
import Model from "./Model"
import Heading from "../Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"


const RegisterModel = () => {

    const registerModel = useRegisterModel();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name: "",
            email: "",
            password:"",
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        axios.post("/api/register",data)
         .then(()=>{
            registerModel.onClose();
         })
         .catch((error)=>{
            toast.error("Something went wrong")
         })
         .finally(()=>{
            setIsLoading(false)
         })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
             title="Welcome to HMS"
             subTitle="Create an account!"
            />
            <Input 
            id="email"
            label="Email"
            required
            disabled={isLoading}
            register={register}
            errors={errors}
            />
            <Input 
            id="name"
            label="Name"
            required
            disabled={isLoading}
            register={register}
            errors={errors}
            />
            <Input 
            id="password"
            label="Password"
            type="password"
            required
            disabled={isLoading}
            register={register}
            errors={errors}
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col
        gap-4
        mt-2
        ">
        <hr />
        <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={()=>signIn("google")}
        />
         <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={()=>{signIn("github")}}
        />
        <div className="
        text-neutral-500
        text-center
        mt-4
        font-light
        ">
            <div className="flex-flex-row justify-center items-center gap-2">
                <div>
                    Already have an account?
                </div>
                <div
                onClick={registerModel.onClose}
                className="
                text-neutral-800
                cursor-pointer
                hover:underline
                "
                >
                    Log in
                </div>
            </div>

        </div>
        </div>
    )

  return (
    <Model
     disabled={isLoading}
     isOpen={registerModel.isOpen}
     title="Register"
     actionLabel="Continue"
     onClose={registerModel.onClose}
     onSubmit={handleSubmit(onSubmit)}
     body={bodyContent}
     footer={footerContent}
    />
  )
}

export default RegisterModel