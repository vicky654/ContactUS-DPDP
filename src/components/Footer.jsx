import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='bg-[#0B113C] text-white shadow-md w-full  mt-2 text-center p-7'>
        <p>Copyright © {currentYear} DPDP Consultants (A Privacyium Tech Pvt. Ltd. Company) - All Rights Reserved.</p>



    </div>
  )
}

export default Footer