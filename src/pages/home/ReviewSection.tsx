import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
} from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import useAxios from "@/hooks/useAxios";
import toast from "react-hot-toast";

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, review }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="bg-[#EBE2E2] border border-[#C09B9B] p-4 lg:p-5 w-full">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-700 leading-relaxed mt-3 mb-2">{review}</p>
      <div className="flex items-center">
        {stars.map((star) => (
          <Star
            key={star}
            className={`text-yellow-400 mr-1 ${
              star <= rating ? "fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ReviewSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [fullName, setFullName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  interface Review {
    clientName: string;
    rating: number;
    comment: string;
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const [autoPlay, setAutoPlay] = useState(true);
  const { fetch, loading } = useAxios();

  // Calculate the number of slides needed
  const reviewsPerSlide = 4;
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  // Get current slide's reviews
  const getCurrentSlideReviews = () => {
    const startIndex = currentIndex * reviewsPerSlide;
    return reviews.slice(startIndex, startIndex + reviewsPerSlide);
  };

  // Slider logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoPlay && reviews.length > reviewsPerSlide) {
      timer = setInterval(() => {
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(timer);
  }, [autoPlay, reviews.length, totalSlides]);

  const loadReviews = async () => {
    try {
      const { data } = await fetch({
        url: "/api/reviews?status=accepted",
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

  const handleSubmit = async () => {
    try {
      await fetch({
        url: "/api/reviews",
        method: "POST",
        data: { clientName: fullName, rating, comment: review },
      });
      loadReviews();
      toast.success("Review submitted successfully.");
      setIsOpen(false);
      // Reset form
      setFullName("");
      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="bg-[#FAF4E7]">
      <div className="container pt-24 pb-24">
        <div className="flex flex-col items-center justify-center flex-1 gap-8">
          <h2 className="text-4xl font-bold font-judson text-center text-[#6C381B]">
            What Our Clients Say
          </h2>

          <div className="flex flex-col w-full gap-5">
            <div className="w-full h-full relative grid grid-cols-1 lg:grid-cols-2 gap-8">
              {loading ? (
                <div className="flex items-center justify-center h-full col-span-4">
                  <p className="text-center">Loading...</p>
                </div>
              ) : reviews.length > 0 ? (
                getCurrentSlideReviews().map((review, index) => (
                  <div key={index} className="transition-all duration-500">
                    <ReviewCard
                      name={review.clientName}
                      rating={review.rating}
                      review={review.comment}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center col-span-4">No reviews available</p>
              )}
            </div>
            
            {/* Dots indicator */}
            <div className="flex gap-2 items-center mt-4 mx-auto">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[#6C381B]" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                    setAutoPlay(false);
                  }}
                  aria-label={`Go to review set ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            className="bg-[#6C381B] text-white px-4 py-2 hover:brightness-110 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            Write a Review
          </button>

          <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveModalContent>
              <ResponsiveModalHeader>
                <ResponsiveModalTitle>Write a Review</ResponsiveModalTitle>
                <ResponsiveModalDescription>
                  Share your thoughts and experience.
                </ResponsiveModalDescription>
              </ResponsiveModalHeader>

              <div className="space-y-4">
                <input
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`${
                        star <= rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    >
                      <Star />
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Write your review..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={5}
                />
              </div>

              <ResponsiveModalFooter>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  Submit
                </Button>
              </ResponsiveModalFooter>
            </ResponsiveModalContent>
          </ResponsiveModal>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;