"use client";

import Image from "next/image";
import React, { useState } from "react";

type Props = {
    src?: string | null;
    alt: string;
    className?: string;
    skeleton?: boolean;
};

export const StationImage: React.FC<Props> = ({
    src,
    alt,
    className = "",
    skeleton = false,
}) => {
    const fallback = "https://placehold.co/352x200/png";
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const imageSrc = !src || error ? fallback : src;

    return (
        <div className="relative aspect-[5/4] h-[208px] flex-none overflow-hidden rounded-lg border-2 border-white bg-white">
            {/* Показываем skeleton при skeleton=true или пока не загружено */}
            {(!loaded || skeleton) && (
                <div className="absolute inset-0 z-10 animate-pulse bg-gray-200 rounded-lg" />
            )}

            <Image
                src={imageSrc}
                alt={alt}
                fill
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={`object-cover transition-opacity duration-300 ${loaded && !skeleton ? "opacity-100" : "opacity-0"
                    } ${className}`}
            />
        </div>
    );
};
