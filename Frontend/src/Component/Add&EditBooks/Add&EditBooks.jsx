import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { ImagesApiPost } from "../ApiServer/BooksDetailsApi";

const Category = [
  { value: "Select Category", label: "Select category" },
  { value: "newarrival", label: "New Arrivals" },
  { value: "bestseller", label: "Bestsellers" },
  { value: "school", label: "School Education" },
  { value: "fiction", label: "Fiction & Non Fiction" },
  { value: "children", label: "Children & Young Adult" },
  { value: "games", label: "Games & Puzzles" },
  { value: "higher", label: "Higher Education" },
  { value: "testprep", label: "Test Prep" },
  { value: "preorder", label: "Pre Order" },
];

function Add_EditBooks() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { darkMode } = useContext(ThemeContext);
  const fileInputRef = useRef(null);
  const isEdit = !!state?.book;
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    Publisher: "",
    price: "",
    originalPrice: "",
    discount: "",
    category: "Select Category",
    image: null,
    imageUrl: "",
  });

  const closeForm = () => navigate(-1);

  const applyImage = useCallback((file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setFormData((prev) => {
      if (prev.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(prev.imageUrl);
      return {
        ...prev,
        image: file,
        imageUrl: URL.createObjectURL(file),
      };
    });
  }, []);

  const clearImage = () => {
    setFormData((prev) => {
      if (prev.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(prev.imageUrl);
      return { ...prev, image: null, imageUrl: "" };
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onPaste = (event) => {
      const items = [...(event.clipboardData?.items || [])];
      const file =
        items.map((item) => item.getAsFile?.()).find((item) => item?.type.startsWith("image/")) ||
        [...(event.clipboardData?.files || [])].find((item) => item.type.startsWith("image/"));

      if (file) {
        event.preventDefault();
        applyImage(file);
      }
    };

    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [applyImage]);

  useEffect(() => {
    if (!isEdit) return;
    const book = state.book;

    setFormData({
      title: book.title || "",
      author: book.author || "",
      Publisher: book.Publisher || "",
      price: book.price || "",
      originalPrice: book.originalPrice || "",
      discount: book.discount || "",
      category: book.category || "Select Category",
      image: null,
      imageUrl: book.image || "",
    });
  }, [isEdit, state]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      if (files?.[0]) applyImage(files[0]);
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveToServer = async (event) => {
    event.preventDefault();

    if (
      !formData.title ||
      !formData.author ||
      !formData.Publisher ||
      !formData.price ||
      !formData.originalPrice ||
      !formData.discount ||
      !formData.category ||
      formData.category === "Select Category"
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (!isEdit && !formData.image) {
      toast.error("Please select a book image");
      return;
    }

    try {
      const data = new FormData();
      if (isEdit) data.append("_id", state.book._id);
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("Publisher", formData.Publisher);
      data.append("price", formData.price);
      data.append("originalPrice", formData.originalPrice);
      data.append("discount", formData.discount);
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);

      setSaving(true);
      await ImagesApiPost(data);
      toast.success(isEdit ? "Book updated successfully!" : "Book saved successfully!");
      closeForm();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save book.");
    } finally {
      setSaving(false);
    }
  };

  const modalBg = darkMode ? "bg-neutral-950 text-white" : "bg-white text-[#1f3d3a]";
  const subtitle = darkMode ? "text-gray-400" : "text-slate-400";
  const labelClass = darkMode ? "text-gray-300" : "text-[#1f3d3a]";
  const inputClass = darkMode
    ? "border-gray-700 bg-neutral-950 text-white placeholder-gray-500 focus:border-orange-500"
    : "border-gray-300 bg-white text-gray-800 placeholder-slate-400 focus:border-orange-500";
  const footerBg = darkMode ? "border-gray-800 bg-neutral-950" : "border-gray-100 bg-white";
  const imageShell = darkMode ? "border-gray-700 bg-neutral-900" : "border-gray-200 bg-[#f4f7f6]";
  const imageHeader = darkMode ? "bg-orange-600" : "bg-[#1f4d48]";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white px-3 py-4"
      onClick={closeForm}
    >
      <form
        onSubmit={handleSaveToServer}
        onClick={(event) => event.stopPropagation()}
        className={`flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl shadow-2xl ${modalBg}`}
      >
        <div className={`flex shrink-0 items-start justify-between border-b px-6 py-5 ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <div>
            <h1 className="text-2xl font-semibold">
              {isEdit ? "Edit Book" : "Add New Book"}
            </h1>
            <p className={`mt-1 text-sm ${subtitle}`}>
              {isEdit
                ? "Update the details for this catalogue book"
                : "Fill the details to add a new book"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeForm}
            className={`rounded-md p-1 text-xl ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}`}
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <Field
              label="Book Title"
              required
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              inputClass={inputClass}
              labelClass={labelClass}
            />

            <label className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${labelClass}`}>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className={`mt-2 h-11 w-full rounded-xl border px-3 text-sm outline-none ${inputClass} ${
                  formData.category === "Select Category" ? "text-slate-400" : ""
                }`}
              >
                {Category.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </label>

            <Field
              label="Author"
              required
              name="author"
              value={formData.author}
              onChange={handleFormChange}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <Field
              label="Publisher"
              required
              name="Publisher"
              value={formData.Publisher}
              onChange={handleFormChange}
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <Field
              label="Selling Price"
              required
              name="price"
              type="number"
              value={formData.price}
              onChange={handleFormChange}
              placeholder="0"
              inputClass={inputClass}
              labelClass={labelClass}
            />
            <Field
              label="Original Price"
              required
              name="originalPrice"
              type="number"
              value={formData.originalPrice}
              onChange={handleFormChange}
              placeholder="0"
              inputClass={inputClass}
              labelClass={labelClass}
            />

            <div>
              <Field
                label="Discount (%)"
                required
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleFormChange}
                placeholder="0"
                inputClass={inputClass}
                labelClass={labelClass}
              />
            </div>

            <div>
              <p className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] ${labelClass}`}>
                Image
              </p>
              <div className={`w-full overflow-hidden rounded-2xl border transition-colors duration-200 ${darkMode ? "hover:border-white" : "hover:border-black"} ${imageShell}`}>
                <div className={`flex h-9 items-center justify-between px-4 text-xs font-semibold tracking-[0.16em] text-white ${imageHeader}`}>
                  <span>IMAGE</span>
                  {formData.imageUrl ? (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="text-base leading-none"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  ) : (
                    <span className="font-normal tracking-[0.12em]">PHOTO</span>
                  )}
                </div>

                {formData.imageUrl ? (
                  <div className="flex min-h-50 items-center justify-center p-4">
                    <img
                      src={formData.imageUrl}
                      alt="Book cover preview"
                      className="max-h-40 w-full rounded object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-50 flex-col items-center justify-center px-4 text-center">
                    <p className={`text-sm ${subtitle}`}>Paste (Ctrl + V) or choose file</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`mt-1 text-sm underline ${darkMode ? "text-orange-400" : "text-[#1f4d48]"}`}
                    >
                      Choose file
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFormChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`flex shrink-0 justify-end gap-3 border-t px-6 py-4 ${footerBg}`}>
          <button
            type="button"
            onClick={closeForm}
            className={`rounded-lg border px-5 py-2 text-sm font-medium ${
              darkMode
                ? "border-gray-700 text-gray-200 hover:bg-neutral-900"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEdit ? "Update Book" : "Save Book"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  inputClass,
  labelClass,
}) {
  return (
    <label className={`text-[11px] font-semibold tracking-[0.14em] uppercase ${labelClass}`}>
      {label} {required && <span className="text-orange-500">*</span>}
      <input
        className={`mt-2 h-11 w-full rounded-xl border px-3 text-sm outline-none ${inputClass}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

export default Add_EditBooks;
