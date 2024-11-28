import { Feature } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import TextAreaInput from "./TextAreaInput";
import { FormEventHandler } from "react";
import PrimaryButton from "./PrimaryButton";
import { can } from "@/helpers";

export default function NewCommentForm({ feature }: { feature: Feature }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors } = useForm({
        comment: "",
    });
    const createComment: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("comment.store", feature.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setData("comment", ""),
        });
    };
    if (!can(user, "managme_comments")) {
        return <p className="flex items-center justify-center text-gray-500 border border-gray-500 rounded-lg py-6 mb-6">You are not eligible to comment</p>
    }
    return (
        <form
            onSubmit={createComment}
            className="flex items-center gap-2 lg:gap-8 mb-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800"
        >
            <TextAreaInput
                rows={1}
                value={data.comment}
                onChange={(e) => setData("comment", e.target.value)}
                className="mt-1 w-full block"
                placeholder="Your comment"
            ></TextAreaInput>
            <PrimaryButton disabled={processing}>Comment</PrimaryButton>
        </form>
    );
}
