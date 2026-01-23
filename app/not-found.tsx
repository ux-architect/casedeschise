import Link from 'next/link';
import './not-found.scss';

export default function NotFound() {
  return (

    <div id='nsc--page-not-found'>
      <main style={{ textAlign: 'center', padding: '5rem' }} className="diff-sibiu-valcea diff-background">
        <h1>În proiectare... </h1>
        <p>If god was an architect, he would refine the concept for 6 days, and then pull an all-nighter.</p>


        <Link href={`/`} className='back-button display-block clearfix'>
            <span className="svg-icon svg-icon-arrow fl"></span>
        </Link>

      </main>
    </div>
  );
}