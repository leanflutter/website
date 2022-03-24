import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" passHref={true}>
      <div className="flex flex-row items-center cursor-pointer mr-10">
        <Image src="/images/logo.png" width={36} height={36} alt="" />
        <span className="pl-4 text-xl font-medium">{"LeanFlutter"}</span>
      </div>
    </Link>
  );
}
