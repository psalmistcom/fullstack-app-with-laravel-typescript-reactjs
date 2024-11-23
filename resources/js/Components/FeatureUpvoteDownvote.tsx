import { Feature } from "@/types";
import { useForm } from "@inertiajs/react";

export default function FeatureUpvoteDownvote({
    feature,
}: {
    feature: Feature;
}) {
    const upVoteForm = useForm({
        upvote: true,
    });
    const downVoteForm = useForm({
        upvote: false,
    });

    const upvoteDownvote = (upvote: boolean) => {
        if (
            (feature.user_has_upvoted && upvote) ||
            (feature.user_has_downvoted && !upvote)
        ) {
            upVoteForm.delete(route("upvote.destroy", feature.id), {
                preserveScroll: true,
            });
        } else {
            let form = null;
            if (upvote) {
                form = upVoteForm;
            } else {
                form = downVoteForm;
            }

            form.post(route("upvote.store", feature.id), { preserveScroll: true });
        }
    };
    return (
        <div className="flex flex-col items-center gap-1">
            <button
                onClick={() => upvoteDownvote(true)}
                className={feature.user_has_upvoted ? "text-amber-500" : ""}
            >
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
            <span
                className={
                    "text-xl font-semibold " +
                    (feature.user_has_downvoted || feature.user_has_upvoted
                        ? " text-amber-500"
                        : "")
                }
            >
                {feature.upvote_count}
            </span>
            <button
                onClick={() => upvoteDownvote(false)}
                className={feature.user_has_downvoted ? "text-amber-500" : ""}
            >
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
    );
}
