"use client";

import { useState } from "react";
import EditCarModal from "@/components/EditCarModal";
import DeleteCar from "@/components/DeleteCar";
import { useRouter } from "next/navigation";

export default function CarDetailActions({ car }) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-orange-500 border border-orange-500/20 hover:bg-orange-500/10 transition-all rounded-none cursor-pointer"
        >
          Edit Vehicle
        </button>
        <DeleteCar
          carId={car._id || car.id}
          carName={car.name}
          onDeleteSuccess={() => router.replace("/explore-cars")}
        />
      </div>

      <EditCarModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        car={car}
        onUpdateSuccess={() => router.refresh()}
      />
    </>
  );
}
