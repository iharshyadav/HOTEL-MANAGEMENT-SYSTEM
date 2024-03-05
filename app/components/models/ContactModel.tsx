"use client"

import useContactModel from "@/app/hooks/useContact"
import Heading from "../Heading"
import Model from "./Model"
import toast from "react-hot-toast";

const ContactModel = () => {

    const contactModel = useContactModel();

    const handleSubmit = ()=>{

        toast.success("Successfully Submitted form!")
    }

    let bodyContent = (
        <div className="flex flex-col gap-4">
        <Heading
         title="Contact Us"
         subTitle="Reach us for any Query!"
        />
        <label className="" htmlFor="">Name</label>
        <input className="border-2 p-2 rounded-lg" placeholder="Name" type="text" />
        <label className="" htmlFor="">Query</label>
        <input className="border-2 p-2 rounded-lg" placeholder="Your Queries" type="text" />
        <label className="" htmlFor="">Description</label>
        <input className="border-2 p-2 rounded-lg" placeholder="Description" type="text" />
    </div>
    )
  return (
    <Model
    isOpen={contactModel.isOpen}
    title="Contact Us"
    actionLabel="Contact Us"
    onClose={contactModel.onClose}
    onSubmit={handleSubmit}
    body={bodyContent}
    />
  )
}

export default ContactModel