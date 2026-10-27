"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { TransactionRecord } from "@/types/payment";
import { useAuth } from "@/context/AuthContext";

export default function RiwayatPembayaranPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/payment/history");
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error("Failed to load transactions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const formatDate = (isoStr: string) => {
    try {
      return new Date(isoStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  const getStatusBadge = (status: TransactionRecord["status"]) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E6F4EA] text-[#1F7A65] border border-[#B7E1CD]">
            <CheckCircle2 className="w-3 h-3" />
            Berhasil (Paid)
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFEED4] text-[#A85800] border border-[#FFD099]">
            <Clock className="w-3 h-3" />
            Menunggu
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFEBEB] text-[#B42332] border border-[#F5A9A9]">
            <XCircle className="w-3 h-3" />
            Dibatalkan
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F3F5] text-[#5F6368] border border-[#DADCE0]">
            <AlertCircle className="w-3 h-3" />
            Kedaluwarsa
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#F1F3F5] text-[#5F6368]">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2 text-[#17365D]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#CCE1FF]/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#CCE1FF] text-xs font-semibold text-[#2457A7] uppercase tracking-wider mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Faktur &amp; Catatan Transaksi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17365D]">
            Riwayat Transaksi Dukungan
          </h1>
          <p className="mt-1 text-sm text-[#17365D]/75">
            Daftar lengkap kontribusi dan status aktivasi paket SELA Supporter pada akunmu.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link
            href="/app/paket"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#CCE1FF] bg-white text-xs font-semibold text-[#17365D] hover:bg-[#EBF3FF] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Paket &amp; Langganan</span>
          </Link>
          <button
            type="button"
            onClick={fetchTransactions}
            className="p-2.5 rounded-full border border-[#CCE1FF] bg-white text-[#2457A7] hover:bg-[#EBF3FF] transition-colors shadow-sm"
            aria-label="Segarkan riwayat transaksi"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* INFORMATION BANNER */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF3FF] border border-[#CCE1FF] text-xs sm:text-sm text-[#17365D]/85 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#2457A7] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Semua transaksi SELA.AI bersifat <strong>perpanjangan manual tanpa penagihan otomatis (*no auto-charge*)</strong>.
          Data pembayaranmu aman dan tidak disimpan dalam server internal kami.
        </p>
      </div>

      {/* TRANSACTIONS TABLE CARD */}
      <div className="rounded-3xl bg-[#F7FAFF] border border-[#CCE1FF] shadow-[6px_6px_16px_rgba(164,188,224,0.35),-6px_-6px_16px_rgba(255,255,255,0.95)] overflow-hidden">
        <div className="p-6 border-b border-[#CCE1FF]/70 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#17365D]">Daftar Pembayaran</h2>
          <span className="text-xs text-[#17365D]/60 font-medium">
            Total {transactions.length} transaksi
          </span>
        </div>

        {transactions.length === 0 ? (
          <div className="p-8 sm:p-12 text-center space-y-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aura/aura-empty-state.png"
                alt="Aura duduk tenang"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <h3 className="font-bold text-base text-[#17365D]">Belum Ada Riwayat Transaksi</h3>
            <p className="text-xs text-[#17365D]/70 max-w-sm mx-auto leading-relaxed">
              Aura duduk tenang menemanimu. Kamu saat ini menggunakan paket Akses Bebas (Free) tanpa beban biaya. Jika ingin mendukung operasional server, kamu dapat memilih paket Supporter.
            </p>
            <div className="pt-2">
              <Link
                href="/app/paket"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#2457A7] text-white text-xs font-semibold hover:bg-[#1f4a8f] shadow-sm transition-all"
              >
                Lihat Opsi Supporter
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#EBF3FF]/60 text-[#2457A7] text-[11px] font-bold uppercase tracking-wider border-b border-[#CCE1FF]">
                <tr>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">No. Pesanan</th>
                  <th className="py-3 px-4">Paket</th>
                  <th className="py-3 px-4">Nominal</th>
                  <th className="py-3 px-4">Metode</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Masa Aktif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CCE1FF]/60 text-[#17365D]/85">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#17365D]/70">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs font-medium text-[#17365D]">
                      {tx.id}
                      {tx.isSandbox && (
                        <span className="ml-1.5 text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#FFEED4] text-[#A85800] border border-[#FFD099]">
                          Sandbox
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#17365D]">
                      {tx.planName}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#1F7A65]">
                      Rp{tx.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3.5 px-4 uppercase text-xs font-medium">
                      {tx.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(tx.status)}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#17365D]/75 whitespace-nowrap">
                      {tx.activeUntil ? formatDate(tx.activeUntil) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
