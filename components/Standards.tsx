export default function Standards() {
  const standards = [
    "FDA",
    "EU 10/2011",
    "BRCGS",
    "FSC",
    "GRS",
    "BPI",
    "DIN CERTCO",
    "TÜV OK Compost Home",
    "TÜV OK Compost Industrial",
    "ISO 9001",
    "ISO 14001",
    "ISO 22000",
    "ISO 45001",
    "FSSC 22000",
  ];

  return (
    <section className="w-full py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Factory & Product Standards
          </h2>

          {/* About Buyzo */}
          <p className="text-gray-300 max-w-2xl mb-4">
            At <span className="font-semibold">Buyzo</span>, we are committed to providing high-quality, responsibly produced products. Every item we offer meets strict standards to ensure safety, sustainability, and excellence.
          </p>

          {/* Additional info */}
          <p className="text-gray-400 max-w-2xl">
            Our partners share our commitment to responsible practices, so you can trust that every product is held to the highest standards.
          </p>
        </div>

        {/* Standards List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {standards.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <div className="flex-1 h-[2px] bg-gray-700"></div>
              <div className="w-4 h-4 bg-gray-700 rounded-full"></div>
              <span className="text-lg font-medium text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}