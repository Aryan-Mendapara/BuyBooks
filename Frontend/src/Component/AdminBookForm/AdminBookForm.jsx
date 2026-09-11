import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowLeft, FiImage, FiSave, FiUploadCloud, FiX } from "react-icons/fi";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
const categories = ["newarrival", "bestseller", "school", "fiction", "children", "games", "higher", "testprep", "preorder"];

function AdminBookForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", author: "", Publisher: "", price: "", originalPrice: "", discount: "", category: "" });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [saving, setSaving] = useState(false);

    const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });
    const selectImage = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const submit = async (event) => {
        event.preventDefault();
        if (!image) return toast.error("Please select a book cover");
        if (!form.title || !form.author || !form.Publisher || !form.price || !form.originalPrice || !form.discount || !form.category) {
            return toast.error("Please fill all book details");
        }

        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, value));
        data.append("image", image);
        setSaving(true);
        try {
            const response = await fetch(`${backendUrl}/admin/books`, {
                method: "POST",
                headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                body: data,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Unable to add book");
            toast.success(result.message || "Book added successfully");
            navigate("/admin/dashboard");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    return <div className="min-h-screen bg-[#f5f2ee] px-4 py-6 text-[#171717] sm:px-8 sm:py-10">
        <div className="mx-auto max-w-5xl">
            <button type="button" onClick={() => navigate("/admin/dashboard")} className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600"><FiArrowLeft /> Back to dashboard</button>
            <div className="mb-7"><p className="text-[10px] font-bold tracking-[2px] text-orange-600">CATALOGUE MANAGEMENT</p><h1 className="mt-1 font-serif text-4xl font-bold">Add a new book</h1><p className="mt-2 text-sm text-gray-500">Add complete, accurate details for your BuyBooks catalogue.</p></div>
            <form onSubmit={submit} className="overflow-hidden rounded-2xl border border-[#e5dfd8] bg-[#fffdf9] shadow-sm">
                <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_280px]">
                    <div><p className="mb-5 border-b border-[#eee8e1] pb-3 text-xs font-bold tracking-[1.5px] text-orange-600">BOOK INFORMATION</p><div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Book title" name="title" value={form.title} onChange={updateField} placeholder="e.g. Atomic Habits" required />
                        <Field label="Author" name="author" value={form.author} onChange={updateField} placeholder="e.g. James Clear" required />
                        <Field label="Publisher" name="Publisher" value={form.Publisher} onChange={updateField} placeholder="Publisher name" required />
                        <label className="text-xs font-semibold text-gray-600">Category<select name="category" value={form.category} onChange={updateField} className="admin-book-input" required><option value="">Select category</option>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
                        <Field label="Selling price" name="price" type="number" value={form.price} onChange={updateField} placeholder="₹ 0" required />
                        <Field label="Original price" name="originalPrice" type="number" value={form.originalPrice} onChange={updateField} placeholder="₹ 0" required />
                        <Field label="Discount (%)" name="discount" type="number" value={form.discount} onChange={updateField} placeholder="0" required />
                    </div></div>
                    <div><p className="mb-5 border-b border-[#eee8e1] pb-3 text-xs font-bold tracking-[1.5px] text-orange-600">BOOK COVER</p><label className="group flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#ddd3c9] bg-[#faf7f3] p-4 text-center hover:border-orange-400">{preview ? <img src={preview} alt="Book cover preview" className="h-52 w-full rounded-lg object-contain" /> : <><FiImage className="mb-3 text-4xl text-orange-500" /><strong className="text-sm">Upload cover image</strong><small className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</small></>}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={selectImage} className="hidden" /></label>{image && <p className="mt-2 flex items-center gap-1 truncate text-xs text-gray-500"><FiUploadCloud /> {image.name}</p>}</div>
                </div>
                <div className="flex flex-wrap justify-end gap-3 border-t border-[#eee8e1] bg-[#faf7f3] p-5 sm:px-8"><button type="button" onClick={() => navigate("/admin/dashboard")} className="flex items-center gap-2 rounded-lg border border-[#d9cfc4] px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-white"><FiX /> Cancel</button><button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"><FiSave /> {saving ? "Saving..." : "Save book"}</button></div>
            </form>
        </div>
    </div>;
}

function Field({ label, name, type = "text", value, onChange, placeholder, required }) {
    return <label className="text-xs font-semibold text-gray-600">{label}<input className="admin-book-input" name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} /></label>;
}

export default AdminBookForm;