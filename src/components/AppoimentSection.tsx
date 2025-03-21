"use client";

import { Calendar, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Title from "./Title";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appointmentFormSchema } from "@/lib/schema";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";

const AppoimentSection = () => {
  const { fetch, loading } = useAxios();
  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      date: "",
      category: "",
      location: "",
    },
  });

  const selectedCategory = form.watch("category");

  async function onSubmit(values: z.infer<typeof appointmentFormSchema>) {
    // console.log(values);
    try {
      await fetch({
        url: "/api/appointments",
        method: "POST",
        data: {
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          email: values.email || "N/A",
          date: values.date,
          category: values.category,
          location: values.location || "N/A",
        },
      });

      toast.success("Appointment made successfully");
      //clear the form
      form.reset();
      form.clearErrors();
      form.setValue("category", "");
    } catch (error) {
      console.error(error);
      toast.error("Failed to make an appointment");
    }
  }

  return (
    <div id="appointment" className="appoimentbgimg bg-cover bg-center">
      <div className="container py-24">
        <div className="flex flex-col items-center">
          <Title
            title={"APPOINTMENT"}
            align={"center"}
            textColor="text-[#F6ECD7]"
          />
          <h1 className="text-3xl md:text-4xl font-judson text-color-8 text-center mb-14 mt-5">
            Make an Appointment
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 w-full">
            {/* Form Section */}
            <div className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-primary-bg">
                          Your Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="mt-1 h-12 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-primary-bg">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your phone number"
                            className="mt-1 h-12 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-primary-bg">
                          Email Address (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email address"
                            className="mt-1 h-12 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-primary-bg">
                            Date
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="date"
                                className="mt-1 h-12 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200 pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full"
                                {...field}
                              />
                              <Calendar
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                size={18}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-primary-bg">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="mt-1 h-12 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200">
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hair">Hair</SelectItem>
                              <SelectItem value="skin">Skin</SelectItem>
                              <SelectItem value="nail">Nail</SelectItem>
                              <SelectItem value="kids">Kids</SelectItem>
                              <SelectItem value="body">Bridal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Conditionally Render Location Input */}
                  {selectedCategory === "body" && (
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-primary-bg">
                            Address or Location url
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the location link"
                              className="mt-1 h-12 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <Button
                    type="submit"
                    variant={"blue2"}
                    size="mySize"
                    className="tracking-wider !mt-8"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 animate-spin" />}
                    MAKE APPOINTMENT
                  </Button>
                </form>
              </Form>
            </div>

            {/* Info Section */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-judson md:text-4xl font-bold text-color-8">
                  Appointment Booking Form
                </h2>
                <p className="mt-2 text-color-8 font-normal">
                  Fill in your details and let us handle the rest!
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-color-8 text-sm">
                  Please provide the following information to schedule your
                  appointment:
                </p>
                <ul className="space-y-1 text-sm text-color-8/90">
                  <li>Full Name – Let us know who's coming in!</li>
                  <li>
                    Phone Number – We'll send you a confirmation and reminders.
                  </li>
                  <li>Email Address – For appointment updates and offers.</li>
                  <li>
                    Select Your Service – Choose from haircuts, coloring,
                    facials, and more!
                  </li>
                  <li>Date & Time – Pick a slot that works best for you.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoimentSection;
