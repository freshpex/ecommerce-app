'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { FiStar, FiUser } from 'react-icons/fi';

interface ReviewsProps {
  productId: number;
}

export default function Reviews({ productId }: ReviewsProps) {
  const { reviews, addReview } = useStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const productReviews = reviews.filter(review => review.productId === productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReview({
      productId,
      rating,
      comment,
      userId: 'user-1', // In a real app, this would come from auth
      userName: 'Guest User', // In a real app, this would come from auth
    });
    setComment('');
    setRating(5);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 dark:text-white">Reviews</h3>
      
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg">
        <div className="mb-4">
          <label className="block mb-2 dark:text-white">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl ${
                  star <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 dark:text-white">Your Review</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-4">
        {productReviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FiUser className="text-gray-600 dark:text-gray-400" />
              <span className="font-medium dark:text-white">{review.userName}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i}
                  className={`${
                    i < review.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        {productReviews.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No reviews yet. Be the first to review this product!
          </p>
        )}
      </div>
    </div>
  );
}
