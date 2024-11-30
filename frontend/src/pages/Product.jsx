import { Card } from "flowbite-react";
import { Tabs } from "flowbite-react";
import { Button } from "flowbite-react";

const Product = () => {
  const pulsa = [
    { price: 5000, gambar: "" },
    { price: 10000, gambar: "" },
    { price: 20000, gambar: "" },
    { price: 25000, gambar: "" },
    { price: 50000, gambar: "" },
    { price: 100000, gambar: "" },
  ];
  const kuota = [
    {
      name: "kuota Yang Makin Aman Jaya",
      price: 40000,
      duration: "7 Hari",
      ukuran: 8,
      type: "Hari",
      gambar: "",
    },
    {
      name: "kaget",
      price: 8000,
      duration: "3 Hari",
      ukuran: 2,
      type: "Hari",
      gambar: "",
    },
    {
      name: "yang EMPAT Giga Seminggu",
      price: 12000,
      duration: "7 Hari",
      ukuran: 4,
      type: "Hari",
      gambar: "",
    },
    {
      name: "kaget2",
      price: 17000,
      duration: "7 Hari",
      ukuran: 5,
      type: "Hari",
      gambar: "",
    },
    {
      name: "yang bikin deket",
      price: 10000,
      duration: "1 Hari",
      ukuran: 10,
      type: "Hari",
      gambar: "",
    },
    {
      name: "yang DUA Giga Sehari",
      price: 7000,
      duration: "1 Hari",
      ukuran: 4,
      type: "Hari",
      gambar: "",
    },
    {
      name: "yang Bikin DUAbest",
      price: 75000,
      duration: "1 Bulan",
      ukuran: 20,
      type: "Bulan",
      gambar: "",
    },
    {
      name: "yang Bikin nagih",
      price: 50000,
      duration: "1 Bulan",
      ukuran: 12,
      type: "Bulan",
      gambar: "",
    },
    {
      name: "yang Hemat Sebulan",
      price: 30000,
      duration: "1 Bulan",
      ukuran: 6,
      type: "Bulan",
      gambar: "",
    },
    {
      name: "yang Hemat Sebulan",
      price: 10000,
      duration: "1 Bulan",
      ukuran: 1,
      type: "Bulan",
      gambar: "",
    },
    {
      name: "yang Hemat Sebulan",
      price: 15000,
      duration: "1 Bulan",
      ukuran: 3,
      type: "Bulan",
      gambar: "",
    },
    {
      name: "yang Anti Cemas",
      price: 100000,
      duration: "1 Bulan",
      ukuran: 23,
      type: "Bulan",
      gambar: "",
    },
    {
      name: "Yang Bikin Aman Jaya",
      price: 2500,
      duration: "3 jam",
      ukuran: 5,
      type: "Jam",
      gambar: "",
    },
    {
      name: "Yang Bikin Aman Jaya2",
      price: 10000,
      duration: "6 jam",
      ukuran: 4,
      type: "Jam",
      gambar: "",
    },
    {
      name: "Yang Aman Buat Nonton",
      price: 20000,
      duration: "12 jam",
      ukuran: 2,
      type: "Jam",
      gambar: "",
    },
  ];

  return (
    <>
      <Tabs aria-label="Tabs with underline" variant="default">
        <Tabs.Item active title="Pulsa">
          <div className="grid grid-cols-3 gap-10">
            {pulsa.map((item, index) => (
              <Card key={index} className="max-w-sm py-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-blue-500 dark:text-white">
                    Rp.{item.price}
                  </span>
                  <Button>Buy</Button>
                </div>
              </Card>
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Kuota">
          <div className="grid grid-cols-3 gap-10">
            {kuota.map((item, index) => (
              <Card key={index} className="max-w-sm py-3">
                <div>
                  <h5 className="text-2xl font-semibold tracking-tight text-blue-500 dark:text-white">
                    {item.name}
                  </h5>
                </div>
                <div className="mb-5">
                  <span className="text-1xl font-bold text-gray-900 dark:text-white">
                    {item.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    Rp.{item.price}
                  </span>
                  <Button>Buy</Button>
                </div>
              </Card>
            ))}
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export default Product;
