import { Feature } from "@/types";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsexpanded] = useState(false);

    const toggleReadMore = () => {
        setIsexpanded(!isExpanded);
    };
    return (
        <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8">
                <div className="flex flex-col items-center gap-1">
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 15.75 7.5-7.5 7.5 7.5"
                            />
                        </svg>
                    </button>
                    <span className="text-xl font-semibold">12</span>
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl mb-3">
                        <Link href={route("feature.show", feature)}>
                            {feature.name}
                        </Link>
                    </h2>
                    {(feature.description || "").length > 200 && (
                        <>
                            <p>
                                {isExpanded
                                    ? feature.description
                                    : `${(feature.description || "").slice(
                                          0,
                                          200
                                      )}...`}
                            </p>
                            <button
                                className="hover:underline text-amber-500"
                                onClick={toggleReadMore}
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        </>
                    )}
                    {(feature.description || "").length <= 200 && (
                        <p>{feature.description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
