import React, { useState } from "react";

export default function CheckoutModal({ isOpen, onClose, totalPrice }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    payment: "card",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setForm({ fullName: "", phone: "", address: "", payment: "card" });
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">
            {isSubmitted ? "Order Confirmed" : "Checkout Details"}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-xl px-2 cursor-pointer"
          >
            ×
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              Thank you, {form.fullName}!
            </h4>
            <p className="text-sm text-slate-500 mb-6">
              Your order (${totalPrice.toFixed(2)}) will be delivered to{" "}
              <span className="font-semibold text-slate-700">{form.address}</span>.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+998 90 123 45 67"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Delivery Address
              </label>
              <textarea
                name="address"
                required
                rows={2}
                value={form.address}
                onChange={handleChange}
                placeholder="City, Street, House"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-600 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, payment: "card" })}
                  className={`py-2.5 rounded-xl border text-sm font-semibold cursor-pointer ${
                    form.payment === "card"
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, payment: "cash" })}
                  className={`py-2.5 rounded-xl border text-sm font-semibold cursor-pointer ${
                    form.payment === "cash"
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  Cash
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl shadow-md shadow-purple-200 cursor-pointer"
            >
              Confirm Order (${totalPrice.toFixed(2)})
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
