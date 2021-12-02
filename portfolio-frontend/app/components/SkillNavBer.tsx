import React from "react";
import Link from "next/link";

function SkillNavBer() {
  const skill_types = [
    { type: "frontend", id: 1 },
    { type: "serverside", id: 2 },
    { type: "backend", id: 3 },
    { type: "another", id: 9 },
  ];

  return (
    <>
      <ul>
        {skill_types.map((type: { type: string; id: number }) => {
          return (
            <Link
              href="/skills/[id]"
              as={`/skills/${type.id}`}
              passHref
              key={type.id}
            >
              <li>
                <div
                  className="
                inline-flex
                items-center
                w-full
                px-4
                py-2
                mt-1
                text-base text-gray-900
                transition
                duration-500
                ease-in-out
                transform
                rounded-lg
                focus:shadow-outline
                hover:bg-gray-50
                "
                >
                  <span className="ml-4">{type.type}</span>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default SkillNavBer;
