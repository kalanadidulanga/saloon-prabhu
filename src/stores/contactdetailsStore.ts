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
  address: "123 Fake St",
  phone: "555-555-5555",
  email: "a@b.com",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  whatsapp: "https://www.whatsapp.com/",

  updateContactDetails: (newDetails) =>
    set((state) => ({
      ...state,
      ...newDetails,
    })),
}));

export default useContactDetailsStore;
