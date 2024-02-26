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
import Model from "./Model"
import Heading from "../Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import useLoginModel from "@/app/hooks/useLoginModel"
import useRegisterModel from "@/app/hooks/useRegisterModel"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


const LoginModel = () => {

    const registerModel = useRegisterModel();
    const loginModel = useLoginModel();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email: "",
            password:"",
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        signIn('credentials',{
            ...data,
            redirect: false
        })
        .then((callback)=>{

            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in Succesfully');
                router.refresh();
                loginModel.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const onToggle = useCallback(() => {
        loginModel.onClose();
        registerModel.onOpen();
      }, [loginModel, registerModel])
    

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
             title="Welcome back"
             subTitle="Login to your account"
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
        onClick={()=>signIn("github")}
        />
        <div className="
        text-neutral-500
        text-center
        mt-4
        font-light
        ">
            <div className="flex-flex-row justify-center items-center gap-2">
                <div>
                    First time using HMS?
                </div>
                <div
                onClick={onToggle}
                className="
                text-neutral-800
                cursor-pointer
                hover:underline
                "
                >
                    Create an account
                </div>
            </div>

        </div>
        </div>
    )

  return (
    <Model
     disabled={isLoading}
     isOpen={loginModel.isOpen}
     title="Login"
     actionLabel="Login"
     onClose={loginModel.onClose}
     onSubmit={handleSubmit(onSubmit)}
     body={bodyContent}
     footer={footerContent}
    />
  )
}

export default LoginModel