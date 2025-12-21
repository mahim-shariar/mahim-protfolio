import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ArrowLeft,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Users,
  Calendar,
} from "lucide-react";

const Review = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    clientName: "",
    company: "",
    quote: "",
    stars: 5,
    isActive: true,
    order: 0,
    projectLink: "",
  });

  // Stars for rating selection
  const stars = [1, 2, 3, 4, 5];

  // Fetch reviews data
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get("/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      alert("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await api.get("/reviews/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchStats();
  }, []);

  // Open modal for creating new review
  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      clientName: "",
      company: "",
      quote: "",
      stars: 5,
      isActive: true,
      order: reviews.length,
      projectLink: "",
    });
    setShowModal(true);
  };

  // Open modal for editing review
  const openEditModal = (review) => {
    setEditingId(review._id);
    setFormData({
      clientName: review.clientName,
      company: review.company || "",
      quote: review.quote,
      stars: review.stars,
      isActive: review.isActive,
      order: review.order,
      projectLink: review.projectLink || "",
    });
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle star rating click
  const handleStarClick = (rating) => {
    setFormData({
      ...formData,
      stars: rating,
    });
  };

  // Save/Update review
  const handleSaveReview = async () => {
    if (!formData.clientName.trim() || !formData.quote.trim()) {
      alert("Client name and quote are required");
      return;
    }

    try {
      if (editingId) {
        // Update existing review
        await api.put(`/reviews/${editingId}`, formData);
        alert("Review updated successfully");
      } else {
        // Create new review
        await api.post("/reviews", formData);
        alert("Review created successfully");
      }

      setShowModal(false);
      fetchReviews();
      fetchStats();
    } catch (error) {
      alert(error.message || "Failed to save review");
    }
  };

  // Toggle review status
  const toggleReviewStatus = async (reviewId, currentStatus) => {
    try {
      await api.patch(`/reviews/${reviewId}/status`, {
        isActive: !currentStatus,
      });
      fetchReviews();
      fetchStats();
      alert(`Review ${!currentStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      alert(error.message || "Failed to update review status");
    }
  };

  // Update review order
  const updateOrder = async (reviewId, direction) => {
    const review = reviews.find((r) => r._id === reviewId);
    if (!review) return;

    const newOrder = direction === "up" ? review.order - 1 : review.order + 1;

    // Find the review that currently has this order
    const swapReview = reviews.find((r) => r.order === newOrder);

    try {
      if (swapReview) {
        // Swap orders
        await api.patch(`/reviews/orders`, {
          orders: [
            { id: reviewId, order: newOrder },
            { id: swapReview._id, order: review.order },
          ],
        });
      } else {
        // Just update this review's order
        await api.patch(`/reviews/${reviewId}/order`, { order: newOrder });
      }

      fetchReviews();
    } catch (error) {
      alert(error.message || "Failed to update order");
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await api.delete(`/reviews/${reviewId}`);
        alert("Review deleted successfully");
        fetchReviews();
        fetchStats();
      } catch (error) {
        alert(error.message || "Failed to delete review");
      }
    }
  };

  // Render star rating display
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {stars.map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-400"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-white/60">({rating}.0)</span>
      </div>
    );
  };

  // Render statistics
  const renderStats = () => {
    if (!stats) return null;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Reviews</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Active Reviews</p>
              <p className="text-2xl font-bold">{stats.active}</p>
            </div>
            <Eye className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Avg Rating</p>
              <p className="text-2xl font-bold">
                {stats.averageRating.toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Inactive</p>
              <p className="text-2xl font-bold">{stats.inactive}</p>
            </div>
            <EyeOff className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Background effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto relative z-10 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="group p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-400 bg-clip-text text-transparent">
                Client Reviews
              </span>
            </h1>
            <p className="text-white/60 text-sm md:text-base">
              Manage testimonials and client feedback
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white/40 text-sm">
            Click on any review to edit or manage
          </p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Review
          </button>
        </div>
      </div>

      {/* Statistics */}
      {renderStats()}

      {/* Reviews List */}
      <div className="max-w-6xl mx-auto relative z-10">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white/60">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
            <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No reviews yet</h3>
            <p className="text-white/60 mb-6 max-w-md mx-auto">
              Start by adding your first client review to showcase feedback and
              testimonials
            </p>
            <button
              onClick={openCreateModal}
              className="px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add First Review
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className={`bg-white/5 border rounded-xl p-5 hover:border-white/20 transition-all duration-300 ${
                  review.isActive
                    ? "border-white/10"
                    : "border-red-500/20 bg-red-500/5"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left side - Review content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-lg md:text-xl text-white">
                          {review.clientName}
                        </h3>
                        {review.company && (
                          <p className="text-white/60 text-sm mt-1">
                            {review.company}
                          </p>
                        )}
                      </div>
                      {renderStars(review.stars)}
                    </div>

                    <div className="mb-4">
                      <p className="text-white/80 italic text-base leading-relaxed">
                        "{review.quote}"
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <span>•</span>
                      <span>Order: {review.order}</span>
                      {!review.isActive && (
                        <>
                          <span>•</span>
                          <span className="text-red-400 font-medium">
                            Inactive
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right side - Actions */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      {/* Move Up/Down */}
                      <button
                        onClick={() => updateOrder(review._id, "up")}
                        disabled={review.order === 0}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 disabled:opacity-30 transition-all duration-300"
                        title="Move Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateOrder(review._id, "down")}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-2">
                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(review)}
                        className="flex-1 px-3 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>

                      {/* Toggle Status */}
                      <button
                        onClick={() =>
                          toggleReviewStatus(review._id, review.isActive)
                        }
                        className={`px-3 py-2 rounded-lg border flex items-center justify-center gap-2 transition-all duration-300 ${
                          review.isActive
                            ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30"
                            : "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20 hover:border-green-500/30"
                        }`}
                        title={review.isActive ? "Deactivate" : "Activate"}
                      >
                        {review.isActive ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto relative z-10 mt-12 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white/40 text-sm">
              All reviews are displayed in the order set above
            </p>
            <p className="text-xs text-white/20 mt-1">
              Inactive reviews are hidden from public view
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-xl flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <button
              onClick={openCreateModal}
              className="px-4 py-2.5 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-all duration-300 flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Review
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingId ? "Edit Review" : "Add New Review"}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Client Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="Tech Corp Inc."
                  />
                </div>

                {/* Quote */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quote *
                  </label>
                  <textarea
                    name="quote"
                    value={formData.quote}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 h-32 transition-colors"
                    placeholder="Amazing work! Delivered exactly what we needed..."
                    maxLength="500"
                    required
                  />
                  <p className="text-xs text-white/60 mt-1">
                    {formData.quote.length}/500 characters
                  </p>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {stars.map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        className="focus:outline-none hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.stars
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-lg">
                      {formData.stars}.0 stars
                    </span>
                  </div>
                </div>

                {/* Project Link */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Link (Optional)
                  </label>
                  <input
                    type="url"
                    name="projectLink"
                    value={formData.projectLink}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="https://example.com/project"
                  />
                </div>

                {/* Order */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <p className="text-xs text-white/60 mt-1">
                    Lower numbers appear first
                  </p>
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded bg-white/5 border border-white/10 focus:ring-0 focus:ring-offset-0"
                  />
                  <label htmlFor="isActive" className="text-sm">
                    Active (visible on website)
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveReview}
                  className="flex-1 px-4 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingId ? "Update Review" : "Create Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
