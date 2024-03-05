import { create } from "zustand"

interface ContactModelStore {
   isOpen:boolean,
   onOpen:()=>void,
   onClose:()=>void
}

const useContactModel = create<ContactModelStore>((set)=>({
   isOpen: false,
   onOpen:()=>set( { isOpen : true } ),
   onClose:()=>set({ isOpen: false }),
}))

export default useContactModel;