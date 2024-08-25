import React from "react";
import Image from 'next/image';


export default function Header() {
  return (
    

<nav className="bg-white w-full fixed flex border-b-2 display-flex border-gray-200">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-5 mb-5">
        <Image src="/assets/images/evento-logo.png" alt="evento logo" width={30} height={30} className="self-center "/>
        <span style={{ color: 'rgba(255, 0, 0, 1)' }} className="self-center text-3xl font-bold font-georgia ml-3">Evento</span>
    
  </div>
</nav>

  );
}
