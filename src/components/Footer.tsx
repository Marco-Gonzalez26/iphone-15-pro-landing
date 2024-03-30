import { footerLinks } from '../constants'

export const Footer = () => {
  return (
    <footer className='py-5 sm:px-5'>
      <div className='screen-max-width'>
        <div>
          <p className='font-semibold text-gray text-xs'>
            More ways to shop:{' '}
            <span className='underline text-blue'>Find an Apple Store </span>
            or <span className='underline text-blue'>other retailer </span>
            near you.
          </p>
          <p className='font-semibold text-gray text-xs'>
            Or call 000800-040-1966
          </p>
        </div>
        <div className='bg-neutral-700 my-5 h-[1px] w-full' />
        <div className='flex md:flex-row flex-col md:items-center justify-between'>
          <p className='font-semibold text-gray text-xs'>
            Copyright @ 2024 Apple Inc. Al right reserved
          </p>
          <p className='font-semibold text-gray text-xs'>
            Made with by ❤️ always.dev for{' '}
            <span className='text-blue'>educational purposes</span>
          </p>
          <div className='flex'>
            {footerLinks.map((link, idx) => {
              return (
                <p className='font-semibold text-gray text-xs'>
                  {link}{' '}
                  {idx !== footerLinks.length - 1 ? (
                    <span className='mx-2'>|</span>
                  ) : null}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
