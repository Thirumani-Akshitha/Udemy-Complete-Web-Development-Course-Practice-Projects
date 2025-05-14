import React, {useState} from 'react'
import Header from '../components.jsx/Header'
import Banner from '../components.jsx/Banner'
import Footer from '../components.jsx/Footer'
import Collections from '../components.jsx/Collections'

import{Gents, Ladies} from '../data'
import WomenCollections from '../components.jsx/WomenCollections'

const MainPage = () => {
  
const[gentsFashion, setGentsFashion] = useState(Gents);
console.log(Gents)
const[womensFashion, setWomensFashion] = useState(Ladies);
console.log(Ladies)
  return (
    <div>
        <Header />
        <Banner />
        <Collections gentsFashion= {gentsFashion}/>
        <WomenCollections womensFashion= {womensFashion}/>
        <Footer />
       
    </div>
  );
}
;
export default MainPage