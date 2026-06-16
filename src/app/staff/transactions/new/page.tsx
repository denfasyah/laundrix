'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, WashingMachine, ShoppingBasket, Minus, Plus, Banknote, Save } from 'lucide-react';

type ServiceType = 'CA' | 'CK' | 'KA';

export default function NewTransactionPage() {
  const [selectedService, setSelectedService] = useState<ServiceType>('CK');
  const [retailItems, setRetailItems] = useState([
    { id: 1, name: 'Deterjen (Sachet)', price: 1000, quantity: 0 },
    { id: 2, name: 'Pelembut Pakaian', price: 2000, quantity: 0 },
    { id: 3, name: 'Kantong Plastik', price: 2000, quantity: 0 },
  ]);

  const serviceRates = {
    'CA': 10000,
    'CK': 10000,
    'KA': 10000,
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setRetailItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const totalRetail = retailItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalService = serviceRates[selectedService] * 0; // Assuming 0 weight for now as per mock, or maybe 1? The mock showed Rp 0 for service
  
  // Wait, the HTML mock didn't have an input for weight inside the form visually on the screenshot? 
  // Let me double check the HTML. It has an input for weight?
  // "The HTML has `<input type="number">` but it was inside `mt-md flex flex-col gap-2` maybe it was removed from HTML visually?"
  // Ah, the HTML provided: `<div class="mt-md flex flex-col gap-2"><div class="relative w-full md:w-1/3"></div></div>` - It's empty.

  const totalPayment = totalService + totalRetail;

  const formatRupiah = (amount: number) => `Rp ${amount.toLocaleString('id-ID')}`;

  return (
    <div className="w-full">
      {/* Header & Breadcrumb */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
          <div>
            <h2 className="text-[30px] font-bold text-[#00687b] tracking-tight leading-tight mb-1">Transaksi Baru</h2>
            <p className="text-[15px] text-[#3e484c]">Pilih layanan dan barang retail untuk pesanan pelanggan.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Selection Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Selection Card */}
          <div className="bg-[#fbf9f9] rounded-xl border border-[#c3cdd1] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <WashingMachine className="text-[#00687b] w-6 h-6" />
              <h3 className="text-lg text-[#1b1c1c] font-bold">Pilih Layanan</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CA */}
              <label className="relative flex flex-col p-4 border border-[#bdc8cd] rounded-xl cursor-pointer hover:border-[#00687b] transition-all group has-[:checked]:border-[#00687b] has-[:checked]:bg-[#00687b]/5">
                <input
                  type="radio"
                  name="service_type"
                  value="CA"
                  checked={selectedService === 'CA'}
                  onChange={() => setSelectedService('CA')}
                  className="absolute top-3 right-3 text-[#00687b] focus:ring-[#00687b] h-4 w-4"
                />
                <span className="text-[18px] font-bold text-[#1b1c1c]">CA</span>
                <span className="text-[12px] text-[#4a5559] mb-2">Cuci Aja</span>
                <span className="font-mono text-[14px] text-[#00687b] font-bold">Rp 10.000/coin</span>
              </label>

              {/* CK */}
              <label className="relative flex flex-col p-4 border border-[#bdc8cd] rounded-xl cursor-pointer hover:border-[#00687b] transition-all group has-[:checked]:border-[#00687b] has-[:checked]:bg-[#00687b]/5">
                <input
                  type="radio"
                  name="service_type"
                  value="CK"
                  checked={selectedService === 'CK'}
                  onChange={() => setSelectedService('CK')}
                  className="absolute top-3 right-3 text-[#00687b] focus:ring-[#00687b] h-4 w-4"
                />
                <span className="text-[18px] font-bold text-[#1b1c1c]">CK</span>
                <span className="text-[12px] text-[#4a5559] mb-2">Cuci + Kering</span>
                <span className="font-mono text-[14px] text-[#00687b] font-bold">Rp 10.000/coin</span>
              </label>

              {/* KA */}
              <label className="relative flex flex-col p-4 border border-[#bdc8cd] rounded-xl cursor-pointer hover:border-[#00687b] transition-all group has-[:checked]:border-[#00687b] has-[:checked]:bg-[#00687b]/5">
                <input
                  type="radio"
                  name="service_type"
                  value="KA"
                  checked={selectedService === 'KA'}
                  onChange={() => setSelectedService('KA')}
                  className="absolute top-3 right-3 text-[#00687b] focus:ring-[#00687b] h-4 w-4"
                />
                <span className="text-[18px] font-bold text-[#1b1c1c]">KA</span>
                <span className="text-[12px] text-[#4a5559] mb-2">Kering Aja</span>
                <span className="font-mono text-[14px] text-[#00687b] font-bold">Rp 10.000/coin</span>
              </label>
            </div>
          </div>

          {/* Retail Items Card */}
          <div className="bg-[#fbf9f9] rounded-xl border border-[#c3cdd1] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-2">
                <ShoppingBasket className="text-[#00687b] w-6 h-6" />
                <h3 className="text-lg text-[#1b1c1c] font-bold">Barang Retail</h3>
              </div>
              <span className="text-[12px] text-[#4a5559] italic">Stok otomatis berkurang saat transaksi disimpan</span>
            </div>
            
            <div className="space-y-4">
              {retailItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-[#bdc8cd] rounded-lg">
                  <div>
                    <p className="text-[16px] font-bold text-[#1b1c1c]">{item.name}</p>
                    <p className="font-mono text-[12px] text-[#00687b] font-bold">{formatRupiah(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 rounded-full border border-[#bdc8cd] flex items-center justify-center hover:bg-[#efeded] transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-mono font-bold text-[16px] w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 rounded-full border border-[#00687b] flex items-center justify-center bg-[#00687b] text-white hover:brightness-110 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#fbf9f9] rounded-xl border border-[#c3cdd1] p-6 shadow-sm sticky top-6">
            <h3 className="text-lg text-[#1b1c1c] font-bold mb-4">Ringkasan Pesanan</h3>
            
            {/* Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[16px]">
                <span className="text-[#4a5559]">Layanan ({selectedService})</span>
                <span className="font-mono">{formatRupiah(totalService)}</span>
              </div>
              <div className="flex justify-between items-center text-[16px]">
                <span className="text-[#4a5559]">Barang Retail</span>
                <span className="font-mono">{formatRupiah(totalRetail)}</span>
              </div>
              
              <div className="pt-4 border-t border-[#bdc8cd] flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[#4a5559] uppercase tracking-wider">Total Pembayaran</span>
                <p className="text-[24px] font-bold text-[#00687b] font-mono leading-none">{formatRupiah(totalPayment)}</p>
              </div>
            </div>

            {/* Payment Method Info */}
            <div className="p-4 bg-amber-50 rounded-lg mb-6 border border-amber-200 flex items-start gap-3">
              <Banknote className="text-amber-700 w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-[14px] font-bold text-amber-900">Metode Pembayaran</p>
                <p className="text-[14px] text-amber-800">Tunai (Cash Only) - 100% Lunas</p>
              </div>
            </div>

            {/* Staff Audit Info */}
            <div className="mb-6 px-2 flex items-center gap-2">
              <span className="text-[12px] text-[#4a5559]">Dibuat Oleh:</span>
              <span className="text-[12px] font-bold text-[#1b1c1c]">Cipoy wle</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button className="w-full py-4 bg-[#00687b] text-white font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2">
                <Save className="w-5 h-5" />
                Simpan Transaksi
              </button>
              <button className="w-full py-3 text-[#4a5559] font-semibold rounded-lg hover:bg-[#efeded] transition-all">
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
