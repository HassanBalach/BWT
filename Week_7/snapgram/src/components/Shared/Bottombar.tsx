import { bottombarLinks } from "@/constants"
import { useLocation, Link } from "react-router-dom"

const Bottombar = () => {
  const { pathname } = useLocation()
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((index) => {
        const isActive = pathname === index.route

        return (
          <Link
            key={`bottombar-${index.label}`}
            to={index.route}
            className={`${isActive && "rounded-[10px] bg-primary-500 "
              } flex-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={index.imgURL}
              alt={index.label}
              width={16}
              height={16}
              className={`${isActive && "invert-white"}`} />

            <p className="tiny-medium text-light-2">  {index.label}</p>

          </Link>

        )
      })}

    </section>
  )
}

export default Bottombar
