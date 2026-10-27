"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  CreditCard,
  QrCode,
  Building,
} from "lucide-react";
import { TransactionRecord, PaymentMethod } from "@/types/payment";
import { useAuth } from "@/context/AuthContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (tx: TransactionRecord) => void;
  initialMethod?: PaymentMethod;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMethod = "qris",
}) => {
  const { user, refreshUser } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(initialMethod);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTransaction, setActiveTransaction] = useState<TransactionRecord | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInitiateOrder = async () => {
    if (!termsAgreed) {
      setErrorMsg("Mohon setujui ketentuan transaksi dan perpanjangan manual terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: "premium_30d",
          paymentMethod: selectedMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Gagal memproses pesanan.");
        setIsLoading(false);
        return;
      }

      setActiveTransaction(data.transaction);
      setIsLoading(false);
    } catch {
      setErrorMsg("Terjadi gangguan jaringan saat menghubungi server.");
      setIsLoading(false);
    }
  };

  const handleSimulatePayment = async (action: "simulate_pay" | "simulate_cancel") => {
    if (!activeTransaction) return;
    setIsSimulating(true);

    try {
      const res = await fetch("/api/payment/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: activeTransaction.id,
          action,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (action === "simulate_pay") {
          setPaymentSuccess(true);
          await refreshUser();
          if (onSuccess) onSuccess(activeTransaction);
        } else {
          setErrorMsg("Pembayaran dibatalkan.");
          setActiveTransaction(null);
        }
      }
    } catch {
      setErrorMsg("Gagal melakukan simulasi sandbox.");
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17365D]/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] p-6 sm:p-8 shadow-[12px_12px_32px_rgba(23,54,93,0.25)] text-[#17365D] overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup formulir checkout"
          className="absolute top-5 right-5 p-2 rounded-full bg-white border border-[#CCE1FF] text-[#17365D]/60 hover:text-[#17365D] hover:bg-[#EBF3FF] transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* STATE 1: SUCCESS CONFIRMATION */}
        {paymentSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#E6F4EA] to-[#D0EFE2] border border-[#B7E1CD] p-2 flex items-center justify-center mx-auto shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aura/aura-supporter.png"
                alt="Aura Supporter — Terima Kasih"
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-2xl font-bold text-[#17365D]">Terima Kasih, Dukunganmu Diterima!</h2>

            <p className="text-sm text-[#17365D]/80 max-w-md mx-auto leading-relaxed">
              Paket <strong>SELA Supporter Premium</strong> telah aktif selama 30 hari ke depan di akunmu.
              Dukunganmu membantu platform ini tetap aman, bebas iklan, dan independen.
            </p>

            <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] text-left text-xs space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between">
                <span className="text-[#17365D]/60">Nomor Pesanan:</span>
                <span className="font-mono font-medium">{activeTransaction?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#17365D]/60">Nominal Kontribusi:</span>
                <span className="font-semibold text-[#1F7A65]">Rp19.000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#17365D]/60">Status Perpanjangan:</span>
                <span className="font-medium text-[#2457A7]">Manual (Tanpa Auto-Charge)</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-[#2457A7] hover:bg-[#1f4a8f] text-white font-semibold text-sm transition-all shadow-md"
              >
                Kembali ke Ruang Pengguna
              </button>
            </div>
          </div>
        ) : activeTransaction ? (
          /* STATE 2: SANDBOX PAYMENT SCREEN */
          <div className="space-y-6">
            <div className="border-b border-[#CCE1FF] pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEED4] border border-[#FFD099] text-[#A85800] text-[11px] font-semibold mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Mode Sandbox / Uji Coba SELA</span>
              </div>
              <h2 id="checkout-modal-title" className="text-xl font-bold text-[#17365D]">
                Menyelesaikan Pembayaran Dukungan
              </h2>
              <p className="text-xs text-[#17365D]/75 mt-1">
                Nomor Pesanan: <span className="font-mono font-semibold">{activeTransaction.id}</span>
              </p>
            </div>

            {/* Sandbox Notice */}
            <div className="p-4 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] text-xs text-[#17365D]/85 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#2457A7]">
                <Info className="w-4 h-4 shrink-0" />
                <span>Simulasi Gerbang Pembayaran Sandbox</span>
              </div>
              <p className="leading-relaxed">
                Di lingkungan pengujian, kamu dapat menguji alur webhook dan pembaruan kuota secara langsung
                tanpa memotong saldo nyata.
              </p>
            </div>

            {/* Order Details */}
            <div className="p-4 rounded-2xl bg-white border border-[#CCE1FF] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#17365D]/70">Paket Dukungan</span>
                <span className="font-semibold">{activeTransaction.planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#17365D]/70">Durasi Masa Aktif</span>
                <span className="font-semibold">30 Hari</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#17365D]/70">Metode Pembayaran</span>
                <span className="uppercase font-semibold">{activeTransaction.paymentMethod}</span>
              </div>
              <div className="border-t border-[#CCE1FF]/60 pt-2 flex justify-between text-sm">
                <span className="font-bold text-[#17365D]">Total Nominal</span>
                <span className="font-bold text-[#2457A7]">Rp19.000</span>
              </div>
            </div>

            {/* Sandbox Simulation Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => handleSimulatePayment("simulate_pay")}
                disabled={isSimulating}
                className="w-full py-3.5 rounded-full bg-[#1F7A65] hover:bg-[#18604F] text-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSimulating ? "Memproses Verifikasi..." : "Simulasikan Bayar Berhasil (Sandbox)"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSimulatePayment("simulate_cancel")}
                disabled={isSimulating}
                className="w-full py-2.5 rounded-full bg-white border border-[#CCE1FF] text-[#B42332] hover:bg-[#FFEBEB] font-semibold text-xs transition-all"
              >
                Simulasikan Pembatalan
              </button>
            </div>
          </div>
        ) : (
          /* STATE 3: ORDER INITIATION */
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-gradient-to-br from-[#EBF3FF] to-[#D6E9FF] border border-[#CCE1FF] p-1.5 flex items-center justify-center shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/aura/aura-supporter.png"
                  alt="Aura mengenakan pin bintang kecil berwarna biru dengan pose apresiatif"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#EBF3FF] border border-[#CCE1FF] text-[#2457A7] text-xs font-semibold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Aura Supporter · Dukungan Transparan</span>
                </div>
                <h2 id="checkout-modal-title" className="text-xl sm:text-2xl font-bold text-[#17365D]">
                  Menjadi SELA Supporter
                </h2>
                <p className="text-xs sm:text-sm text-[#17365D]/75 leading-relaxed">
                  Aura mengenakan pin bintang kecil berwarna biru dengan penuh apresiasi atas kontribusimu menjaga ruang aman ini.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-[#FFEBEB] border border-[#F5A9A9] text-xs text-[#B42332] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Plan Card Summary */}
            <div className="p-5 rounded-2xl bg-white border border-[#CCE1FF] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#17365D]">SELA Supporter Premium</h3>
                  <p className="text-[11px] text-[#17365D]/70">Masa aktif: 30 hari</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-[#2457A7]">Rp19.000</div>
                  <div className="text-[10px] text-[#17365D]/60">Satu kali bayar · Tanpa auto-charge</div>
                </div>
              </div>

              <div className="border-t border-[#CCE1FF]/60 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#17365D]/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F7A65] shrink-0" />
                  <span>Kuota latihan Guided Story lebih besar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F7A65] shrink-0" />
                  <span>Lebih banyak kesempatan Practice Talk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F7A65] shrink-0" />
                  <span>Kapasitas Kartu Cerita lebih luas</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1F7A65] shrink-0" />
                  <span>Akses penuh modul premium &amp; lencana</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2457A7]">
                Pilih Metode Pembayaran:
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "qris" as PaymentMethod, label: "QRIS", icon: QrCode, desc: "Gopay, OVO, BCA, dll" },
                  { id: "gopay" as PaymentMethod, label: "GoPay", icon: CreditCard, desc: "Aplikasi Gojek" },
                  { id: "bank_transfer" as PaymentMethod, label: "Transfer", icon: Building, desc: "Virtual Account" },
                ].map((m) => {
                  const Icon = m.icon;
                  const isSelected = selectedMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#EBF3FF] border-[#2457A7] ring-1 ring-[#2457A7]"
                          : "bg-white border-[#CCE1FF] hover:border-[#2457A7]/50"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${isSelected ? "text-[#2457A7]" : "text-[#17365D]/70"}`} />
                      <div className="font-semibold text-xs text-[#17365D]">{m.label}</div>
                      <div className="text-[10px] text-[#17365D]/60 truncate">{m.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Terms & Guarantees Checkbox */}
            <div className="p-3.5 rounded-2xl bg-[#EBF3FF]/70 border border-[#CCE1FF] space-y-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed text-[#17365D]/85">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => {
                    setTermsAgreed(e.target.checked);
                    if (e.target.checked) setErrorMsg(null);
                  }}
                  className="mt-0.5 w-4 h-4 rounded text-[#2457A7] border-[#CCE1FF] focus:ring-[#2457A7]"
                />
                <span>
                  Saya memahami bahwa pembayaran ini berlaku selama <strong>30 hari</strong>, bersifat 
                  <strong> perpanjangan manual</strong> (tidak ada penagihan otomatis), dan fitur esensial keselamatan
                  serta Support Pathway tetap bebas biaya selamanya.
                </span>
              </label>
            </div>

            {/* Checkout CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleInitiateOrder}
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-[#2457A7] hover:bg-[#1f4a8f] text-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isLoading ? "Menyiapkan Pesanan..." : "Lanjut ke Pembayaran Rp19.000"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
