import ReviewCard from "@/components/ReviewCard";
import useAxios from "@/hooks/useAxios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ReviewsManager = () => {
  const { fetch, loading } = useAxios();
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const { data } = await fetch({
        url: "/api/reviews",
        method: "GET",
      });
      if (data.success) {
        setReviews(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch Reviews");
      }
    } catch (error) {
      console.error("Error fetching Reviews:", error);
      toast.error("Failed to fetch Reviews. Please try again.");
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleAccept = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to accept this review?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetch({
          url: `/api/reviews/${id}/status`,
          method: "PUT",
          data: { status: "accepted" },
        });

        Swal.fire({
          title: "Accepted!",
          text: "Review accepted successfully.",
          icon: "success",
        });
        loadReviews();
      } catch (error) {
        console.error("Error accepting review:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to accept review. Please try again.",
          icon: "error",
        });
      }
    }
  };

  const handleReject = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this review?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetch({
          url: `/api/reviews/${id}/status`,
          method: "PUT",
          data: { status: "rejected" },
        });

        Swal.fire({
          title: "Rejected!",
          text: "Review rejected successfully.",
          icon: "success",
        });
        loadReviews();
      } catch (error) {
        console.error("Error rejecting review:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to reject review. Please try again.",
          icon: "error",
        });
      }
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await fetch({
          url: `/api/reviews/${id}`,
          method: "DELETE",
        });

        Swal.fire({
          title: "Deleted!",
          text: "Review deleted successfully.",
          icon: "success",
        });
        loadReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete review. Please try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold font-judson">Reviews Manager</h1>
      </div>

      <div className="flex-1 mt-8">
        {loading && (
          <div className="flex items-center justify-center w-full mb-8">
            <Loader2 className="mr-2 animate-spin" /> <span>Loading...</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review: any) => (
            <ReviewCard
              key={review.id}
              name={review.clientName}
              rating={review.rating}
              review={review.comment}
              status={review.status}
              loading={loading}
              onAccept={() => handleAccept(review.id)}
              onReject={() => handleReject(review.id)}
              onDelete={() => handleDelete(review.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsManager;
