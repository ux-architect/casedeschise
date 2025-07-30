

import styles from './tour-section.module.scss';
import { TourType } from "@/types";
import Image from "next/image";
import { PortableText } from 'next-sanity';

import Link from 'next/link';


export default async function ToursSection({ tours, page }: { tours: TourType[], page: string }) {


  const city :string = page == "sibiu" ? "sibiu": "valcea";

  return (

    <div className={`${styles['namespace-container']} `}>

      <section className={`tour-section clearfix`}>
        {tours?.map((tour, idx) => {
          
          const slug: string = tour?.slug?.current ?? '';
          return(
            <div className="tour clearfix" key={idx}>
                
                  <Link className="col col-image" href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener">

                    <Image src={tour?.profileImage.image || "/should-not-happen.jpg"} className="object-cover" alt={`${tour.name} logo`} fill />
                  </Link>

                  <div className="col col-description">
                    <h6 className='font-bold'>{tour?.name}</h6>
                    <span className='hide-long-text-6'><PortableText value={tour?.description} /></span>
                    <Link className="btn btn-primary" href={`${city}/${slug}`} scroll={true} rel="noreferrer noopener">VEZI MAI MULT</Link>
                  </div>
                  
                  
                  <div className="pin"></div>

            </div>)
          
        })}
    </section>

  </div>
  );
}