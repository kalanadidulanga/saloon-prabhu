import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalFooter,
  ResponsiveModalTitle,
  ResponsiveModalDescription,
} from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, rating, review }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="bg-transparent border border-black-900 p-4 lg:p-5 mb-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="flex items-center my-3">
        {stars.map((star) => (
          <Star
            key={star}
            className={`text-yellow-400 mr-1 ${
              star <= rating ? "fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed">{review}</p>
    </div>
  );
};

const ReviewSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [fullName, setFullName] = useState("");

  const reviews: ReviewCardProps[] = [
    {
      name: "Didul Adeesha",
      rating: 3,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
    {
      name: "Didul Adeesha",
      rating: 2,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
    {
      name: "Didul Adeesha",
      rating: 2,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
    {
      name: "Didul Adeesha",
      rating: 2,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation ullamco.",
    },
  ];

  const handleSubmit = () => {
    console.log("Full Name:", fullName);
    console.log("Rating:", rating);
    console.log("Review:", review);
    setIsOpen(false);
  };

  return (
    <div>
      <div className=" container pt-24">
        <div className=" flex flex-col items-center justify-center flex-1 gap-8">
          <h2 className="text-4xl font-bold font-judson text-center text-[#6C381B]">
            What Our Clients Say
          </h2>

          <div className="bg-reviewbg bg-contain bg-center w-full aspect-video ps-16 pe-14 py-12 md:px-20 lg:ps-28 lg:pe-24 lg:py-20 overflow-hidden">
            <div className="w-full h-full aspect-video scroll-bar-hidden overflow-y-auto">
              {reviews.map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  rating={review.rating}
                  review={review.review}
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
                      className={` ${
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
                <Button onClick={handleSubmit}>Submit</Button>
              </ResponsiveModalFooter>
            </ResponsiveModalContent>
          </ResponsiveModal>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
