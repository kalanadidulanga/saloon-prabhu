import { create } from "zustand";

type ContactDetails = {
  address: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
};

type ContactDetailsStore = ContactDetails & {
  updateContactDetails: (newDetails: Partial<ContactDetails>) => void;
};

const useContactDetailsStore = create<ContactDetailsStore>((set) => ({
  address: "No. 114, Highlevel Road, Kottawa, Sri Lanka 10230",
  phone: "0117433533",
  email: "salonprabhu2020@gmail.com",
  instagram: "https://www.instagram.com/salon_prabhu",
  facebook: "https://web.facebook.com/salon.prabhu",
  whatsapp: "https://www.whatsapp.com/",

  updateContactDetails: (newDetails) =>
    set((state) => ({
      ...state,
      ...newDetails,
    })),
}));

export default useContactDetailsStore;
