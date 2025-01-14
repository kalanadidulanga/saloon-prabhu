"use client";

import { Calendar } from "lucide-react";
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

const AppoimentSection = () => {
  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      date: "",
      category: "",
    },
  });

  function onSubmit(values: z.infer<typeof appointmentFormSchema>) {
    console.log(values);
  }

  return (
    <div
      id="appointment"
      className="appoimentbgimg bg-cover bg-no-repeat bg-center"
    >
      <div className="container py-24">
        <div className="flex flex-col items-center">
          <Title title={"APPOINTMENT"} align={"center"} />
          <h1 className="text-3xl md:text-4xl font-judson text-color-5 text-center mb-14 mt-5">
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
                        <FormLabel className="text-sm font-medium text-gray-700">
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
                        <FormLabel className="text-sm font-medium text-gray-700">
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
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Email Address
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
                          <FormLabel className="text-sm font-medium text-gray-700">
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
                          <FormLabel className="text-sm font-medium text-gray-700">
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
                              <SelectItem value="haircut">Haircut</SelectItem>
                              <SelectItem value="coloring">Coloring</SelectItem>
                              <SelectItem value="facial">Facial</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="black"
                    size="mySize"
                    className="tracking-wider !mt-8"
                  >
                    MAKE APPOINTMENT
                  </Button>
                </form>
              </Form>
            </div>

            {/* Info Section */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-judson md:text-4xl font-bold text-color-5">
                  Appointment Booking Form
                </h2>
                <p className="mt-2 text-color-5 font-normal">
                  Fill in your details and let us handle the rest!
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Please provide the following information to schedule your
                  appointment:
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
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
