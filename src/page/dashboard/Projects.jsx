import React, { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Download,
  BarChart3,
  X,
  Upload,
  Calendar,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Layout,
  Image as ImageIcon,
  Link,
  Code,
  AlertCircle,
  Settings,
  Clock,
  Target,
  Award,
  Layers,
  ChevronUp,
  ChevronDown,
  Eye as EyeIcon,
  Copy,
  MoveUp,
  Filter,
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  XCircle,
  Folder,
  FolderPlus,
  Tag,
  MoreVertical,
  AlertTriangle,
} from "lucide-react";

// Cloudinary upload function
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your-cloud-name"
    }/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Upload failed");
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    public_id: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
    bytes: data.bytes,
    created_at: data.created_at,
  };
};

// Image Uploader Component
const ImageUploader = ({
  value = [],
  onChange,
  multiple = true,
  maxFiles = 20,
  maxSizeMB = 10,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileSelect = async (files) => {
    setError("");

    // Validate number of files
    if (multiple && value.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    // Validate file types
    const invalidFiles = Array.from(files).filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length > 0) {
      setError("Only image files are allowed");
      return;
    }

    // Validate file sizes
    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > maxSizeMB * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setError(`Files must be less than ${maxSizeMB}MB`);
      return;
    }

    setUploading(true);
    const newImages = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Update progress for this file
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 0,
        }));

        const result = await uploadToCloudinary(file);

        const imageData = {
          url: result.url,
          publicId: result.public_id,
          alt: file.name.split(".")[0] || "Project image",
          isPrimary: value.length === 0 && i === 0,
          order: value.length + i,
          fileName: file.name,
          size: result.bytes,
          width: result.width,
          height: result.height,
          format: result.format,
        };

        newImages.push(imageData);

        // Update progress to complete
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: 100,
        }));
      }

      onChange([...value, ...newImages]);
    } catch (err) {
      setError(`Failed to upload images: ${err.message}`);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (imageFiles.length > 0) {
      handleFileSelect(imageFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const removeImage = (index) => {
    const newImages = [...value];
    newImages.splice(index, 1);

    // If we removed the primary image, set first remaining as primary
    if (newImages.length > 0 && !newImages.some((img) => img.isPrimary)) {
      newImages[0].isPrimary = true;
    }

    // Update order
    newImages.forEach((img, idx) => {
      img.order = idx;
    });

    onChange(newImages);
  };

  const setPrimary = (index) => {
    const newImages = value.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    onChange(newImages);
  };

  const updateAltText = (index, alt) => {
    const newImages = [...value];
    newImages[index].alt = alt;
    onChange(newImages);
  };

  const reorderImages = (fromIndex, toIndex) => {
    const newImages = [...value];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);

    // Update order property
    newImages.forEach((img, idx) => {
      img.order = idx;
    });

    onChange(newImages);
  };

  const copyImageUrl = (url) => {
    navigator.clipboard.writeText(url);
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragging
            ? "border-black bg-black/5"
            : "border-gray-300 hover:border-black hover:bg-gray-50"
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="p-3 bg-gray-100 rounded-full">
            <Upload className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <p className="font-medium">
              Drag & drop images here, or click to browse
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Supports JPG, PNG, WebP • Max {maxSizeMB}MB per file
              {multiple && ` • Max ${maxFiles} files`}
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            id="image-upload"
            disabled={uploading}
          />
          <label
            htmlFor="image-upload"
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              uploading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {uploading ? "Uploading..." : "Browse Files"}
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Uploading images...</p>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="truncate max-w-[200px]">{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Gallery */}
      {value.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              Uploaded Images ({value.length}/{maxFiles})
            </h4>
            <p className="text-sm text-gray-600">
              Click star to set as primary image
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((image, index) => (
              <div
                key={`${image.publicId || image._id || index}-${image.order}`}
                className="relative group border border-gray-200 rounded-lg overflow-hidden bg-white"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", index);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(
                    e.dataTransfer.getData("text/plain")
                  );
                  reorderImages(fromIndex, index);
                }}
              >
                {/* Image */}
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={image.url}
                    alt={image.alt || "Project image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Primary Badge */}
                  {image.isPrimary && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Primary
                    </div>
                  )}

                  {/* Image Info */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {image.format?.toUpperCase()}
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={() => setPrimary(index)}
                      className={`p-2 rounded-full ${
                        image.isPrimary
                          ? "bg-yellow-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      title={
                        image.isPrimary ? "Primary image" : "Set as primary"
                      }
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => window.open(image.url, "_blank")}
                      className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100"
                      title="View full size"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => copyImageUrl(image.url)}
                      className="p-2 bg-white text-gray-700 rounded-full hover:bg-gray-100"
                      title="Copy URL"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeImage(index)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Drag Handle */}
                  <div className="absolute bottom-2 right-2 p-1 bg-black/50 text-white rounded opacity-0 group-hover:opacity-100">
                    <div className="flex flex-col">
                      <button
                        onClick={() => reorderImages(index, index - 1)}
                        disabled={index === 0}
                        className="p-1 hover:bg-black/30 rounded disabled:opacity-30"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => reorderImages(index, index + 1)}
                        disabled={index === value.length - 1}
                        className="p-1 hover:bg-black/30 rounded disabled:opacity-30"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image Details */}
                <div className="p-3">
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => updateAltText(index, e.target.value)}
                    placeholder="Enter image description"
                    className="w-full text-sm border-b border-gray-300 focus:border-black focus:outline-none py-1 bg-transparent"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 truncate max-w-[100px]">
                      {image.publicId?.slice(0, 15)}...
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatBytes(image.size)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {image.width} × {image.height}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reorder Instructions */}
          <div className="flex items-center justify-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <span className="flex items-center">
              <MoveUp className="w-4 h-4 mr-2" />
              Drag images to reorder or use arrow buttons
            </span>
          </div>
        </div>
      )}

      {/* Upload Instructions */}
      {value.length === 0 && !uploading && (
        <div className="text-center py-8">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No images uploaded yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Upload images to display them here
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function to generate slug from name
const generateSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
};

// Helper function to format category data for API
const formatCategoryData = (data) => {
  const meta = {
    title: data.name || "",
    description: "",
    keywords: [],
  };

  return {
    name: data.name,
    icon: data.icon || "",
    color: data.color || "#000000",
    order: parseInt(data.order) || 0,
    isActive: data.isActive !== false,
    meta: JSON.stringify(meta),
  };
};

// Add Category Modal
const AddCategoryModal = ({ onClose, onAddCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    color: "#000000",
    order: 0,
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedData = formatCategoryData(formData);
      await onAddCategory(formattedData);
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
      alert(`Error adding category: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Add New Category</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., Web Application"
              />
              {formData.name && (
                <div className="mt-1 text-xs text-gray-500 flex items-center">
                  <span className="font-medium mr-2">Slug:</span>
                  <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {generateSlug(formData.name)}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <span className="ml-2 text-sm">{formData.color}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Order Priority
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Icon</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Optional: Icon name or emoji"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label htmlFor="isActive" className="ml-2 text-sm">
                Active Category
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                disabled={loading || !formData.name.trim()}
              >
                {loading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Category Modal
const EditCategoryModal = ({ category, onClose, onUpdateCategory }) => {
  const [formData, setFormData] = useState({
    name: category.name || "",
    icon: category.icon || "",
    color: category.color || "#000000",
    order: category.order || 0,
    isActive: category.isActive !== false,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedData = formatCategoryData(formData);
      await onUpdateCategory(category._id, formattedData);
      onClose();
    } catch (error) {
      console.error("Error updating category:", error);
      alert(`Error updating category: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Edit Category</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Category Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g., Web Application"
              />
              {formData.name && (
                <div className="mt-1 text-xs text-gray-500 flex items-center">
                  <span className="font-medium mr-2">Slug:</span>
                  <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {category.slug || generateSlug(formData.name)}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-10 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <span className="ml-2 text-sm">{formData.color}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Order Priority
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Icon</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Optional: Icon name or emoji"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label htmlFor="isActive" className="ml-2 text-sm">
                Active Category
              </label>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                disabled={loading || !formData.name.trim()}
              >
                {loading ? "Updating..." : "Update Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Delete Category Confirmation Modal
const DeleteCategoryModal = ({ category, onClose, onConfirm }) => {
  const [reassignTo, setReassignTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const api = useApi();

  // Fetch categories for reassignment
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get("/categories");
        // Filter out the current category
        const otherCategories = (data.data || []).filter(
          (cat) => cat._id !== category._id
        );
        setCategories(otherCategories);
        if (otherCategories.length > 0) {
          setReassignTo(otherCategories[0]._id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [category._id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onConfirm(category._id, reassignTo);
      onClose();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(`Error deleting category: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-red-600">Delete Category</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            <p className="text-center font-semibold text-lg mb-2">
              {category.name}
            </p>

            <p className="text-center text-sm text-gray-600 mb-4">
              {category.projectCount || 0} projects in this category
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800 mb-3">
                <span className="font-semibold">Warning:</span> This category
                contains {category.projectCount || 0} projects. You need to
                reassign them to another category before deletion.
              </p>

              {categories.length > 0 ? (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Reassign projects to:
                  </label>
                  <select
                    value={reassignTo}
                    onChange={(e) => setReassignTo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    All projects will be moved to the selected category
                  </p>
                </div>
              ) : (
                <p className="text-sm text-red-600">
                  No other categories available. Please create a new category
                  first.
                </p>
              )}
            </div>

            <p className="text-center text-sm text-gray-600">
              This action cannot be undone. The category will be permanently
              deleted.
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || categories.length === 0}
            >
              {loading ? "Deleting..." : "Delete Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Projects Component
const Projects = () => {
  const api = useApi();
  const navigate = useNavigate();
  const [projects, setProjects] = useState({ data: [], pagination: {} });
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    isFeatured: "",
    search: "",
    sort: "-createdAt",
    page: 1,
    limit: 12,
  });

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const data = await api.get(`/projects?${queryParams}`);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const data = await api.get("/categories?includeProjects=true");
      const sortedCategories = (data.data || []).sort(
        (a, b) => a.order - b.order
      );
      setCategories(sortedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const data = await api.get("/projects/stats/dashboard");
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Add new category
  const handleAddCategory = async (categoryData) => {
    try {
      await api.post("/categories", categoryData);
      await fetchCategories(); // Refresh categories list
      return { success: true };
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  // Update category
  const handleUpdateCategory = async (id, categoryData) => {
    try {
      await api.put(`/categories/${id}`, categoryData);
      await fetchCategories(); // Refresh categories list
      return { success: true };
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  };

  // Delete category
  const handleDeleteCategory = async (id, reassignTo) => {
    try {
      // First, reassign projects if needed
      if (reassignTo) {
        const projectsToUpdate = await api.get(`/projects?category=${id}`);
        if (projectsToUpdate.data && projectsToUpdate.data.length > 0) {
          // Update each project to new category
          const updatePromises = projectsToUpdate.data.map((project) =>
            api.put(`/projects/${project._id}`, { category: reassignTo })
          );
          await Promise.all(updatePromises);
        }
      }

      // Then delete the category
      await api.delete(`/categories/${id}`);
      await fetchCategories(); // Refresh categories list
      await fetchProjects(); // Refresh projects list
      return { success: true };
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  };

  // Initialize
  useEffect(() => {
    fetchProjects();
    fetchCategories();
    fetchStats();
  }, [filters]);

  // Create project
  const handleCreateProject = async (projectData) => {
    try {
      await api.post("/projects", projectData);
      setShowCreateModal(false);
      fetchProjects();
      fetchStats();
      fetchCategories(); // Refresh categories to update counts
    } catch (error) {
      console.error("Error creating project:", error);
      alert(`Error creating project: ${error.message}`);
    }
  };

  // Update project
  const handleUpdateProject = async (id, projectData) => {
    try {
      await api.put(`/projects/${id}`, projectData);
      setShowEditModal(false);
      fetchProjects();
      fetchCategories(); // Refresh categories to update counts
    } catch (error) {
      console.error("Error updating project:", error);
      alert(`Error updating project: ${error.message}`);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setShowDeleteModal(false);
      fetchProjects();
      fetchStats();
      fetchCategories(); // Refresh categories to update counts
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(`Error deleting project: ${error.message}`);
    }
  };

  // Toggle project status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    try {
      await api.put(`/projects/${id}`, { status: newStatus });
      fetchProjects();
      fetchCategories(); // Refresh categories to update counts
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // Toggle featured status
  const toggleFeatured = async (id, currentFeatured) => {
    try {
      await api.put(`/projects/${id}`, { isFeatured: !currentFeatured });
      fetchProjects();
    } catch (error) {
      console.error("Error toggling featured:", error);
    }
  };

  // Export projects
  const exportProjects = async () => {
    try {
      const data = await api.get("/projects?limit=1000");
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `projects-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting projects:", error);
      alert("Error exporting projects");
    }
  };

  // Bulk actions
  const handleBulkDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedProjects.length} projects?`
      )
    )
      return;

    try {
      const deletePromises = selectedProjects.map((id) =>
        api.delete(`/projects/${id}`)
      );
      await Promise.all(deletePromises);
      setSelectedProjects([]);
      setShowBulkActions(false);
      fetchProjects();
      fetchStats();
      fetchCategories(); // Refresh categories to update counts
    } catch (error) {
      console.error("Error bulk deleting projects:", error);
      alert("Error deleting projects");
    }
  };

  const handleBulkPublish = async () => {
    try {
      const updatePromises = selectedProjects.map((id) =>
        api.put(`/projects/${id}`, { status: "published" })
      );
      await Promise.all(updatePromises);
      setSelectedProjects([]);
      setShowBulkActions(false);
      fetchProjects();
      fetchCategories(); // Refresh categories to update counts
    } catch (error) {
      console.error("Error bulk publishing projects:", error);
      alert("Error publishing projects");
    }
  };

  const handleBulkUnpublish = async () => {
    try {
      const updatePromises = selectedProjects.map((id) =>
        api.put(`/projects/${id}`, { status: "draft" })
      );
      await Promise.all(updatePromises);
      setSelectedProjects([]);
      setShowBulkActions(false);
      fetchProjects();
      fetchCategories(); // Refresh categories to update counts
    } catch (error) {
      console.error("Error bulk unpublishing projects:", error);
      alert("Error unpublishing projects");
    }
  };

  const handleBulkFeature = async () => {
    try {
      const updatePromises = selectedProjects.map((id) =>
        api.put(`/projects/${id}`, { isFeatured: true })
      );
      await Promise.all(updatePromises);
      setSelectedProjects([]);
      setShowBulkActions(false);
      fetchProjects();
    } catch (error) {
      console.error("Error bulk featuring projects:", error);
      alert("Error featuring projects");
    }
  };

  const toggleProjectSelection = (id) => {
    setSelectedProjects((prev) =>
      prev.includes(id)
        ? prev.filter((projectId) => projectId !== id)
        : [...prev, id]
    );
  };

  const selectAllProjects = () => {
    if (selectedProjects.length === projects.data.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects.data.map((p) => p._id));
    }
  };

  // Function to go back to dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
  };

  // Function to get category name by ID or slug
  const getCategoryName = (categoryIdOrSlug) => {
    if (!categoryIdOrSlug) return "Uncategorized";

    const category =
      categories.find((c) => c._id === categoryIdOrSlug) ||
      categories.find((c) => c.slug === categoryIdOrSlug);
    return category?.name || categoryIdOrSlug;
  };

  // Function to toggle category active status
  const toggleCategoryStatus = async (category) => {
    try {
      await api.put(`/categories/${category._id}`, {
        isActive: !category.isActive,
      });
      fetchCategories();
      fetchProjects(); // Refresh to reflect status change
    } catch (error) {
      console.error("Error toggling category status:", error);
      alert("Error toggling category status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Back to Dashboard Button */}
            <button
              onClick={goToDashboard}
              className="flex items-center mr-4 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-1">Manage all your projects</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowStatsModal(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Statistics
            </button>
            <button
              onClick={exportProjects}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && selectedProjects.length > 0 && (
        <div className="bg-black text-white px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span>{selectedProjects.length} projects selected</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBulkPublish}
                  className="px-3 py-1 bg-white text-black rounded hover:bg-gray-100 text-sm"
                >
                  Publish
                </button>
                <button
                  onClick={handleBulkUnpublish}
                  className="px-3 py-1 bg-white text-black rounded hover:bg-gray-100 text-sm"
                >
                  Unpublish
                </button>
                <button
                  onClick={handleBulkFeature}
                  className="px-3 py-1 bg-white text-black rounded hover:bg-gray-100 text-sm"
                >
                  Feature
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setShowBulkActions(false);
                setSelectedProjects([]);
              }}
              className="p-1 hover:bg-gray-800 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value, page: 1 })
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          {/* Category Select with Add New Option */}
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => {
                if (e.target.value === "add-new") {
                  setShowAddCategoryModal(true);
                } else {
                  setFilters({ ...filters, category: e.target.value, page: 1 });
                }
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent min-w-[200px]"
              disabled={categoriesLoading}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name} ({cat.projectCount || 0})
                </option>
              ))}
              <option value="add-new" className="border-t border-gray-300">
                + Add New Category
              </option>
            </select>
            {categoriesLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
              </div>
            )}
          </div>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value, page: 1 })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters({ ...filters, sort: e.target.value, page: 1 })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="-views">Most Views</option>
            <option value="-likes">Most Likes</option>
            <option value="title">Title A-Z</option>
            <option value="-title">Title Z-A</option>
            <option value="order">Order Priority</option>
          </select>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border ${
                viewMode === "grid"
                  ? "bg-black text-white border-black"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border ${
                viewMode === "list"
                  ? "bg-black text-white border-black"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => {
              setFilters({
                category: "",
                status: "",
                isFeatured: "",
                search: "",
                sort: "-createdAt",
                page: 1,
                limit: 12,
              });
              setSelectedProjects([]);
              setShowBulkActions(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear Filters
          </button>
          {projects.data.length > 0 && (
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className={`px-4 py-2 rounded-lg ${
                showBulkActions
                  ? "bg-black text-white"
                  : "border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Bulk Actions
            </button>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold mt-1">
                  {stats?.overall?.totalProjects || 0}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Layers className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold mt-1">
                  {stats?.overall?.publishedProjects || 0}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Eye className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold mt-1">
                  {stats?.overall?.featuredProjects || 0}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold mt-1">
                  {categories.length || 0}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Folder className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Summary */}
      {categories.length > 0 && (
        <div className="px-6 py-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Folder className="w-5 h-5 mr-2" />
                Categories
              </h3>
              <button
                onClick={() => setShowAddCategoryModal(true)}
                className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FolderPlus className="w-4 h-4 mr-2" />
                Add Category
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`p-3 rounded-lg border relative group ${
                    filters.category === category._id
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-black hover:bg-gray-50"
                  }`}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      filters.category === category._id
                        ? "#000"
                        : category.color
                        ? `${category.color}20`
                        : "#f9fafb",
                    borderColor:
                      filters.category === category._id
                        ? "#000"
                        : category.color || "#e5e7eb",
                  }}
                >
                  {/* Category Actions Dropdown */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(category);
                        }}
                        className="p-1 bg-white/80 backdrop-blur-sm rounded hover:bg-white"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {selectedCategory?._id === category._id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(category);
                                setShowEditCategoryModal(true);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Category
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(category);
                                setShowDeleteCategoryModal(true);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Category
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleCategoryStatus(category);
                                setSelectedCategory(null);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {category.isActive ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clickable area for filtering */}
                  <div
                    onClick={() =>
                      setFilters({
                        ...filters,
                        category:
                          filters.category === category._id ? "" : category._id,
                        page: 1,
                      })
                    }
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {category.icon ? (
                          <span className="mr-2">{category.icon}</span>
                        ) : (
                          <Tag className="w-4 h-4 mr-2" />
                        )}
                        <div>
                          <span
                            className={`font-medium ${
                              filters.category === category._id
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {category.name}
                          </span>
                          {!category.isActive && (
                            <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              Inactive
                            </span>
                          )}
                        </div>
                      </div>
                      <span
                        className={`text-sm ${
                          filters.category === category._id
                            ? "text-white"
                            : "text-gray-600"
                        }`}
                      >
                        {category.projectCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects List/Grid */}
      <div className="px-6 py-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : projects.data?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating a new project
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Create Your First Project
              </button>
              <button
                onClick={goToDashboard}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : viewMode === "grid" ? (
          <>
            {/* Bulk Selection Header */}
            {showBulkActions && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProjects.length === projects.data.length}
                    onChange={selectAllProjects}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Select all {projects.data.length} projects
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedProjects.length} selected
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.data.map((project) => (
                <div
                  key={project._id}
                  className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    selectedProjects.includes(project._id)
                      ? "ring-2 ring-black"
                      : ""
                  }`}
                >
                  {/* Selection Checkbox */}
                  {showBulkActions && (
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project._id)}
                        onChange={() => toggleProjectSelection(project._id)}
                        className="w-5 h-5 text-black border-gray-300 rounded focus:ring-black"
                      />
                    </div>
                  )}

                  {/* Project Thumbnail */}
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex space-x-1">
                      {project.isFeatured && (
                        <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Featured
                        </div>
                      )}
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.status === "published"
                            ? "bg-green-100 text-green-800"
                            : project.status === "draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {getCategoryName(project.category)}
                      </span>
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {project.views || 0}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {project.likes || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies?.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-xs text-gray-500">
                        Updated{" "}
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            toggleFeatured(project._id, project.isFeatured)
                          }
                          className={`p-1 rounded ${
                            project.isFeatured
                              ? "text-yellow-500 hover:text-yellow-600"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                          title={project.isFeatured ? "Unfeature" : "Feature"}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            toggleStatus(project._id, project.status)
                          }
                          className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          title={
                            project.status === "published"
                              ? "Unpublish"
                              : "Publish"
                          }
                        >
                          {project.status === "published" ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowEditModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 text-red-400 hover:text-red-600 rounded"
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
          </>
        ) : (
          // List View
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {showBulkActions && (
                    <th className="text-left p-4 w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedProjects.length === projects.data.length
                        }
                        onChange={selectAllProjects}
                        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                    </th>
                  )}
                  <th className="text-left p-4">Project</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Technologies</th>
                  <th className="text-left p-4">Metrics</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.data.map((project) => (
                  <tr
                    key={project._id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      selectedProjects.includes(project._id) ? "bg-blue-50" : ""
                    }`}
                  >
                    {showBulkActions && (
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(project._id)}
                          onChange={() => toggleProjectSelection(project._id)}
                          className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                        />
                      </td>
                    )}
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          {project.thumbnail ? (
                            <img
                              src={project.thumbnail}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-600 line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                        {getCategoryName(project.category)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            project.status === "published"
                              ? "bg-green-100 text-green-800"
                              : project.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.status}
                        </span>
                        {project.isFeatured && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {project.technologies
                          ?.slice(0, 3)
                          .map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        {project.technologies?.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="font-medium text-sm">
                            {project.views || 0}
                          </div>
                          <div className="text-xs text-gray-600">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-sm">
                            {project.likes || 0}
                          </div>
                          <div className="text-xs text-gray-600">Likes</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            toggleFeatured(project._id, project.isFeatured)
                          }
                          className={`p-2 rounded ${
                            project.isFeatured
                              ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          title={project.isFeatured ? "Unfeature" : "Feature"}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            toggleStatus(project._id, project.status)
                          }
                          className={`p-2 rounded ${
                            project.status === "published"
                              ? "bg-green-50 text-green-600 hover:bg-green-100"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          title={
                            project.status === "published"
                              ? "Unpublish"
                              : "Publish"
                          }
                        >
                          {project.status === "published" ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowEditModal(true);
                          }}
                          className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {projects.pagination && projects.pagination.pages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-700">
              Showing {(filters.page - 1) * filters.limit + 1} to{" "}
              {Math.min(
                filters.page * filters.limit,
                projects.pagination.total
              )}{" "}
              of {projects.pagination.total} projects
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    page: Math.max(1, filters.page - 1),
                  })
                }
                disabled={filters.page === 1}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from(
                { length: Math.min(5, projects.pagination.pages) },
                (_, i) => {
                  let pageNum;
                  if (projects.pagination.pages <= 5) {
                    pageNum = i + 1;
                  } else if (filters.page <= 3) {
                    pageNum = i + 1;
                  } else if (filters.page >= projects.pagination.pages - 2) {
                    pageNum = projects.pagination.pages - 4 + i;
                  } else {
                    pageNum = filters.page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setFilters({ ...filters, page: pageNum })}
                      className={`px-3 py-1 rounded-lg ${
                        filters.page === pageNum
                          ? "bg-black text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    page: Math.min(projects.pagination.pages, filters.page + 1),
                  })
                }
                disabled={filters.page === projects.pagination.pages}
                className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateProjectModal
          categories={categories}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateProject}
        />
      )}

      {showEditModal && selectedProject && (
        <EditProjectModal
          project={selectedProject}
          categories={categories}
          onClose={() => setShowEditModal(false)}
          onSubmit={(data) => handleUpdateProject(selectedProject._id, data)}
        />
      )}

      {showDeleteModal && selectedProject && (
        <DeleteConfirmationModal
          project={selectedProject}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDeleteProject(selectedProject._id)}
        />
      )}

      {showStatsModal && (
        <StatisticsModal
          stats={stats}
          onClose={() => setShowStatsModal(false)}
        />
      )}

      {showAddCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowAddCategoryModal(false)}
          onAddCategory={handleAddCategory}
        />
      )}

      {showEditCategoryModal && selectedCategory && (
        <EditCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowEditCategoryModal(false);
            setSelectedCategory(null);
          }}
          onUpdateCategory={handleUpdateCategory}
        />
      )}

      {showDeleteCategoryModal && selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowDeleteCategoryModal(false);
            setSelectedCategory(null);
          }}
          onConfirm={handleDeleteCategory}
        />
      )}
    </div>
  );
};

// Create Project Modal - Updated with categories
const CreateProjectModal = ({ categories, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: categories.length > 0 ? categories[0]._id : "",
    description: "",
    fullDescription: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    thumbnail: "",
    images: "[]",
    color: "from-blue-400/10 to-cyan-400/10",
    complexity: "Intermediate",
    security: "Medium",
    performance: "90%",
    timeline: "",
    teamSize: "",
    features: "",
    challenges: "",
    status: "draft",
    isFeatured: false,
    order: 0,
  });

  const [images, setImages] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    const imagesJson = JSON.stringify(newImages);
    const thumbnail =
      newImages.find((img) => img.isPrimary)?.url || newImages[0]?.url || "";
    setFormData({
      ...formData,
      images: imagesJson,
      thumbnail: thumbnail,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech),
      features: formData.features
        .split(",")
        .map((feat) => feat.trim())
        .filter((feat) => feat),
      challenges: formData.challenges
        .split(",")
        .map((chal) => chal.trim())
        .filter((chal) => chal),
      deleteImages:
        deleteImages.length > 0 ? JSON.stringify(deleteImages) : undefined,
    };

    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Create New Project</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Project Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Short Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    maxLength="200"
                    placeholder="Brief description (max 200 characters)"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formData.description.length}/200 characters
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Full Description *
                  </label>
                  <textarea
                    required
                    value={formData.fullDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullDescription: e.target.value,
                      })
                    }
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    maxLength="2000"
                    placeholder="Detailed project description"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formData.fullDescription.length}/2000 characters
                  </div>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Project Images
              </h3>
              <ImageUploader
                value={images}
                onChange={handleImagesChange}
                multiple={true}
                maxFiles={20}
                maxSizeMB={10}
              />
            </div>

            {/* Technologies */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Technologies
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Technologies Used (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({ ...formData, technologies: e.target.value })
                    }
                    placeholder="React, Node.js, MongoDB, Tailwind CSS, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                {formData.technologies && (
                  <div>
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies
                        .split(",")
                        .map((tech) => tech.trim())
                        .filter((tech) => tech)
                        .map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Link className="w-5 h-5 mr-2" />
                Project Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Project Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Color Theme
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    placeholder="from-blue-400/10 to-cyan-400/10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Complexity Level
                  </label>
                  <select
                    value={formData.complexity}
                    onChange={(e) =>
                      setFormData({ ...formData, complexity: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Security Level
                  </label>
                  <select
                    value={formData.security}
                    onChange={(e) =>
                      setFormData({ ...formData, security: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Maximum">Maximum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Performance Score
                  </label>
                  <input
                    type="text"
                    value={formData.performance}
                    onChange={(e) =>
                      setFormData({ ...formData, performance: e.target.value })
                    }
                    placeholder="90%"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    placeholder="3 months"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Team Size
                  </label>
                  <input
                    type="text"
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData({ ...formData, teamSize: e.target.value })
                    }
                    placeholder="5 members"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Order Priority
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Features & Challenges */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Key Features (comma-separated)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    rows="4"
                    placeholder="Responsive design, User authentication, Payment integration, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {formData.features && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.features
                          .split(",")
                          .map((feat) => feat.trim())
                          .filter((feat) => feat)
                          .map((feat, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                            >
                              {feat}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Challenges & Solutions (comma-separated)
                  </label>
                  <textarea
                    value={formData.challenges}
                    onChange={(e) =>
                      setFormData({ ...formData, challenges: e.target.value })
                    }
                    rows="4"
                    placeholder="Scalability issues solved with Redis, Performance optimized with lazy loading, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {formData.challenges && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.challenges
                          .split(",")
                          .map((chal) => chal.trim())
                          .filter((chal) => chal)
                          .map((chal, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                            >
                              {chal}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="mr-2 w-4 h-4 text-black focus:ring-black rounded"
                  />
                  <span className="font-medium">Featured Project</span>
                </label>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Create Project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Project Modal - Updated with categories
const EditProjectModal = ({ project, categories, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: project.title || "",
    category:
      project.category || (categories.length > 0 ? categories[0]._id : ""),
    description: project.description || "",
    fullDescription: project.fullDescription || "",
    technologies: project.technologies?.join(", ") || "",
    liveUrl: project.liveUrl || "",
    githubUrl: project.githubUrl || "",
    thumbnail: project.thumbnail || "",
    images: JSON.stringify(project.images || []),
    color: project.color || "from-blue-400/10 to-cyan-400/10",
    complexity: project.complexity || "Intermediate",
    security: project.security || "Medium",
    performance: project.performance || "90%",
    timeline: project.timeline || "",
    teamSize: project.teamSize || "",
    features: project.features?.join(", ") || "",
    challenges: project.challenges?.join(", ") || "",
    status: project.status || "draft",
    isFeatured: project.isFeatured || false,
    order: project.order || 0,
  });

  const [images, setImages] = useState(project.images || []);
  const [deleteImages, setDeleteImages] = useState([]);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    const imagesJson = JSON.stringify(newImages);
    const thumbnail =
      newImages.find((img) => img.isPrimary)?.url ||
      newImages[0]?.url ||
      formData.thumbnail;
    setFormData({
      ...formData,
      images: imagesJson,
      thumbnail: thumbnail,
    });
  };

  const handleDeleteImageToggle = (imageId) => {
    setDeleteImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech),
      features: formData.features
        .split(",")
        .map((feat) => feat.trim())
        .filter((feat) => feat),
      challenges: formData.challenges
        .split(",")
        .map((chal) => chal.trim())
        .filter((chal) => chal),
      deleteImages:
        deleteImages.length > 0 ? JSON.stringify(deleteImages) : undefined,
    };

    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Edit Project</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Short Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    maxLength="200"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formData.description.length}/200 characters
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Full Description *
                  </label>
                  <textarea
                    required
                    value={formData.fullDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fullDescription: e.target.value,
                      })
                    }
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    maxLength="2000"
                  />
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formData.fullDescription.length}/2000 characters
                  </div>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ImageIcon className="w-5 h-5 mr-2" />
                Project Images
              </h3>
              <ImageUploader
                value={images}
                onChange={handleImagesChange}
                multiple={true}
                maxFiles={20}
                maxSizeMB={10}
              />

              {/* Thumbnail Preview */}
              {formData.thumbnail && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-3">
                    Thumbnail Preview
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 border border-gray-300 rounded-lg overflow-hidden">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">
                        Current thumbnail image. Change by setting a different
                        image as primary.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Delete Images Section */}
            {images.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-red-700">
                  <Trash2 className="w-5 h-5 mr-2" />
                  Remove Images
                </h3>
                <p className="text-sm text-red-600 mb-4">
                  Select images to remove from project. This action cannot be
                  undone.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={`${image.publicId || image._id || index}-delete`}
                      className="relative border border-red-200 rounded-lg overflow-hidden bg-white"
                    >
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                        {deleteImages.includes(image._id || image.publicId) && (
                          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                            <XCircle className="w-8 h-8 text-red-600" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`delete-${index}`}
                            checked={deleteImages.includes(
                              image._id || image.publicId
                            )}
                            onChange={() =>
                              handleDeleteImageToggle(
                                image._id || image.publicId
                              )
                            }
                            className="w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                          />
                          <label
                            htmlFor={`delete-${index}`}
                            className="ml-2 text-sm text-red-700 cursor-pointer"
                          >
                            Mark for deletion
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Technologies
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Technologies Used (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({ ...formData, technologies: e.target.value })
                    }
                    placeholder="React, Node.js, MongoDB, Tailwind CSS, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                {formData.technologies && (
                  <div>
                    <p className="text-sm font-medium mb-2">Preview:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies
                        .split(",")
                        .map((tech) => tech.trim())
                        .filter((tech) => tech)
                        .map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Links */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Link className="w-5 h-5 mr-2" />
                Project Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/username/repo"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Project Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Color Theme
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    placeholder="from-blue-400/10 to-cyan-400/10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Complexity Level
                  </label>
                  <select
                    value={formData.complexity}
                    onChange={(e) =>
                      setFormData({ ...formData, complexity: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Security Level
                  </label>
                  <select
                    value={formData.security}
                    onChange={(e) =>
                      setFormData({ ...formData, security: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Maximum">Maximum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Performance Score
                  </label>
                  <input
                    type="text"
                    value={formData.performance}
                    onChange={(e) =>
                      setFormData({ ...formData, performance: e.target.value })
                    }
                    placeholder="90%"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Timeline
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    placeholder="3 months"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Team Size
                  </label>
                  <input
                    type="text"
                    value={formData.teamSize}
                    onChange={(e) =>
                      setFormData({ ...formData, teamSize: e.target.value })
                    }
                    placeholder="5 members"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Order Priority
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Features & Challenges */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Key Features (comma-separated)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) =>
                      setFormData({ ...formData, features: e.target.value })
                    }
                    rows="4"
                    placeholder="Responsive design, User authentication, Payment integration, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {formData.features && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.features
                          .split(",")
                          .map((feat) => feat.trim())
                          .filter((feat) => feat)
                          .map((feat, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                            >
                              {feat}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Challenges & Solutions (comma-separated)
                  </label>
                  <textarea
                    value={formData.challenges}
                    onChange={(e) =>
                      setFormData({ ...formData, challenges: e.target.value })
                    }
                    rows="4"
                    placeholder="Scalability issues solved with Redis, Performance optimized with lazy loading, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  {formData.challenges && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-2">Preview:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.challenges
                          .split(",")
                          .map((chal) => chal.trim())
                          .filter((chal) => chal)
                          .map((chal, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                            >
                              {chal}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="mr-2 w-4 h-4 text-black focus:ring-black rounded"
                  />
                  <span className="font-medium">Featured Project</span>
                </label>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteConfirmationModal = ({ project, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Delete Project</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mb-6">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-center text-gray-700 mb-2">
              Are you sure you want to delete this project?
            </p>
            <p className="text-center font-semibold text-lg">{project.title}</p>
            <p className="text-center text-sm text-gray-600 mt-2">
              This action cannot be undone. All project data will be permanently
              deleted.
            </p>
          </div>
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Statistics Modal
const StatisticsModal = ({ stats, onClose }) => {
  if (!stats) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Project Statistics</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {stats.overall && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">
                  {stats.overall.totalProjects || 0}
                </div>
                <div className="text-sm text-gray-600">Total Projects</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">
                  {stats.overall.publishedProjects || 0}
                </div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">
                  {stats.overall.featuredProjects || 0}
                </div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">
                  {stats.overall.totalViews || 0}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          )}

          {stats.categories && stats.categories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Projects by Category
              </h3>
              <div className="space-y-4">
                {stats.categories.map((cat) => (
                  <div key={cat.category} className="flex items-center">
                    <div className="w-32 text-sm font-medium truncate">
                      {cat.name || cat.category}
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black transition-all duration-500"
                          style={{
                            width: `${
                              (cat.count /
                                (stats.overall?.totalProjects || 1)) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right font-medium">
                      {cat.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stats.recent && stats.recent.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
              <div className="space-y-3">
                {stats.recent.map((project) => (
                  <div
                    key={project._id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden mr-3">
                        {project.thumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-gray-600">
                          {project.category}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          project.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-600">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
