import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Eye, Loader2 } from "lucide-react";
import useAxios from "@/hooks/useAxios";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";

// Type definitions
interface Appointment {
  id: number;
  fullName: string;
  phoneNumber: string;
  email?: string;
  date: string;
  category: string;
  location: string;
  status: "unread" | "read";
  createdAt: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalAppointments: number;
  pageSize: number;
}

interface Filters {
  status: string;
  category: string;
}

const AppointmentsManager: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalAppointments: 0,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<Filters>({
    status: "",
    category: "",
  });

  const { fetch, loading } = useAxios();

  // Fetch appointments
  const fetchAppointments = async (page = 1): Promise<void> => {
    try {
      const { data } = await fetch({
        url: "/api/appointments",
        method: "GET",
        params: {
          page,
          limit: pagination.pageSize,
          status:
            filters.status === "all" ? undefined : filters.status || undefined,
          category: filters.category || undefined,
        },
      });

      console.log(data);

      if (data?.success) {
        setAppointments(data.data.appointments);
        setPagination(data.data.pagination);
      }
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  // Mark appointment as read
  const markAsRead = async (id: number): Promise<void> => {
    try {
      await fetch({
        url: `/api/appointments/${id}/mark-as-read`,
        method: "GET",
      });
      fetchAppointments(pagination.currentPage);
    } catch (err) {
      console.error("Failed to mark appointment as read", err);
    }
  };

  // Effect to fetch appointments on component mount and filter changes
  useEffect(() => {
    fetchAppointments();
  }, [filters.status, filters.category]);

  // Render status badge
  const renderStatusBadge = (status: "unread" | "read") => {
    const badgeVariants: Record<
      "unread" | "read",
      "destructive" | "secondary"
    > = {
      unread: "destructive",
      read: "secondary",
    };
    return <Badge variant={badgeVariants[status]}>{status}</Badge>;
  };

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <h1 className="text-2xl font-semibold font-judson">Appointments</h1>

        <div className="flex space-x-4">
          <Select
            value={filters.status}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, status: value || "" }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && (
        <div className=" flex items-center justify-center w-full mb-8">
          <Loader2 className=" mr-2 animate-spin" /> <span>Loading...</span>
        </div>
      )}

      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.fullName}</TableCell>
                <TableCell>{appointment.phoneNumber}</TableCell>
                <TableCell>{appointment.email || "N/A"}</TableCell>
                <TableCell>
                  {new Date(appointment.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{appointment.category}</TableCell>
                <TableCell>{renderStatusBadge(appointment.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2 justify-end">
                    <ResponsiveModal>
                      <ResponsiveModalTrigger
                        asChild
                        className="cursor-pointer"
                      >
                        <Button variant="secondary" size="icon" type="button">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </ResponsiveModalTrigger>
                      <ResponsiveModalContent>
                        <ResponsiveModalHeader>
                          View Appointment
                        </ResponsiveModalHeader>
                        <ResponsiveModalDescription />
                        <div className=" py-4 space-y-3">
                          <div className="flex items-center">
                            <span className="font-medium mr-2 text-gray-700">
                              Email:
                            </span>
                            <span className="text-gray-900">
                              {appointment.email}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2 text-gray-700">
                              Phone:
                            </span>
                            <span className="text-gray-900">
                              {appointment.phoneNumber}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-2 text-gray-700">
                              Location:
                            </span>
                            <a
                              href={appointment.location}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {appointment.location}
                            </a>
                          </div>
                        </div>
                      </ResponsiveModalContent>
                    </ResponsiveModal>
                    {appointment.status === "unread" && (
                      <Button
                        variant="secondary"
                        size="icon"
                        type="button"
                        onClick={() => markAsRead(appointment.id)}
                        disabled={loading}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {appointments.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No appointments found
          </div>
        )}

        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pagination.currentPage > 1) {
                    fetchAppointments(pagination.currentPage - 1);
                  }
                }}
                className={pagination.currentPage === 1 ? "disabled" : ""}
              />
            </PaginationItem>

            {/* Page Numbers */}
            {[...Array(pagination.totalPages)].map((_, index) => {
              const page = index + 1;
              const { currentPage, totalPages } = pagination;

              // Show first, last, current, and range around currentPage
              if (
                page === 1 || // Always show the first page
                page === totalPages || // Always show the last page
                (page >= currentPage - 1 && page <= currentPage + 1) // Show range near current
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        fetchAppointments(page);
                      }}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              // Show ellipsis
              if (
                (page === currentPage - 2 && currentPage > 3) || // Before visible range
                (page === currentPage + 2 && currentPage < totalPages - 2) // After visible range
              ) {
                return (
                  <span key={page} className="pagination-ellipsis">
                    ...
                  </span>
                );
              }

              // Skip other pages
              return null;
            })}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (pagination.currentPage < pagination.totalPages) {
                    fetchAppointments(pagination.currentPage + 1);
                  }
                }}
                className={
                  pagination.currentPage === pagination.totalPages
                    ? "disabled"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </>
    </div>
  );
};

export default AppointmentsManager;
