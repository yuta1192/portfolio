import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

function CareerMavBer({ careers }) {
  const years = careers
    .map((career) => career.year)
    .filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });

  return (
    <>
      {years.map((year, index) => {
        return (
          <>
            <p
              className="px-4 pt-4 font-medium text-gray-900 uppercase"
              key={index}
            >
              {year}年
            </p>
            <ul>
              {careers.map((career) => {
                if (career.year === year) {
                  return (
                    <li key={career.id}>
                      <AnchorLink
                        className="
                        inline-flex
                        items-center
                        w-full
                        px-4
                        py-2
                        mt-1
                        text-base text-gray-900
                        text-center
                        transition
                        duration-500
                        ease-in-out
                        transform
                        rounded-lg
                        bg-gray-50
                        focus:shadow-outline
                        white"
                        href={"#career" + career.id}
                      >
                        <span className="ml-4">{career.month}月</span>
                      </AnchorLink>
                    </li>
                  );
                }
              })}
            </ul>
          </>
        );
      })}
    </>
  );
}

export default CareerMavBer;
