import Image from "next/image";

export default function WhatsAppButton() {

  return (
    <button className="fixed bottom-6 right-6 z-40 bg-white p-2 md:p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
      <Image
        src={"/icons/whatsapp.svg"}
        alt="whatsapp"
        height={100}
        width={100}
        className="w-8 h-8 md:w-12 md:h-12 object-contain"
      />
    </button>
  );
}