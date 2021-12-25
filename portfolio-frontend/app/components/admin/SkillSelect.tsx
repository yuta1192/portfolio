import React from "react";
import Link from "next/link";

function SkillSelect(kind: any) {
  if (kind.kind === 1)
    return (
      <>
        <option value="1" selected>
          frontend
        </option>
        <option value="2">serverside</option>
        <option value="3">backend</option>
        <option value="9">another</option>
      </>
    );
  else if (kind.kind === 2)
    return (
      <>
        <option value="1">frontend</option>
        <option value="2" selected>
          serverside
        </option>
        <option value="3">backend</option>
        <option value="9">another</option>
      </>
    );
  else if (kind.kind === 3)
    return (
      <>
        <option value="1">frontend</option>
        <option value="2">serverside</option>
        <option value="3" selected>
          backend
        </option>
        <option value="9">another</option>
      </>
    );
  else
    return (
      <>
        <option value="1">frontend</option>
        <option value="2">serverside</option>
        <option value="3">backend</option>
        <option value="9" selected>
          another
        </option>
      </>
    );
}

export default SkillSelect;
