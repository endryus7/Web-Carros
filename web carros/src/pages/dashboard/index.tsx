import { useState, useEffect, useContext } from "react";
import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/painelheader";

import { FiTrash } from "react-icons/fi";

import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";

interface CarProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageCarProps[];
  uid: string;
}

interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    function loadCars() {
      if(!user?.uid){
        return
      }

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid))

      getDocs(queryRef).then((snapshot) => {
        let listcars = [] as CarProps[];

        snapshot.forEach((doc) => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid,
          });
        });

        setCars(listcars);
        console.log(listcars)
      });
    }

    loadCars();
  }, [user] );

  return (
    <Container>
      <DashboardHeader />

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg relative">
          <button
            onClick={() => {}}
            className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
          >
            <FiTrash size={28} color="#000" />
          </button>
          <img
            className="w-full rounded-lg mb-2 max-h-70"
            src="http://127.0.0.1:9199/v0/b/web-carros-df1f9.firebasestorage.app/o/images%2FFmLr1nDYtrdXs9gSQ8jA0jvsj3p2%2Fa594c678-7cf4-4006-a49a-f1c698d96b0e?alt=media&token=c86e123f-ed0c-4d9e-b0d3-2e3de0942103"
          />
          <p className="font-bold mt-1 px-2 mb-2">Nissan versa</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700">Ano 2016/2016 | 230.000 km</span>
            <strong className="text-black font-bold mt-4">R$ 150.000</strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>
          <div className="px-2 pb-2">
            <span className="text-black">Porto Alegre</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
