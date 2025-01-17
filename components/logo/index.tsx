import Link from "next/link";
import React from "react";

const Logo = (props: { url?: string; color?: string }) => {
    const { url = "/", } = props;
    return (
        <div className="flex items-center justify-center sm:justify-start">
            <Link href={url} className="flex items-center gap-2">
                <div
                    className="font-bold size-full p-2 shadow-2xl text-gray-50
          rounded-lg flex items-center border-2 border-green-700
           dark:border-gray-200
             justify-center bg-gradient-to-br
              from-lime-400 to-primary to-90%
             !font-mono italic
              hover:shadow-none hover:border-green-300  hover:text-gray-200
                  "
                    style={{ fontSize: "19px" }}
                >
                    FormEdge.Ai
                </div>
            </Link>
        </div>
    );
};

export default Logo;
