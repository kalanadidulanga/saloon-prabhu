import { Button } from "@/components/ui/button";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";

const ContactFormSection = () => {
  const { fetch, loading } = useAxios();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const errors: string[] = [];

    // Name validation
    if (!data.name || data.name.toString().trim() === "") {
      errors.push("Name is required");
    }

    // Email validation
    if (
      !data.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.toString())
    ) {
      errors.push("Valid email is required");
    }

    // Phone validation
    if (
      !data.phone ||
      !/^\d{10}$/.test(data.phone.toString().replace(/\D/g, ""))
    ) {
      errors.push("Valid 10-digit phone number is required");
    }

    // Message validation
    if (!data.message || data.message.toString().trim() === "") {
      errors.push("Message is required");
    }

    // Display all errors or proceed
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    console.log(data);
  };

  return (
    <div className=" container py-24">
      <div className=" flex flex-col flex-1">
        <div className=" flex items-center">
          <h1 className="text-3xl md:text-4xl font-judson text-nowrap">
            Contact Saloon Prabhu
          </h1>{" "}
          <div className=" border-2 border-primary w-full ml-8"></div>
        </div>
        <p className=" mt-5 text-[#525252] text-sm lg:text-base">
          Are you looking to make an appointment but can’t find the time during
          our salon hours to get here? Contact the salon and ask about arranging
          a time with your stylist that fits into your schedule. We’re happy to
          accommodate our clients to the best of our abilities whenever
          possible.
        </p>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-2 mt-16">
        <div className=" w-full">
          <form onSubmit={handleSubmit} className=" space-y-4">
            <div className=" flex flex-col gap-2 text-[#28262C]">
              <label htmlFor="name">Your Name</label>
              <div className=" w-full border border-[#28262C] h-12">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className=" w-full h-full p-2"
                  required
                />
              </div>
            </div>

            <div className=" flex flex-col gap-2 text-[#28262C]">
              <label htmlFor="email">Your Email</label>
              <div className=" w-full border border-[#28262C] h-12">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" w-full h-full p-2"
                  // required
                />
              </div>
            </div>

            <div className=" flex flex-col gap-2 text-[#28262C]">
              <label htmlFor="phone">Your Phone</label>
              <div className=" w-full border border-[#28262C] h-12">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  className=" w-full h-full p-2"
                  required
                />
              </div>
            </div>

            <div className=" flex flex-col gap-2 text-[#28262C]">
              <label htmlFor="message">Your Message or Question</label>
              <div className=" w-full border border-[#28262C]">
                <textarea
                  name="message"
                  id="message"
                  className=" w-full h-full p-2"
                  rows={5}
                  required
                />
              </div>
            </div>

            <Button
              disabled={loading}
              className=" rounded-none !mt-8 w-full max-w-xs py-6"
            >
              SUBMIT
            </Button>
          </form>
        </div>
        <div>
          <img
            src="/assets/contactimage.svg"
            alt=""
            className=" object-cover object-center w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactFormSection;
