import { Button } from "./ui/button";

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
  status: string;
  loading: boolean;
  onAccept: () => void;
  onReject: () => void;
  onDelete: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  rating,
  review,
  status,
  loading,
  onAccept,
  onReject,
  onDelete,
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="bg-transparent border border-black-900 p-4 lg:p-5 mb-6 w-full max-w-2xl mx-auto shadow-md rounded-md">
      {/* Reviewer Name */}
      <h3 className="text-lg font-semibold mb-2">{name}</h3>

      {/* Rating */}
      <div className="flex items-center my-3">
        {stars.map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Review Content */}
      <p className="text-gray-700 leading-relaxed mb-4">{review}</p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={onDelete}
          size={"sm"}
          variant={"destructive"}
          disabled={loading}
        >
          Delete
        </Button>
        {status !== "rejected" && (
          <Button
            onClick={onReject}
            size={"sm"}
            variant={"secondary"}
            disabled={loading}
          >
            Reject
          </Button>
        )}
        {status !== "accepted" && (
          <Button onClick={onAccept} size={"sm"} disabled={loading}>
            Accept
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
